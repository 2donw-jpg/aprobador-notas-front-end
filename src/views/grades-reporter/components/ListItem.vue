<template>
    <v-card dense>

      <v-card-title class="d-flex flex-column pa-2">
  <!-- First Row for Academic Year, Period, and Parcial (full width) -->
  <v-row class="d-flex justify-space-between" no-gutters>
    <v-col class="flex-grow-1">
      <v-select
        label="Año Académico"
        :items="lists.years"
        item-title="title"
        item-value="id"
        variant="outlined"
        base-color="#000"
        v-model="selected.year"
        :return-object="true"
        @update:modelValue="onYearChange"
      ></v-select>
    </v-col>

    <v-col class="flex-grow-1" v-if="selected.year">
      <v-select
        label="Periodo"
        :items="lists.periods"
        item-title="title"
        item-value="id"
        variant="outlined"
        base-color="#000"
        v-model="selected.period"
        :disabled="!selected.year"
        :return-object="true"
        @update:modelValue="onPeriodChange"
      />
    </v-col>

    <v-col class="flex-grow-1" v-if="selected.period">
      <v-select
        label="Parcial"
        :items="lists.parcials"
        item-title="title"
        variant="outlined"
        base-color="#000"
        item-value="id"
        v-model="selected.parcial"
        :return-object="true"
        :disabled="!selected.period"
         @update:modelValue="changeParcial"
      />
    </v-col>
  </v-row>

  <!-- Second Row for Search Text Field and Filter by Career -->
  <v-row class="d-flex justify-space-between mt-3">
    <v-col class="flex-grow-1">
      <v-text-field 
        v-model="search"
        label="Buscar por nombre"
        variant="outlined"
        hide-details
        flat
        dense
        single-line
      ></v-text-field>
    </v-col>

    <v-col class="flex-grow-1">
      <v-select
        v-model="selectedCareers"
        :items="careers"
        label="Filtrar por Carrera"
        item-title="career_name"
        item-value="career_id"
        variant="outlined"
        dense
        clearable
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span v-if="index === 2" class="text-grey text-caption align-self-center">
            (+{{ selectedCareers.length - 2 }} más)
          </span>
        </template>
      </v-select> 
    </v-col>
  </v-row>
</v-card-title>


 

    <v-divider></v-divider>
  
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="catedratico in filteredCatedraticos"
        :key="catedratico.idCatedratico"
      >
        <v-expansion-panel-title>
          <v-row class="align-center">
            <!-- Catedrático name on the left -->
            {{ catedratico.nombre }}

            <v-row class="d-flex mx-4" style="flex-grow: 1;">
              <v-col>
                <!-- Chips in the left section -->
                <v-chip class="align-center mx-1" color="primary" text="ARQUITE" variant="tonal" x-small></v-chip>
                <v-chip class="align-center mx-1" color="primary" text="ARQUITE" variant="tonal" x-small></v-chip>
                <v-chip class="align-center mx-1" color="primary" text="ARQUITE" variant="tonal" x-small></v-chip>
              </v-col>

              <!-- "Entregados" chip aligned to the right -->
              <v-col class="d-flex justify-end">
                <v-chip class="align-center" color="success" text="Entregados" variant="tonal" x-small></v-chip>
              </v-col>
            </v-row>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-data-table
            :headers="headers"
            :items="catedratico.clases"
            :sortable="true"
            hide-default-footer
          >
            <template v-slot:item.grade_status="{ item }">
              <v-chip class="align-center"
                :color="item.grade_status == true ? 'success' : 'grey'"
                :text="item.grade_status == true ? 'Entregado' : 'No Entregado'"
                variant="flat"
              ></v-chip>
            </template>

            <template v-slot:item.grade_changer="{ item }">
              <v-switch 
                v-if="!item.grade_status"
                v-model="item.grade_status"
                class="align-center justify-center"
                color="success"
                inset
                @update:modelValue = 'updateGradeStatus(item.schedule_id)'
              ></v-switch>
            </template>

          </v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { GradeManagmentService, ParcialManagmentService} from '@/services/data.service.js';
 
export default {
  data() {
    return {
      search: '',

      selected: {
        year:'',
        period:'',
        parcial:''
      },

      lists: {
        jsonData:[],
        years:[],
        periods:[],
        parcials:[]
      },

      headers: [
        { title: 'Código', value: 'code' },
        { title: 'Clase', value: 'class' },
        { title: 'Sección', value: 'section', align:'center' },
        { title: 'Estado', value: 'grade_status', align:'center'},
        { title: 'Aprobar', value: 'grade_changer', align:'center', justify:'center' },
        { title: 'Aprobado por', value: 'responsible_name', align:'end'},
        { title: 'Fecha de Aprobado', value: 'grade_status_date', align:'end'}
      ],
      catedraticos: [] // Almacena todos los registros
    };
  },
  computed: {
    filteredCatedraticos() {
      if (!this.search) return this.catedraticos;
      
      return this.catedraticos.filter(catedratico =>
        catedratico.nombre?.toUpperCase().includes(this.search.toUpperCase())
      );
    }
  },
  mounted() {
    this.loadData();
  },

  methods: {

    async changeParcial(){
      try{
        const parcial_id = this.selected.parcial.id;
        console.log("Parcial Seleccionado: ", parcial_id);
        const response = await GradeManagmentService.getListByParcial(parcial_id);

        if (response.status != 200 ){
          console.log("aqui debe de mostrar un mensaje o algo");
          throw new Error("Error al cargar los datos");
        } 
        this.catedraticos = response.data;
      }catch (error) {
        console.error('Error loading JSON data:', error);
      }
    },
    
    async loadData() {
      try {      
        const parcialResponse = await ParcialManagmentService.getList();
        if (parcialResponse.status != 200){
          console.log("aqui debe de mostrar un mensaje o algo");
          throw new Error("Error al cargar los datos");
        } 
        this.lists.jsonData = parcialResponse.data;
        this.loadYears();
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    },

    async updateGradeStatus(schedule_id) {
      try {
        const responsible = '1'; // Set the responsible user ID or value
        
        // Wait for the response from the service
        const response = await GradeManagmentService.updateGradeStatus(responsible, schedule_id);

        // Check the response status and handle it
        if (response.status !== 200) {
          throw new Error("Error al cambiar el estado de entrega de nota");
        } else {
          // Call your function to handle the successful update
          this.changeParcial();
        }
      } catch (error) {
        // Catch any error that occurs in the try block
        console.error('Error loading JSON data:', error);
      }
    },


    loadYears() {
      this.lists.years = this.lists.jsonData.map(year => ({
        id: year.id,
        title: year.title
      }));

      console.log("Years: ", this.lists.years)
    },

    onYearChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year.id);
      this.lists.periods = year.children;
      this.parcials = [];
      this.selected.period = null;
      this.selected.parcial = null;

    },

    onPeriodChange() {
        const year = this.lists.jsonData.find(year => year.id === this.selected.year.id);
        const period = year.children.find(period => period.id === this.selected.period.id);
        this.lists.parcials = period.children;
        this.selected.parcial = null;
    },

  }
};
</script>

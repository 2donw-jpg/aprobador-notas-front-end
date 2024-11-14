<template>
    <v-card dense>
 
      <v-card-title class="d-flex align-center pa-2">
        <v-text-field 
        v-model="search"
        label="Buscar por nombre"
        variant="outlined"
        hide-details
        flat
        dense
        single-line
      ></v-text-field>

      <v-spacer></v-spacer>


      <!-- TODO: Implementar esto ya en sistema -->
<!--       <v-select
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
      </v-select> -->
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
                v-model="item.grade_status"
                :model-value="item.grade_status"
                class="align-center justify-center"
                color="success"
                inset
                :readonly="item.grade_status"
              ></v-switch>
            </template>

          </v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { GradeManagmentService } from '@/services/data.service.js';
 
export default {
  data() {
    return {
      search: '',
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
    async loadData() {
      try {
        const parcial_id = '1';
        const response = await GradeManagmentService.getListByParcial(parcial_id);
        if (response.status != 200){
          console.log("aqui debe de mostrar un mensaje o algo");
          throw new Error("Error al cargar los datos");
        } 

        this.catedraticos = response.data;

      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    },

    async updateGradeStatus(){
      try {

        const responsible = this.catedraticos.responsible_id;
        const schedule = this.catedraticos.schedule_id;

        
        const response = await GradeManagmentService.updateGradeStatus(responsible_id,schedule_id);
        if (response.status != 200){
          throw new Error("Error al cambiar el estado de entrega de nota");
        }
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    }
  }
};
</script>

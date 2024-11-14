<template>
  <v-dialog v-model="dialog" max-width="900">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-bold"
        text="Crear Horario de Clase"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>

    <v-stepper :items="items">
      <template v-slot:item.1>
        <v-form>
          <v-container>
          <v-row>
            <v-col>
              <v-select
                label="Año Académico"
                :items="lists.years"
                item-title="title"
                item-value="id"
                variant="outlined"
                v-model="selected.year"
                :return-object="true"
                @update:modelValue="onYearChange"
              ></v-select>  
            </v-col>
            <v-col>
              <v-select
                label="Periodo"
                :items="lists.periods"
                item-title="title"
                item-value="id"
                variant="outlined"
                v-model="selected.period"
                :disabled="!selected.year"
                :return-object="true"
                @update:modelValue="onPeriodChange"
              />
            </v-col>
            <v-col>
              <v-select
                label="Parcial"
                :items="lists.parcials"
                item-title="title"
                variant="outlined"
                item-value="id"
                v-model="selected.parcial"
                :return-object="true"
                :disabled="!selected.period"
              />
            </v-col>
          </v-row>
          </v-container>

          <v-container>
          <v-row>
          <v-col>
            <v-autocomplete
              label="Clase"
              :items="lists.classes"
              item-title="class"
              item-value="class_id"
              variant="outlined"
              v-model="selected.class"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              label="Sección"
              :items="lists.sections"
              item-title="section_name"
              item-value="section_id"
              variant="outlined"
              v-model="selected.section"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              label="Catedrático"
              :items="lists.teachers"
              item-title="teacher_name"
              item-value="teacher_id"
              variant="outlined"
              v-model="selected.teacher"
            />
          </v-col>
        </v-row>
        </v-container>
        </v-form>
      </template>

      <template v-slot:item.2>
        <h3>"En esta sección se establecerá un espacio para guardar el horario\nTemporalmente innabilidato" </h3>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>

  </v-dialog>
</template>

<script>
import { GradeManagmentService, ParcialManagmentService } from '@/services/data.service.js';

export default {
  data: () => ({
    valid: false,
    dialog: false,
    currentStep: 1,
    items: ['Establecer Asignación', 'Agregar Horario ', 'Confirmar Información'],
    selected: {
      year: '',
      period: '',
      parcial: '',
      teacher: '',
      class: '',
      section: '',
    },
    lists: {
      jsonData: [],
      years: [],
      periods: [],
      parcials: [],
      teachers: [],
      classes: [],
      sections: []
    },

  }),
  created() {
    this.loadData();
  },
  methods: {

    clearData(){
      this.valid = false;
    },

    async loadData() {
      const response = await GradeManagmentService.getFormData();
      const parcialResponse = await ParcialManagmentService.getList();
      if (response.status !== 200 || parcialResponse.status !== 200) {
        throw new Error("Error al acceder a los datos");
      }
      this.lists.teachers = response.data.teachers;
      this.lists.classes = response.data.classes;
      this.lists.sections = response.data.sections;
      this.lists.jsonData = parcialResponse.data;
      this.loadYears();
    },

    loadYears() {
      this.lists.years = this.lists.jsonData.map(year => ({
        id: year.id,
        title: year.title
      }));
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


  },    
};
</script>

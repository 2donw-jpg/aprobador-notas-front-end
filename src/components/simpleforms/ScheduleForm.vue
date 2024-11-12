<template>
  <v-dialog v-model="dialog" max-width="900">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-bold"
        text="Crear Asignación"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      >
        Crear Asignación
      </v-btn>
    </template>

    <v-stepper v-model="currentStep" :items="items" show-actions prev-text="Regresar" next-text="Siguiente">
      <template v-slot:item.1>
        <StepOne
          :years="lists.years"
          :periods="lists.periods"
          :parcials="lists.parcials"
          :selected="selected"
          @year-change="onYearChange"
          @period-change="onPeriodChange"
        />
      </template>

      <template v-slot:item.2>
        <StepTwo
          :classes="lists.classes"
          :sections="lists.sections"
          :teachers="lists.teachers"
          :selected="selected"
        />
      </template>

      <template v-slot:item.3>
        <StepThree :selected="selected" />
      </template>
    </v-stepper>
  </v-dialog>
</template>

<script>
import StepOne from './ScheduleSteps/StepOne.vue';
import StepTwo from './ScheduleSteps/StepTwo.vue';
import StepThree from './ScheduleSteps/StepThree.vue';
import { GradeManagmentService, ParcialManagmentService } from '@/services/data.service.js';

export default {
  components: { StepOne, StepTwo, StepThree },
  data: () => ({
    items: ['Establecer Parcial', 'Asignar Clase', 'Confirmar Información'],
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
    dialog: false,
    currentStep: 1
  }),
  created() {
    this.loadData();
  },
  methods: {

    async loadData() {
      const response = await GradeManagmentService.getFormData();
      const parcialResponse = await ParcialManagmentService.getList();
      if (response.status !== 200 || parcialResponse.status !== 200) {
        throw new Error("Error al acceder a los datos");
      }
      this.lists = {
        teachers: response.data.teachers,
        classes: response.data.classes,
        sections: response.data.sections,
        jsonData: parcialResponse.data
      };
      this.loadYears();
    },


    async saveData(){
      const response = await 
    }

    loadYears() {
      this.lists.years = this.lists.jsonData.map(year => ({
        id: year.id,
        title: year.title
      }));
    },

    onYearChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year);
      this.lists = {
        periods: year.children,
        parcials: []
      };
      this.selected = {
        period: null,
        parcial: null
      };
    },

    onPeriodChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year);
      const period = year.children.find(period => period.id === this.selected.period);
      this.lists.parcials = period.children;
      this.selected.parcial = null;
    },

    nextStep() {
      if (this.currentStep < this.maxSteps) this.currentStep++;
    },
    
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
        
    onStepTwo() {
      console.log("Selected data: ", this.selected);
    }
  },

  watch: {
      currentStep(newStep) {
        if (newStep === 2) {
          this.onStepThree(); // Call the function when step 3 is reached
        }
      }
    },
    
};
</script>

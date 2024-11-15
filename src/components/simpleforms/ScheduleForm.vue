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

    <v-card title="Crear Horario">
      <div>
        <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
          <v-container> 
          <v-row>
            <v-col>
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
            <v-col>
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
<!--             <v-col>
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
              />
            </v-col> -->
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
              base-color="#000"
              v-model="selected.class"
              :return-object="true"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              label="Sección"
              :items="lists.sections"
              item-title="section_name"
              item-value="section_id"
              variant="outlined"
              base-color="#000"
              v-model="selected.section"
              :return-object="true"
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
              base-color="#000"
              v-model="selected.teacher"
              :return-object="true"
            />
          </v-col>
        </v-row>
        </v-container>
        </v-form>
      </div>

          <v-card-actions>
            <v-btn text="Cerrar" variant="tonal" @click="clearData"></v-btn>
            <v-btn :disabled="!valid" variant="flat"  color="success" type="submit" @click="saveForm">Guardar</v-btn>
          </v-card-actions>
    </v-card>

  </v-dialog>

  <GeneralAlert
    :alertTitle="alert.title"
    :alertType="alert.type"
    v-model="alert.visible"
  />
</template>

<script>
import { GradeManagmentService, ParcialManagmentService } from '@/services/data.service.js';
import GeneralAlert from '../shared/GeneralAlert.vue';


export default {
  components: {
    GeneralAlert
  },


  data: () => ({
    valid: false,
    dialog: false,
    alert: {visible: false,title: '',type: ''},

    selected: {
      year: '',
      period: '',
      parcial: '',
      teacher: {
        teacher_id: '',
        teacher_name: ''
      },
      class: {
        class_id: '',
        class: ''
      },
      section: {
        section_id: '',
        section_name: ''
      },
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
      this.selected = {
        year: '',
        period: '',
        parcial: '',
        teacher: '',
        class: '',
        section: '',
      };
      this.dialog = false;  // Close dialog after clearing if needed
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

    saveForm() {
      // Prepare the base schedule data that will be shared for all parcials
        const baseScheduleData = {
          teacher_id: this.selected.teacher.teacher_id,
          teacher_name: this.selected.teacher.teacher_name,
          class_id: this.selected.class.class_id,
          //class_code: this.selected.class.class_code,
          class_name: this.selected.class.class,
          section_id: this.selected.section.section_id,
          section_name: this.selected.section.section_name,
          period_name: this.selected.period.title,
          year_name: parseInt(this.selected.year.title), // Assuming the selected year has a 'title' field
        };

        // Create an array of schedule data for all parcials
        const schedules = this.lists.parcials.map(parcial => ({
          ...baseScheduleData,  // Spread the shared data
          parcial_id: parcial.id,  // Use the existing parcial id
          parcial_name: parcial.title,  // Use the existing parcial name
        }));

        // Log the schedule data for debugging
        console.log("Sending schedule data for all parcials:", schedules);

        GradeManagmentService.createSchedule(schedules) 
        .then(response => {
          console.log("All schedules created successfully:", response);
          this.clearData();  // Clear the form data
          this.SuccessAlert(); // Optionally show success alert
        })
        .catch(error => {
          console.error("Error creating schedules:", error);
          this.ErrorAlert(); // Optionally show error alert
        });
    },

    SuccessAlert() {
      this.alert.visible = true;
      this.alert.title = 'Registro creado exitosamente';
      this.alert.type = 'success';
      
    },
    
    ErrorAlert() {
      this.alert.visible = true;
      this.alert.title = 'Error al crear registro, por favor intente de nuevo. Si el problema persiste comuniquese con su supervisor sobre el problema';
      this.alert.type = 'error';
      
    },
    WarningAlert() {
      this.alert.visible = true;
      this.alert.title = 'Por favor, llene todos los datos correctamente';
      this.alert.type = 'warning';
    }
  },    
};
</script>

<template>
    <v-card dense>
      <v-card-title class="d-flex align-center pa-2">
        <v-row class="align-top">
          <v-col cols="4">
            <v-text-field 
            v-model="search"
            label="Buscar por Nombre"
            variant="outlined"
            hide-details
            flat
            dense
            single-line
          ></v-text-field>
          </v-col>


        <v-col cols="8" >
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
  
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="filteredData"
        :search="search"
        item-key="teacher_id"
        :sortable="true"
      >

        <template v-slot:item.teacher_careers="{ item }">
          <div class="d-flex flex-wrap">
            <v-chip
              v-for="career in item.teacher_careers"
              :key="career.career_id"
              class="ma-1"
              color="primary"
              variant="outlined"
              size="small"
              label
            >
              {{ career.career_name }}
            </v-chip>
          </div>
        </template>

        <template v-slot:item.teacher_active="{ item }">
            <v-chip
              :color="item.teacher_active == 1 ? 'success' : 'grey'"
              :text="item.teacher_active == 1 ? 'Activo' : 'Inactivo'"
              variant="flat"
              size="small"
            ></v-chip>
        </template>

      </v-data-table>
    </v-card>



    
  </template>
  
  <script>

import { CareerManagmentService, TeacherManagmentService } from '@/services/data.service.js';
import TeacherFormEdit from '@/components/simpleforms/TeacherFormEdit.vue';

  export default {
    components: {
      TeacherFormEdit
    },

    

    data() {
    return {
      headers: [
        { title: 'Nombre', key: "teacher_name", value: 'teacher_name' },
        { title: 'Correo electrónico', key: "teacher_email", value: 'teacher_email',},
        { title: 'Carreras', key: "teacher_careers", value: 'teacher_careers',align:"start"},
        { title: 'Estado', key: "teacher_active", value: 'teacher_active' ,align:"center" ,sortable:false},
/*         { title: 'Acciones', key: "actions", value: '',sortable:"false",align:"center"} */
      ],

      //Filter Options
      search: "",
      selectedCareers: [],
      filteredData: [],

      teachers: [],
      careers: [],

      selectedTeacher: null,
      dialog: false,    
    };
  },

  computed: {
    
    //This throws error, but when changed literally dies XD
    filteredData() {
      return this.teachers.filter(item => {
        const matchesSearch = this.search
          ? item.teacher_name.toUpperCase().includes(this.search.toUpperCase())
          : true;

          const matchesCareer = this.selectedCareers.length
          ? item.teacher_careers.some((career) => this.selectedCareers.includes(career.career_id))
          : true;

        return matchesSearch && matchesCareer;
      });
    }
  },

  mounted() {
    this.loadData();
  },

  watcher(){

  },

  methods: {
    async loadData() {
      try {
        const careerResponse = await CareerManagmentService.getCareerList();
        const teacherResponse = await TeacherManagmentService.getTeacherList();

        //TODO: Show an alert if this if the status is not 200
        if(teacherResponse.status != 200){
          throw new Error("Error loading teacher data");
        }
        if(careerResponse.status != 200){

          throw new Error("Error loading career data");
        }
          
        this.careers = careerResponse.data;
        this.teachers = teacherResponse.data;

      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    }
  }
  }
  </script>
  
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
  
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="teachers"
        :search="search"
        item-key="name"
        :sortable="true"
      >
      <template v-slot:item.teacher_active="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.teacher_active == 'ACTIVO' ? 'success' : 'grey'"
            :text="item.teacher_active == 'ACTIVO' ? 'Activo' : 'Inactivo'"
            variant="flat"
          ></v-chip>
        </div>
      </template>

    </v-data-table>
    </v-card>
  </template>
  
  <script>

import { CareerManagmentService, TeacherManagmentService } from '@/services/data.service.js';

  export default {
    data() {
    return {
      headers: [
        { title: 'Código', key: "teacher_code", value: 'teacher_id',align:"start"},
        { title: 'Nombre', key: "teacher_name", value: 'teacher_name' },
        { title: 'Correo electrónico', key: "teacher_email", value: 'teacher_email',},
        { title: 'Estado', key: "teacher_active", value: 'teacher_active' ,align:"center"},
        { title: 'Acciones', key: "", value: '',sortable:"false",align:"center"}
      ],
      search: "",
      teachers: [],
      selectedCareers: [],
      careers: []// Almacena todos los registros
    };
  },

  mounted() {
    this.loadData();
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
  
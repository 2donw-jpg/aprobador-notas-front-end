<template>
    <v-card dense>
      <v-card-title class="d-flex align-start pa-2">
        <v-text-field
        v-model="searchCode"
        label="Buscar por Código"
        variant="outlined"
        hide-details
        flat
        dense
        single-line
      ></v-text-field>

      <v-spacer></v-spacer>

        <v-text-field
        v-model="searchName"
        label="Buscar por Nombre"
        variant="outlined"
        hide-details
        flat
        dense
        single-line
      ></v-text-field>
    </v-card-title>
 

    <v-divider></v-divider>
  
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="classes"
        :search="searchName"
        item-key="name"
        :sortable="true"
      >
      <template v-slot:item.class_active="{ item }">
        <div class="text-start">
          <v-chip
            :color="item.class_active == 1 ? 'success' : 'grey'"
            :text="item.class_active == 1 ? 'Activo' : 'Inactivo'"
            variant="flat"
          ></v-chip>
        </div>
      </template>

      </v-data-table>
    </v-card>
  </template>
  
  <script>

import { ClassManagmentService } from '@/services/data.service.js';


  export default {
    data() {
    return {
      headers: [
        { title: 'Código', key: "class_code", value: 'class_code' },
        { title: 'Nombre', key: "class_name", value: 'class_name' },
        { title: 'Estado', key: "class_active", value: 'class_active', align:"center"},
        { title: 'Acciones', key: 'actions', sortable: false }
      ],
      searchCode: "",
      searchName: "",
      classes: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    
/*     customSearch (value, search, item) {
          return Object.values(item).some(v=>v&&v.toString().toUpperCase().includes(search))
    }, */

    //Fix this
    getColor(class_active) {
        console.log("Grade status: ", class_active);
        if (class_active == "1") return 'green';
        else return 'gray';
    },

    async loadData() {
      try {
        const classResponse = await ClassManagmentService.getClassesList();
        this.classes = classResponse.data;

      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    }
  }
  }
  </script>
  
<template>
    <v-card outlined>
      <v-card-title>Información Resultante</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6"><strong>Año:</strong> {{ selected.year }}</v-col>
          <v-col cols="6"><strong>Periodo:</strong> {{ selected.period }}</v-col>
          <v-col cols="6"><strong>Parcial:</strong> {{ selected.parcial }}</v-col>
          <v-col cols="6"><strong>Clase:</strong> {{ selected.class }}</v-col>
          <v-col cols="6"><strong>Sección:</strong> {{ selected.section }}</v-col>
          <v-col cols="6"><strong>Catedrático:</strong> {{ selected.teacher }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: ["selected"]
  };
  </script>
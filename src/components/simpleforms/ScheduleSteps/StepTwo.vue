<template>
    <div>
      <h3 class="text-h6">Asignar clase a catedrático</h3>
      <v-sheet>
        <v-row>
          <v-col>
            <v-autocomplete
              label="Clase"
              :items="classes"
              item-title="class"
              item-value="class_id"
              v-model="selected.class"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              label="Sección"
              :items="sections"
              item-title="section_name"
              item-value="section_id"
              v-model="selected.section"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              label="Catedrático"
              :items="teachers"
              item-title="teacher_name"
              item-value="teacher_id"
              v-model="selected.teacher"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </template>
  
  <script>
  export default {
    props: ["classes", "sections", "teachers", "selected"]
  };
  </script>
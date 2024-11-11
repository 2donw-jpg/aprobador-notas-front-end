<template>
      <v-dialog v-model="dialog" max-width="600" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-bold"
            text="Crear Asignatura"
            color="success"
            variant="elevated"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card title="Crear Asignatura">
          <v-divider></v-divider>
  
          <v-card-text>
            <v-row >
              <v-col >
                <v-text-field 
                  v-model="classCode"
                  label="Código de asignatura" 
                  variant="underlined"
                  required></v-text-field>
              </v-col>
  
              <v-col>
                <v-text-field 
                  v-model="className"
                  label="Nombre de asignatura" 
                  variant="underlined"
                  required></v-text-field>
              </v-col>
            </v-row >
            
            <v-divider></v-divider>
          </v-card-text>
  
         
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn text="Cerrar" variant="tonal" @click="clearData"></v-btn>
  
            <v-btn
              color="success"
              text="Guardar"
              variant="flat"
              @click="saveForm"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>
  
  
  <!-- * Script Section -->
  <script>
  import { ClassManagmentService } from '@/services/data.service.js';
  
  export default {
    data() {
      return {
        dialog: false,
        classCode: '',
        className: '',
      };
    },
  
    methods: {
  
      clearData(){
        this.classCode = '';
        this.className = '',
        this.dialog = false;
      },
    
      async saveForm() {
        if (this.classCode && this.className) {
          try {
            const response = await ClassManagmentService.createClass(this.classCode, this.className);
            console.log("Response: ", response)
            this.classCode = '';
            this.className = '',
            this.dialog = false;
          } catch (error) {
              console.error('Error creating class:', error);
          }
  
          console.log("Form submitted:", {
            classCode: this.classCode,
            className: this.className,
          });
          this.dialog = false; // Close the dialog after saving
        } else {
          // Show validation errors
          alert("Please fill in all fields.");
        }
      }

    }
  };
  </script>
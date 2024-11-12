<template>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-bold"
          text="Crear Catedrático"
          color="success"
          variant="elevated"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card title="Crear Catedrático">
        <v-divider></v-divider>

        <v-card-text>
          <v-row >
            <v-col >
              <v-text-field 
                v-model="firstName"
                label="Nombres" 
                variant="underlined"
                required></v-text-field>
            </v-col>

            <v-col>
              <v-text-field 
                v-model="lastName"
                label="Apellidos" 
                variant="underlined"
                required></v-text-field>
            </v-col>
          </v-row >
          
          <v-row> 
            <v-col>
              <v-text-field 
                v-model="email"
                label="Correo electrónico" 
                variant="underlined"
                suffix="@ujcv.edu.hn"
                required></v-text-field>
            </v-col>

            <v-col >
            <v-select
              v-model="selectedCareers"
              :items="careers"
              label="Filtrar por Carrera"
              item-title="career_name"
              item-value="career_id"
              variant="underlined"
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
import { CareerManagmentService, TeacherManagmentService } from '@/services/data.service.js';

export default {
  data() {
    return {
      dialog: false,
      firstName: '',
      lastName: '',
      email: '',
      selectedCareers: [],
      careers: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {

    clearData(){
      this.firstName = '';
      this.lastName = '',
      this.email = '';
      this.selectedCareers = [];
      this.dialog = false;
    },

    async loadData() {
      try {
        const careerResponse = await CareerManagmentService.getCareerList();
        this.careers = careerResponse.data;
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    },

    async saveForm() {
      if (this.firstName && this.lastName) {
        try {
          const response = await TeacherManagmentService.createTeacher(this.firstName.concat(" ",this.lastName), this.email);
          console.log("Response: ", response)
          console.log('Teacher created successfully:', response.data);
        } catch (error) {
            console.error('Error creating teacher:', error);
        }

        console.log("Form submitted:", {
          firstName: this.firstName,
          lastName: this.lastName,
          selectedCareers: this.selectedCareers
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
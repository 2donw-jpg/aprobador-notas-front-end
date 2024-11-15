<template>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <!-- Button to make it pop up -->
        <v-btn
          class="text-none font-weight-bold"
          text="Nuevo Catedrático"
          color="success"
          variant="elevated"
          v-bind="activatorProps"
        ></v-btn>
      </template>
      
        <v-card title="Crear Catedrático" min-width=600>
          <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
            <v-container>
            <v-row class="align-end">
              <!-- Full Name Field -->
              <v-col>
                <v-text-field
                  v-model="edit.fullName"
                  label="Nombre completo"
                  variant="underlined"
                  :rules="[fullNameRules.required, fullNameRules.minLength, fullNameRules.onlyLetters]"
                  required
                ></v-text-field>
              </v-col>
            
              <!-- Email Field -->
              <v-col>
                <v-text-field
                  v-model="edit.email"
                  label="Correo electrónico"
                  variant="underlined"
                  :rules="[emailRules.required, emailRules.email]"
                  suffix="@ujcv.edu.hn"
                ></v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col>
                <v-select
                  v-model="edit.selectedCareers"
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
            
          </v-container>
          </v-form>
  
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
  
  import { CareerManagmentService, TeacherManagmentService } from '@/services/data.service.js';
  import GeneralAlert from '../shared/GeneralAlert.vue';
  
  export default {
    props: {
    id: {
      type: Number,
      default: null
    },
    fullName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    selectedCareers: {
      type: [],
      default: []
    },

    },

    components: {
      GeneralAlert
    },
  
    data() {
      return {
        //Dialog Control
        dialog: false,
  
        //General Alert data
        //TODO: check the alerts
        alert: {visible: false,title: '',type: ''},
        edit:{
            fullName:'',
            selectedCareers:[],
            email:''
        },
        //Form data
        valid: false,
        careers: [],
        fullNameRules: {
          required: v => !!v || 'Nombre completo es requerido',
          minLength: v => (v && v.length >= 10) || 'El nombre debe de contener por lo menos 10 carácteres',
          onlyLetters: v => /^[a-zA-Zñ\s]+$/.test(v) || 'El nombre solo puede contener letras y espacios',
        },
        emailRules: {
          required: v => !!v || 'Correo electrónico es requerido',
          email: v => /^[a-zA-Z-9]+(\.[a-zA-Z-9]+)?$/.test(v) || 'El correo solo pueden ser letras, números y el signo de puntuación en medio'      }
      };
    },
  
    mounted() {
      this.loadData();
    },
  
    methods: {
      clearData() {
        this.edit.fullName = '';
        this.edit.email = '';
        this.edit.selectedCareers = [];
        this.dialog = false;
        this.valid = false;
  
      },
  
      async loadData() {
        try {
            this.edit = {
                fullName:this.fullName,
                selectedCareers:this.selectedCareers,
                email:this.email,
            };
          const careerResponse = await CareerManagmentService.getCareerList();
          this.careers = careerResponse.data;
        } catch (error) {
          console.error('Error loading JSON data:', error);
        }
      },
  
      saveForm() {
        if (this.valid) {
          TeacherManagmentService.createTeacher(this.fullName.toUpperCase(), this.email, this.selectedCareers)
            .then(response => {
              // Check if response status is 201 (created)
              if (response.status === 201) {
                this.SuccessAlert();
                this.clearData();
              } else {
                this.ErrorAlert();  // Error alert if status isn't 201 (unexpected response)
              }
            })
            .catch(error => {
              console.error('Error creating teacher:', error);
              this.ErrorAlert();  // Error alert if the request fails (e.g., network issues)
            });
        } else {
          this.WarningAlert();  // Show warning alert if form is invalid
        }
      }, 
  
       //General Alert responses
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
  
    }
  };
  </script>
  
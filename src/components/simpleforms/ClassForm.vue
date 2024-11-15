<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <!-- Button to make it pop up -->
      <v-btn
        class="text-none font-weight-bold"
        text="Nueva Clase"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      ></v-btn>
    </template>
    
      <v-card title="Crear Clase" min-width=600>
        <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
          <v-container>
          <v-row class="align-end">
            <!-- ClassCode Field -->
            <v-col>
              <v-text-field
                v-model="classCode"
                label="Código"
                variant="underlined"
                :rules="[classCodeRules.required, classCodeRules.length, classCodeRules.alfanumeric]"
                required
              ></v-text-field>
            </v-col>
          
            <!-- ClassName Field -->
            <v-col>
              <v-text-field
                v-model="className"
                label="Nombre de la clase"
                variant="underlined"
                :rules="[classNameRules.required, classNameRules.name]"
              ></v-text-field>
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

import { ClassManagmentService } from '@/services/data.service.js';
import GeneralAlert from '@/components/shared/GeneralAlert.vue';

export default {
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

      //Form data
      valid: false,
      classCode: '',
      className: '',

      classCodeRules: {
        required: v => !!v || 'El código es requerido',
        length: v => (v && v.length == 7) || 'El código debe de contener 7 carácteres',
        alfanumeric: v => /^[a-zA-Z0-9ñÑ\s]+$/.test(v) || 'El código debe de ser alfanumérico', 
      },

      classNameRules: {
        required: v => !!v || 'El nombre de la clase es requerido',
        name: v => /^[a-zA-Z0-9\sñÑ]+([.-]?[a-zA-Z0-9\sñÑ]+)*$/.test(v) || 'El nombre debe de ser alfanumérico'
      }
    };
  },

  methods: {
    clearData() {
      this.classCode = '';
      this.className = '';
      this.dialog = false;
      this.valid = false;

    },

    saveForm() {
      if (this.valid) {
        ClassManagmentService.createClass(this.classCode.toUpperCase(), this.className.toUpperCase())
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

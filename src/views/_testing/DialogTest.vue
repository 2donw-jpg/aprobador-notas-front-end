<template>
    <v-dialog v-model="dialog" max-width="900">
      <template v-slot:activator="{ props: activatorProps }">
        <!-- Button to open dialog -->
        <v-btn
          class="text-none font-weight-bold"
          text="Crear Asignación"
          color="success"
          variant="elevated"
          v-bind="activatorProps"
        ></v-btn>
      </template>
  
      <v-card title="Periodo Académico" min-width="900">
        <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
          <v-container>
            <v-row>
              <!-- Año Académico Field -->
              <v-col>
                <v-autocomplete
                  v-model="selectedYear"
                  :items="lists.years"
                  label="Año Académico"
                  variant="outlined"
                  :hide-selected="false"
                  required
                ></v-autocomplete>
              </v-col>
  
              <!-- Periodo Académico Field -->
              <v-col>
                <v-autocomplete
                  v-model="selectedPeriod"
                  :items="lists.periods"
                  label="Periodo Académico"
                  variant="outlined"
                  :hide-selected="false"
                  required
                ></v-autocomplete>
              </v-col>
  
              <!-- Date Range Field -->
              <v-col class="d-flex justify-center">
                <v-date-input
                  v-model="period"
                  variant="outlined"
                  max-width="368"
                  multiple="range"
                  label="Rango de Fechas"
                ></v-date-input>
              </v-col>
            </v-row>
  
            <!-- Parciales Form Section -->
            <v-row>
              <h5>Parciales del Periodo</h5>
              <v-divider class="mb-4"></v-divider>
  
              <v-row>
                <!-- I Parcial -->
                <v-col cols="4">
                  <h4>I Parcial</h4>
                  <v-date-input
                    v-model="parcials.first"
                    variant="underlined"
                    label="Fecha de I Parcial"
                    multiple="range"
                    max-width="368"
                  ></v-date-input>
                </v-col>
  
                <!-- II Parcial -->
                <v-col cols="4">
                  <h4>II Parcial</h4>
                  <v-date-input
                    v-model="parcials.second"
                    variant="underlined"
                    label="Fecha de II Parcial"
                    multiple="range"
                    max-width="368"
                  ></v-date-input>
                </v-col>
  
                <!-- III Parcial -->
                <v-col cols="4">
                  <h4>III Parcial</h4>
                  <v-date-input
                    v-model="parcials.third"
                    variant="underlined"
                    label="Fecha de III Parcial"
                    multiple="range"
                    max-width="368"
                  ></v-date-input>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-form>
  
        <!-- Card Actions -->
        <v-card-actions>
          <v-btn text="Cerrar" variant="tonal" @click="clearData"></v-btn>
          <v-btn :disabled="!valid" variant="flat" color="success" type="submit" @click="saveForm">Guardar</v-btn>
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
  import GeneralAlert from '@/components/shared/GeneralAlert.vue';
  
  export default {
    components: {
      GeneralAlert
    },
  
    data() {
      return {
        // Dialog control
        dialog: false,
        valid: false,
  
        // General Alert data
        alert: { visible: false, title: '', type: '' },
  
        // Form data
        selectedYear: '',
        selectedPeriod: '',
        period: '',
        parcials: {
          first: '',
          second: '',
          third: ''
        },
        lists: {
          years: [],   // Load year options
          periods: []  // Load period options
        }
      };
    },
  
    methods: {
      clearData() {
        this.selectedYear = '';
        this.selectedPeriod = '';
        this.period = '';
        this.parcials = { first: '', second: '', third: '' };
        this.dialog = false;
        this.valid = false;
      },
  
      saveForm() {
        if (this.valid) {
          // Save the form data
          this.SuccessAlert();
          this.clearData();
        } else {
          this.WarningAlert();
        }
      },
  
      SuccessAlert() {
        this.alert.visible = true;
        this.alert.title = 'Registro creado exitosamente';
        this.alert.type = 'success';
      },
  
      ErrorAlert() {
        this.alert.visible = true;
        this.alert.title = 'Error al crear registro, por favor intente de nuevo.';
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
  
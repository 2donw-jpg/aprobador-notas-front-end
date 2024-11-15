<template>
  <v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <!-- Button to make it pop up -->
      <v-btn
        class="text-none font-weight-bold"
        text="Crear Asignación"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>

    <v-card title="Establecer Periodo Académico">
      <v-form ref="form" v-model="valid" @submit.prevent="saveForm">
        <v-container>
          <v-row class="align-end">
            <!-- Year Field -->
            <v-col>
              <v-autocomplete
                v-model="selectedYear"
                :items="lists.years"
                label="Año Académico"
                item-title="title"
                item-value="id"
                variant="outlined"
                :hide-selected="false"
                :return-object="true"
                @update:modelValue="onYearChange"
                required
              ></v-autocomplete>
            </v-col>

            <!-- Period Name Field -->
            <v-col>
              <v-autocomplete
                v-model="selectedPeriod"
                :items="lists.periods"
                label="Periodo Académico"
                item-title="title"
                item-value="id"
                variant="outlined"
                :hide-selected="false"
                :return-object="true"
                @update:modelValue="onPeriodChange"
                required
              ></v-autocomplete>
            </v-col>

            <!-- Period Year Field -->
            <v-col class="justify-center">
              <v-date-input
                v-model="period.value"
                variant="outlined"
                max-width="368"
                multiple="range"
                :disabled="!selectedPeriod"
                @update:modelValue="updateAllowedDates"
              ></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-card class="pa-5 elevation-0">
              <v-card-title class="text-h5">Parciales del Periodo</v-card-title>
              <v-divider class="mb-4"></v-divider>

              <v-row>
                <!-- I Parcial -->
                <v-col cols="4">
                  <h4>I Parcial</h4>
                  <v-date-input
                    v-model="parcials.first.value"
                    variant="outlined"
                    label="Inicio y Fin"
                    multiple="range"
                    max-width="368"
                    :max="period.end"
                    :min="period.start"
                    :disabled="!period.value"
                    @update:modelValue="allowedDatesForSecond"
                  ></v-date-input>
                </v-col>

                <!-- II Parcial -->
                <v-col cols="4">
                  <h4>II Parcial</h4>
                  <v-date-input
                    v-model="parcials.second.value"
                    variant="outlined"
                    label="Inicio y Fin"
                    multiple="range"
                    max-width="368"
                    :max="period.end"
                    :min="parcials.first.end"
                    :disabled="!parcials.first.value"
                    @update:modelValue="allowedDatesForThird"
                  ></v-date-input>
                </v-col>

                <!-- III Parcial -->
                <v-col cols="4">
                  <h4>III Parcial</h4>
                  <v-date-input
                    v-model="parcials.third.value"
                    variant="outlined"
                    label="Inicio y Fin"
                    multiple="range"
                    max-width="368"
                    :max="period.end"
                    :min="parcials.second.end"
                    :disabled="!parcials.second.value"
                  ></v-date-input>
                </v-col>
              </v-row>
            </v-card>
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
import { ParcialManagmentService } from '@/services/data.service.js';
  import GeneralAlert from '@/components/shared/GeneralAlert.vue';
    export default{
        components: {
          GeneralAlert
        },

        data: () => ({
          dialog: false,
          valid: false,
          alert: { visible: false, title: '', type: '' },
          
          lists: {
            jsonData: [],
            periods: [],
            years: [],
          },
          selectedPeriod: '',
          selectedYear: '',
          period: {value:null, start:null, end:null},
          parcials: {
            first: {value:null, start:null, end:null},
            second: {value:null, start:null, end:null},
            third: {value:null, start:null, end:null},      
          },
        }),

        created(){
          this.loadData();
        },

        methods:{
          clearData() {
            this.selectedYear = '';
            this.selectedPeriod = '';
            this.period = {};
            this.parcials = { first: {}, second: {}, third:{} };
            this.dialog = false;
            this.valid = false;
          },
          

          async loadData() {
            const response = await ParcialManagmentService.getList();
            if (response.status != 200 ) return this.ErrorAlert();
            this.lists.jsonData = response.data;
            this.loadYears();
          },

          loadYears() {
            this.lists.years = this.lists.jsonData.map(year => ({
              id: year.id,
              title: year.title
            }));
          },

          loadPeriod(period){
            this.period = {
                value: [new Date(period.start_date),new Date(period.end_date)],
                start: new Date(period.start_date),
                end: new Date(period.end_date),
              };
          },

          loadParcial(){
           /*  foreach(parcial => parcials){
              this.parcials.parcial = {
                value: [new Date(parcial.start_date),new Date(parcial.end_date)],
                start: new Date(parcial.start_date),
                end: new Date(parcial.end_date),
              };
            } */
          },

          loadParcials(){


          },

          onYearChange() {
            const year = this.lists.jsonData.find(year => year.id === this.selectedYear.id);

            this.lists.periods = year.children;
            this.parcials = [];
            this.period = {};
            this.parcials = { first: {}, second: {}, third:{} };

          },

          onPeriodChange() {
              const year = this.lists.jsonData.find(year => year.id === this.selectedYear.id);
              const period = year.children.find(period => period.id === this.selectedPeriod.id);
              this.loadPeriod(period);
              this.loadParcials()
              this.parcials = { first: {}, second: {}, third:{} };
          },

          saveForm(){

          },

          updateAllowedDates() {
            this.period.start = this.period.value[0];
            this.period.end = this.period.value[this.period.value.length - 1];
            this.parcials.first = {};
            this.parcials.second = {};
            this.parcials.third = {};
          },
          
          allowedDatesForSecond() {
            this.parcials.first.start = this.parcials.first.value[0];
            this.parcials.first.end  = this.parcials.first.value[this.parcials.first.value.length - 1];
            this.parcials.second = {};
            this.parcials.third = {};
          },

          allowedDatesForThird() {
            this.parcials.second.start = this.parcials.second.value[0];
            this.parcials.second.end  = this.parcials.second.value[this.parcials.second.value.length - 1];
            this.parcials.third = {};
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

    }
</script>

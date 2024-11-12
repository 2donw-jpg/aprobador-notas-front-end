<template>
<v-dialog v-model="dialog" max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-bold"
        text="Crear Asignación"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>

    <v-stepper 
      v-model="step" 
      :items="items" 
      show-actions
      prev-text="Regresar"
      next-text="Siguiente">

      <template v-slot:item.1>
              <v-row class="ma-2">
                <v-col>
                  <v-autocomplete
                  :items=years
                  label="Año"
                  variant="underlined"
                  :hide-selected="false"
                  
                  required
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                  :items=periods
                  label="Nombre del Periodo"
                  variant="underlined"
                  :hide-selected="false"  
                  required
                  ></v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h3>Fecha Inicial</h3>
                  <v-date-picker :hide-header="true" color="primary"></v-date-picker>
                </v-col>

                <v-col>
                  <h3>Fecha Final</h3>
                  <v-date-picker :hide-header="true" color="primary"></v-date-picker>
                </v-col>
              </v-row>
      </template>

          
      <template v-slot:item.2>
          <v-expansion-panels>

            <v-expansion-panel>
              <v-expansion-panel-title v-slot="{ expanded }">
                <v-row no-gutters>
                  <v-col class="d-flex justify-start" cols="4">
                    I Periodo
                  </v-col>
                  <v-col class="text--secondary" cols="8">

                    <v-fade-transition leave-absolute>
                      <span v-if="expanded"></span>
                      <v-row v-else style="width: 100%" no-gutters>
                        
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Inicial: {{ parcials.first.start || 'Sin definir' }}
                        </v-col>
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Final: {{ parcials.first.end || 'Sin definir' }}
                        </v-col>
                      </v-row>
                    </v-fade-transition>

                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row justify="space-around" no-gutters>

                  <v-col cols="3">
                    <h3>Fecha Inicial</h3>
                    <v-date-picker 
                      :hide-header="true" 
                      color="primary">
                    </v-date-picker>
                  </v-col>

                  <v-col cols="3">
                    <h3>Fecha Final</h3>
                    <v-date-picker 
                      :hide-header="true" 
                      color="primary">
                    </v-date-picker>
                  </v-col>

                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title v-slot="{ expanded }">
                <v-row no-gutters>
                  <v-col class="d-flex justify-start" cols="4">
                    II Periodo
                  </v-col>
                  <v-col class="text--secondary" cols="8">

                    <v-fade-transition leave-absolute>
                      <span v-if="expanded"></span>
                      <v-row v-else style="width: 100%" no-gutters>
                        
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Inicial: {{ parcials.second.start || 'Sin definir' }}
                        </v-col>
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Final: {{ parcials.second.end || 'Sin definir' }}
                        </v-col>
                      </v-row>
                    </v-fade-transition>

                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row justify="space-around" no-gutters>

                  <v-col cols="3">
                    <h3>Fecha Inicial</h3>
                    <v-date-picker 
                      :hide-header="true" 
                      color="primary">
                    </v-date-picker>
                  </v-col>

                  <v-col cols="3">
                    <h3>Fecha Final</h3>
                    <v-date-picker 
                      :hide-header="true" 
                      color="primary">
                    </v-date-picker>
                  </v-col>

                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title v-slot="{ expanded }">
                <v-row no-gutters>
                  <v-col class="d-flex justify-start" cols="4">
                    III Periodo
                  </v-col>
                  <v-col class="text--secondary" cols="8">

                    <v-fade-transition leave-absolute>
                      <span v-if="expanded"></span>
                      <v-row v-else style="width: 100%" no-gutters>
                        
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Inicial: {{ trip.start || 'Sin definir' }}
                        </v-col>
                        <v-col class="d-flex justify-start" cols="6">
                          Fecha Final: {{ trip.end || 'Sin definir' }}
                        </v-col>
                      </v-row>
                    </v-fade-transition>

                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row justify="space-around" no-gutters>

                  <v-col cols="3">
                    <h3>Fecha Inicial</h3>
                    <v-date-picker :hide-header="true" color="primary"></v-date-picker>
                  </v-col>

                  <v-col cols="3">
                    <h3>Fecha Final</h3>
                    <v-date-picker :hide-header="true" color="primary"></v-date-picker>
                  </v-col>

                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>

          </v-expansion-panels>
      </template>

      <template v-slot:item.3>
          <h3 class="text-h6">Revisar que todo esté correcto</h3>
      </template>

    </v-stepper>
  </v-dialog>

</template>

<script>

    export default{
        data: () => ({
                items: ['Establecer Fechas', 'Establecer Parciales', 'Confirmar Datos'],
                dialog: false,
                step: 1,
                periods: ["I Periodo", "II Periodo", "III Periodo"],
                years: ["2024","2025","2026","2027","2028","2029"],
                parcials: {
                  first:{start:null, end:null},
                  second:{start:null, end:null},
                  third:{start:null, end:null}
                },
            }),
    }
</script>

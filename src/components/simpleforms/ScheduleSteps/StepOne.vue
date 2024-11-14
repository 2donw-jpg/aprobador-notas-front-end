<template>
    <div>
      <h3 class="text-h6">Fecha de Parcial</h3>
      <v-sheet>
        <v-row>
          <v-col>
            <v-select
              label="Año"
              :items="years"
              item-title="title"
              item-value="id"
              variant="underlined"
              v-model="selected.year"
            />
          </v-col>
          <v-col>
            <v-select
              label="Periodo"
              :items="periods"
              item-title="title"
              item-value="id"
              variant="underlined"
              v-model="selected.period"
              :disabled="!selected.year"
              @click="$emit('year-change')"
            />
          </v-col>
          <v-col>
            <v-select
              label="Parcial"
              :items="parcials"
              item-title="title"
              variant="underlined"
              item-value="id"
              v-model="selected.parcial"
              :disabled="!selected.period"
              @click="$emit('period-change')"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </template>
  
  <script>
  export default {
    props: ["years", "periods", "parcials", "selected"],



    methods: {
      loadYears() {
      this.lists.years = this.lists.jsonData.map(year => ({
        id: year.id,
        title: year.title
      }));
    },

    onYearChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year);
      this.lists = {
        periods: year.children,
        parcials: []
      };

      this.$emit('update:value', newValue);

      this.selected = {
        period: null,
        parcial: null
      };
    },

    onPeriodChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year);
      const period = year.children.find(period => period.id === this.selected.period);
      this.lists.parcials = period.children;
      this.selected.parcial = null;
    },
    }

    
  };
  </script>
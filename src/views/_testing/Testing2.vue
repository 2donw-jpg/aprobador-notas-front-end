<template>
    <v-form>
      <v-row>
        <v-col>
          <v-select
            label="Año Académico"
            :items="lists.years"
            item-title="title"
            item-value="id"
            variant="underlined"
            v-model="selected.year"
            :return-object="true"
            @update:modelValue="onYearChange"
          ></v-select>  
        </v-col>
        <v-col>
          <v-select
            label="Periodo"
            :items="lists.periods"
            item-title="title"
            item-value="id"
            variant="underlined"
            v-model="selected.period"
            :disabled="!selected.year"
            :return-object="true"
            @update:modelValue="onPeriodChange"
          />
        </v-col>
        <v-col>
          <v-select
            label="Parcial"
            :items="lists.parcials"
            item-title="title"
            variant="underlined"
            item-value="id"
            v-model="selected.parcial"
            :return-object="true"
            :disabled="!selected.period"
          />
        </v-col>
      </v-row>
    </v-form>
  </template>


<script>
import { ParcialManagmentService } from '@/services/data.service.js';

export default {
  data: () => ({
    selected: {
      year: '',
      period: '',
      parcial: '',
    },
    lists: {
      jsonData: [],
      years: [],
      periods: [],
      parcials: [],
    },

  }),
  created() {
    this.loadData();
  },
  methods: {

    clearData(){
      this.valid = false;
    },

    async loadData() {
      //const response = await GradeManagmentService.getFormData();
      const parcialResponse = await ParcialManagmentService.getList();
      if ( parcialResponse.status !== 200) {
        throw new Error("Error al acceder a los datos");
      }
      this.lists = {
        jsonData: parcialResponse.data 
      };
      this.loadYears();
    },

    loadYears() {
      this.lists.years = this.lists.jsonData.map(year => ({
        id: year.id,
        title: year.title
      }));
    },

    onYearChange() {
      const year = this.lists.jsonData.find(year => year.id === this.selected.year.id);
      this.lists.periods = year.children;
      this.parcials = [];
      this.selected.period = null;
      this.selected.parcial = null;

    },

    onPeriodChange() {
        const year = this.lists.jsonData.find(year => year.id === this.selected.year.id);
        const period = year.children.find(period => period.id === this.selected.period.id);
        this.lists.parcials = period.children;
        this.selected.parcial = null;
    },
  },    
};
</script>
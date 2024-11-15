<template>
    <v-container>
      <v-treeview
        :items="treeData"
        open-all
        item-text="title"
        item-children="children"
        class="elevation-1"
        selectable
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item.children && item.children.length">mdi-folder</v-icon>
          <v-icon v-else>mdi-calendar</v-icon>
        </template>
      </v-treeview>
    </v-container>
  </template>
  

  <script>
import { ParcialManagmentService } from '@/services/data.service.js';

export default {

  data() {
    return {
      treeData: [],
    };
  },
  created() {
    this.treeData = this.formatData([
      // Place the JSON data you provided here
    ]);
  },
  methods: {

    
    formatData(data) {
      return data.map((year) => ({
        id: year.id,
        title: year.title,
        children: year.children.map((period) => ({
          id: period.id,
          title: period.title,
          start_date: period.start_date,
          end_date: period.end_date,
          children: period.children.map((parcial) => ({
            id: parcial.id,
            title: `${parcial.title} (${parcial.start_date} - ${parcial.end_date})`,
          })),
        })),
      }));
    },
  },
};
</script>

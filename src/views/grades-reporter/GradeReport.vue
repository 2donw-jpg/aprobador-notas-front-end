<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ListItem from '@/views/grades-reporter/components/ListItem.vue';

const page: Ref<{ title: string }> = ref({ title: 'Listado de Aprobación' });
const breadcrumbs: Ref<{ title: string; disabled: boolean; href: string }[]> = ref([
  {
    title: 'Reporte de Notas',
    disabled: true,
    href: '#'
  }
]);

</script>

<template>

  <v-row>
    <v-col>
      <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    </v-col>
    <v-col>
      
    </v-col>
  </v-row>

  <v-col cols="24" md="12">
    <ListItem></ListItem>
<!--       <ScheduleList></ScheduleList> -->
  </v-col>
</template>
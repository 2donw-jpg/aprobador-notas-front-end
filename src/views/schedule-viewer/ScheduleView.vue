<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ScheduleList from '@/views/schedule-viewer/components/ScheduleList.vue';
import ScheduleForm from '@/components/simpleforms/ScheduleForm.vue';

const page: Ref<{ title: string }> = ref({ title: 'Horario de Clases' });
const breadcrumbs: Ref<{ title: string; disabled: boolean; href: string }[]> = ref([
  {
    title: 'Itenirario',
    disabled: true,
    href: '#'
  }
]);

</script>

<template>

  <v-row class="align-start">
      <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  </v-row>
  
  <v-col cols="24" md="12">
      <ScheduleForm></ScheduleForm>
  </v-col>

</template>


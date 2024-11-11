<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ScheduleList from '@/views/schedule-viewer/components/ScheduleList.vue';
import TeacherForm from '@/components/simpleforms/TeacherForm.vue';

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
  <!-- Breadcrumb component -->
  <v-row>
    <v-col>
      <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    </v-col>
    <v-col>
      <TeacherForm></TeacherForm>
    </v-col>
  </v-row>

  <v-col cols="24" md="12">
      <ScheduleList></ScheduleList>
  </v-col>
</template>

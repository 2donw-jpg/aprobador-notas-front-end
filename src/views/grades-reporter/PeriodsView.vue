<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PeriodForm from '@/components/simpleforms/PeriodForm.vue';
import TeacherList from '@/views/grades-reporter/components/TeacherList.vue';

const page: Ref<{ title: string }> = ref({ title: 'Periodos y Parciales' });
const breadcrumbs: Ref<{ title: string; disabled: boolean; href: string }[]> = ref([
  {
    title: 'Periodos y Parciales',
    disabled: true,
    href: '#'
  }
]);

</script>

<template>
  <!-- Breadcrumb component -->
  <v-row class="align-start">
      <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-spacer></v-spacer>

    <v-col class="d-flex flex-row align-center">
      <PeriodForm class="ma-2"></PeriodForm>
    </v-col>

  </v-row>


  <v-col cols="24" md="12">
      <TeacherList></TeacherList>
  </v-col>
</template>

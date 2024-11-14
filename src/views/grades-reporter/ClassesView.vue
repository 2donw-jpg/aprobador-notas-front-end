<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ClassForm from '@/components/simpleforms/ClassForm.vue';
import ClassesList from '@/views/grades-reporter/components/ClassesList.vue';

const page: Ref<{ title: string }> = ref({ title: 'Clases' });
const breadcrumbs: Ref<{ title: string; disabled: boolean; href: string }[]> = ref([
  {
    title: 'Clases',
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
      <ClassForm class="ma-2"></ClassForm>
      <v-btn
        class="ma-2 text-none font-weight-bold"
        text="Exportar Clases"
        variant="elevated"
        disabled
      ></v-btn>
    </v-col>

  </v-row>


  <v-col cols="24" md="12">
      <ClassesList @executeFunction="parentFunction"></ClassesList>
  </v-col>
</template>

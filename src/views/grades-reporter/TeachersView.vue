<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TeacherForm from '@/components/simpleforms/TeacherForm.vue';
import TeacherList from '@/views/grades-reporter/components/TeacherList.vue';

const page: Ref<{ title: string }> = ref({ title: 'Catedráticos' });
const breadcrumbs: Ref<{ title: string; disabled: boolean; href: string }[]> = ref([
  {
    title: 'Catedráticos',
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
      <TeacherForm class="ma-2"></TeacherForm>
      <v-btn
        class="ma-2 text-none font-weight-bold"
        text="Exportar Catedráticos"
        variant="elevated"
        disabled
      ></v-btn>
    </v-col>

  </v-row>


  <v-col cols="24" md="12">
      <TeacherList></TeacherList>
  </v-col>
</template>

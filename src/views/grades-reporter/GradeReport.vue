<script setup lang="ts">
import { ref, type Ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import RecentOrder from '@/views/dashboard/components/RecentOrder.vue';

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
  <!-- Breadcrumb component -->
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  


  <v-col cols="24" md="12">
      <RecentOrder />
  </v-col>
</template>

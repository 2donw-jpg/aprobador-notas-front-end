<template>
    <v-alert
      text=
      title=
      type=
    ></v-alert>
</template>



<script>
const props = defineProps({
  title: String,
  text: String,
  icon: ALERT_TYPE,
});

const ALERT_TYPE = {
  SUCCESS: { icon: "mdi-check-circle", color: "success" },
  WARNING: { icon: "mdi-alert", color: "warning" },
  ERROR: { icon: "mdi-alert-circle", color: "error" },
  INFORMATION: { icon: "mdi-information", color: "primary" },
};

data: () => ({
      items: ['Establecer Parcial', 'Asignar Clase', 'Establecer Horario'],
      jsonData: [],
      selectedYear: null,
      selectedPeriod: null,
      selectedParcial: null,
      years: [],
      periods: [],
      parcials: [],


      dialog: false,
      shipping: 0,
      step: 1,
      
      products: [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10,
        },
      ],
    }),


</script>
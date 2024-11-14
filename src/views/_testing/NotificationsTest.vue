<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <!-- Button to make it pop up -->
      <v-btn
        class="text-none font-weight-bold"
        text="Nuevo Catedrático"
        color="success"
        variant="elevated"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <template>
      <v-btn
        class="text-none font-weight-bold"
        text="Success Alert"
        color="success"
        variant="elevated"
        @click="SuccessAlert"
      ></v-btn>

      <v-btn
        class="text-none font-weight-bold"
        text="Error Alert"
        color="error"
        variant="elevated"
        @click="ErrorAlert"
      ></v-btn>

      <v-btn
        class="text-none font-weight-bold"
        text="Warning Alert"
        color="warning"
        variant="elevated"
        @click="WarningAlert"
      ></v-btn>
    </template>
  </v-dialog>

  <GeneralAlert
    :alertTitle="alert.title"
    :alertType="alert.type"
    v-model="alert.visible"
  />

</template>

<script>
import GeneralAlert from '@/components/shared/GeneralAlert.vue';

export default {
  components: {
    GeneralAlert,
  },

  data() {
    return {
      dialog:false,
      alert: {visible: false,title: '',type: ''},
    };
  },

  methods: {


    SuccessAlert() {
      this.alert.visible = true;
      this.alert.title = 'Teacher created successfully';
      this.alert.type = 'success';
      
    },
    ErrorAlert() {
      this.alert.visible = true;
      this.alert.title = 'Failed to create teacher. Please try again.';
      this.alert.type = 'error';
      
    },
    WarningAlert() {
      this.alert.visible = true;
      this.alert.title = 'Please fill in all fields correctly.';
      this.alert.type = 'warning';
    }
  }
};
</script>
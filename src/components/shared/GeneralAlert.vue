<template>
  <v-snackbar
    :v-model="visible"
    :timeout="timeout"
    :color="alertType"
    :text="alertTitle"
  >
  </v-snackbar>
</template>

<script>
export default {
  props: {
    alertTitle: {
      type: String,
      required: true
    },
    alertType: {
      type: String,
      default: "error"
    },
    timeout: {
      type: Number,
      default: 3000
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeAlert() {
      this.$emit('close'); // Emit close event to parent
    }
  }
};
</script>
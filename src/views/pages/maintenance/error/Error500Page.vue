<script setup lang="ts"></script>

<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="errorMedia">
          <img src="@/assets/images/maintenance/Error500.png" alt="404" />
        </div>
        <h1 class="text-h1 mt-2 mb-1">Error Interno del Servidor</h1>
        <p class="text-caption text-lightText">Error del servidor 500. Estamos solucionando el problema. por favor intenta<br />nuevamente en otra ocasión.</p>
        <v-btn variant="flat" color="primary" class="mt-4" to="/dashboard/analytics"> Regresa a Inicio</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.errorMedia {
  > img {
    @media (min-width: 0px) {
      width: 350px;
    }
    @media (min-width: 768px) {
      width: 396px;
    }
  }
}
</style>

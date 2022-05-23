<template>
  <div class="header d-flex justify-content-center py-2">
    <router-link to="/control">
      <p class="px-2 text-white font-weight-bold">Gastos</p>
    </router-link>
    <router-link to="/list">
      <p class="px-2 text-white font-weight-bold">Compras</p>
    </router-link>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  background: rgba(103, 103, 194, 0.76);
}

p:hover {
  color: black !important;
}
</style>

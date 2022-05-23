<template>
  <div class="home">
    <h2 class="pt-4">Escolha sua opção</h2>
    <div class="d-flex justify-content-center mt-4 pt-4">
      <div class="home-card mx-3">
        <b-icon
          icon="currency-dollar"
          variant="success"
          class="mb-3 icon-size"
        ></b-icon>
        <h5>Controle de gastos</h5>
        <router-link to="control">
          <b-button class="mt-3" variant="primary">Acessar</b-button>
        </router-link>
      </div>
      <div class="home-card mx-3">
        <b-icon
          icon="cart-check"
          variant="success"
          class="mb-3 icon-size"
        ></b-icon>
        <h5>Lista de compras</h5>
        <router-link to="list">
          <b-button class="mt-3" variant="primary">Acessar</b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 70%;
  position: absolute;
  top: 0;
  background: white;
}

.home-card {
  width: 300px;
  background: rgba(103, 103, 194, 0.76);
  padding: 1.3em;
  border-radius: 15px;
  color: white;
}

.icon-size {
  height: 80px;
  width: 120px;
}

@media (max-width: 750px) {
  .icon-size {
    height: 60px;
    width: 80px;
  }

  .home-card {
    width: 200px;
    padding: 1em;
    border-radius: 15px;
    color: white;
  }

  h5 {
    font-size: 0.7rem;
  }
}
</style>

<template>
  <div id="app">
    <myHeader />
    <router-view />
  </div>
</template>

<script>
import myHeader from "@/components/MyHeader.vue";

export default {
  components: {
    myHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.control {
  max-width: 45%;
  margin: 0 auto;
}

small {
  color: rgba(128, 128, 128, 0.76);
}

a {
  text-decoration: none !important;
}

#app {
  text-align: center;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  padding: 0 !important;
  margin: 0 !important;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
    <nav class="bottom-nav">
      <RouterLink to="/" class="nav-item" exact>
        <i class="fas fa-list"></i>
        <span>List</span>
      </RouterLink>
      <RouterLink to="/add" class="nav-item">
        <i class="fas fa-plus"></i>
        <span>Add</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #282c34; /* Change to your desired color */
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.nav-item {
  text-align: center;
  color: white; /* Change color as needed */
  text-decoration: none;
}

.nav-item i {
  font-size: 24px; /* Icon size */
}

.nav-item span {
  display: block; /* Ensure the text is below the icon */
  font-size: 12px; /* Text size */
}
</style>

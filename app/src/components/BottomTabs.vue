<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script> 

<template>
  <div class="container">

    <div class="bottom-nav">
      <RouterLink to="/" active-class="active">Home Page</RouterLink>
      <RouterLink to="/available-position" active-class="active">Available Positions</RouterLink>
      <RouterLink to="/salary-range" active-class="active">Salary Range</RouterLink>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; 
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #333;
  padding: 15px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

.bottom-nav a {
  flex: 1;
  text-align: center;
  padding: 15px;
  color: white;
  font-size: 18px;
  text-decoration: none;
}

.bottom-nav a.active {
  background: #007bff;
  color: white;
  border-radius: 5px;
}
</style>
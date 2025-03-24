<template>
  <div class="button-container">
    <button class="nav-button" @click="updateOffset(-5)" :disabled="offset === 0">Last 5</button>
    <button class="nav-button" @click="updateOffset(5)">Next 5</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['offset-updated']);
const offset = ref(0);

const updateOffset = (value) => {
  offset.value = Math.max(0, offset.value + value);
  emit('offset-updated', offset.value);
};
</script>

<style scoped>
.button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-button {
  padding: 10px 20px;
  border: 2px solid #6c9cd2;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #f0f0f0;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'

async function fetchNYCData() {
  const url = 'https://data.cityofnewyork.us/resource/kpav-sd4t.json'

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchNYCData()
})
</script>

<style scoped></style>

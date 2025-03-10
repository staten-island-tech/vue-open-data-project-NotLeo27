<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'

let Salaries = []

async function fetchNYCData() {
  const url = 'https://data.cityofnewyork.us/resource/kpav-sd4t.json'

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)

    data.forEach((object) => {
      let AverageSalary =
        (parseInt(object.salary_range_from) + parseInt(object.salary_range_to)) / 2
      Salaries.push(AverageSalary)
    })
    console.log(Salaries)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchNYCData()
})
</script>

<style scoped></style>

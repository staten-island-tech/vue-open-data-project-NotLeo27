<template>
  <div>
    <PageButtons @offset-updated="fetchNYCData" />
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';
import PageButtons from './PageButtons.vue';

const chartCanvas = ref(null);
const chartInstance = ref(null);
const offset = ref(0);

async function fetchNYCData(newOffset) {
  offset.value = newOffset;
  const url = `https://data.cityofnewyork.us/resource/kpav-sd4t.json?$limit=5&$offset=${offset.value}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    updateChart(transformData(data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function transformData(data) {
  return data.map(item => ({
    label: item.business_title,
    salary: (parseFloat(item.salary_range_from) + parseFloat(item.salary_range_to)) / 2 || 0
  }));
}

function updateChart(data) {
  const labels = data.map(item => item.label);
  const salaries = data.map(item => item.salary);

  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Average Salaries',
        data: salaries,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

onMounted(() => {
  fetchNYCData(0);
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
canvas {
  max-width: 600px;
  max-height: 400px;
}
</style>

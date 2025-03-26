<template>
  <div>
      <canvas ref="pieChartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';

const pieChartCanvas = ref(null);
let chartInstance = null; // Track the chart instance

async function fetchNYCData() {
  const url = 'https://data.cityofnewyork.us/resource/kpav-sd4t.json';

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      const result = [];

      data.forEach((entry) => {
          const agency = entry.agency;
          const number_of_positions = parseInt(entry.number_of_positions);

          let found = false;
          for (let res of result) {
              if (res['Job Agency'] === agency) {
                  res['Positions'] += number_of_positions;
                  found = true;
                  break;
              }
          }

          if (!found) {
              result.push({ 'Job Agency': agency, 'Positions': number_of_positions });
          }
      });

      const labels = result.map((entry) => entry['Job Agency']);
      const dataValues = result.map((entry) => entry['Positions']);

      if (chartInstance) {
          chartInstance.destroy();
      }

      const ctx = pieChartCanvas.value.getContext('2d');
      chartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: labels,
              datasets: [
                  {
                      data: dataValues,
                      backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33F0', '#FFBD33'], // Color palette
                  },
              ],
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: true,
                      position: 'top',
                      labels: {
                          display: false, // Hide individual agency labels from legend
                      },
                  },
                  title: {
                      display: true,
                      text: 'Positions vs. Agency',
                      font: {
                          size: 18, // Make title bigger
                      },
                      padding: {
                          top: 10,
                          bottom: 10,
                      },
                  },
                  tooltip: {
                      callbacks: {
                          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                      },
                  },
              },
          },
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

onMounted(() => fetchNYCData());

onBeforeUnmount(() => {
  if (chartInstance) {
      chartInstance.destroy();
  }
});
</script>

<style scoped>
/* Make canvas larger and center it */
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  width: 500px; /* Increase size */
  height: 500px; /* Increase size */
}
</style>

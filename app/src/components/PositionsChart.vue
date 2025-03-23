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
  
      // Processing data to sum up the positions by agency
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
  
      // If chart already exists, destroy it before creating a new one
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
              position: 'top',
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
  /* You can add some styles to make sure the canvas takes full width/height */
  canvas {
    width: 100%;
    height: 400px;
  }
  </style>
  
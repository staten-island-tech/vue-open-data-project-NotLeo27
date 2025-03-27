<template>
    <div>

    </div>
</template>

<script setup>

async function fetchNYCData(newOffset) {
  offset.value = newOffset;
  const url = `https://data.cityofnewyork.us/resource/kpav-sd4t.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

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

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

</script>

<style scoped>

</style>
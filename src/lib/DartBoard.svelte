<script lang="ts">
  // Physical Radius of a dart board : 457mm
  // Dimensions are in mm
  const targetRadius = 457 / 2;
  const bullsEyeRadius = 20 / 2;
  const bullRadius = 40 / 2;
  const interiorSimpleRadius = 150 / 2;
  const tripleRadius = 170 / 2;
  const exteriorSimpleRadius = 350 / 2;
  const doubleRadius = 400 / 2;

  function onBullsEyeClick() {
    console.log('bulls eye click')
  }
</script>

<svg viewBox="{-targetRadius} {-targetRadius} {targetRadius * 2} {targetRadius * 2}">
  <circle r="{targetRadius}"></circle>

  <circle r="{bullsEyeRadius}" fill="red" on:click={onBullsEyeClick}></circle>
</svg>

<style>
</style>

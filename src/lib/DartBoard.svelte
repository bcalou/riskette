<script lang="ts">
  // Physical Radius of a dart board : 457mm
  // Dimensions are in mm
  // All radiuses are the outer bounds
  // from https://www.dimensions.com/element/dartboard
  const targetRadius = 451 / 2;
  const doubleRingRadius = 170;
  const outerSimpleRadius = doubleRingRadius - 8;
  const trebleRingRadius = 107;
  const innerSimpleRadius = trebleRingRadius - 8;
  const bullRadius = 32 / 2;
  const bullsEyeRadius = 12.7 / 2;

  const ringsColors = ["red", "green"];
  const simpleColors = ["black", "white"];
  const bullColor = ringsColors[1];
  const bullsEyeColor = ringsColors[0];
  const dividerColor = "black";

  // Numbers clockwise from 20
  const sections = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  // Helpers
  const nbSections = sections.length;
  const sectionArcRad = (Math.PI * 2) / nbSections;
  const firstSectionArcOffsetRad = -(Math.PI * 2) - sectionArcRad / 2;

  function onBullsEyeClick() {
    console.log("bulls eye click");
  }
</script>

<svg
  viewBox="{-targetRadius} {-targetRadius} {targetRadius * 2} {targetRadius *
    2}"
>
  <!-- Target border -->
  <path
    d="
    M -{targetRadius}, 0
    a {targetRadius},{targetRadius} 0 1,1 {targetRadius * 2},0
    a {targetRadius},{targetRadius} 0 1,1 -{targetRadius * 2},0
    z
    M -{doubleRingRadius}, 0
    a {doubleRingRadius},{doubleRingRadius} 0 1,0 {doubleRingRadius * 2},0
    a {doubleRingRadius},{doubleRingRadius} 0 1,0 -{doubleRingRadius * 2},0
    Z
    "
  />

  {#each sections as sectionValue, sectionIndex}
    <!-- Compute colors -->
    {@const doubleTrebleColor = ringsColors[sectionIndex % 2]}
    {@const simpleColor = simpleColors[sectionIndex % 2]}

    <!-- Compute positions -->
    {@const leftBorderAxisX = Math.cos(
      sectionIndex * sectionArcRad - firstSectionArcOffsetRad
    )}
    {@const leftBorderAxisY = Math.sin(
      sectionIndex * sectionArcRad - firstSectionArcOffsetRad
    )}
    {@const rightBorderAxisX = Math.cos(
      (sectionIndex + 1) * sectionArcRad - firstSectionArcOffsetRad
    )}
    {@const rightBorderAxisY = Math.sin(
      (sectionIndex + 1) * sectionArcRad - firstSectionArcOffsetRad
    )}

    <!-- Treble ring area -->
    <path
      d="
        M {leftBorderAxisX * doubleRingRadius},{leftBorderAxisY * doubleRingRadius}
        A {doubleRingRadius},{doubleRingRadius} 0 0,1 {rightBorderAxisX *
        doubleRingRadius},{rightBorderAxisY * doubleRingRadius}
        L {rightBorderAxisX * outerSimpleRadius},{rightBorderAxisY *
        outerSimpleRadius}
        A {outerSimpleRadius},{outerSimpleRadius} 0 0,0 {leftBorderAxisX *
        outerSimpleRadius},{leftBorderAxisY * outerSimpleRadius}
        L {leftBorderAxisX * doubleRingRadius},{leftBorderAxisY * doubleRingRadius}
        Z
        "
      stroke={dividerColor}
      fill={doubleTrebleColor}
    />

    <!-- Outer simple area -->
    <path
      d="
        M {leftBorderAxisX * outerSimpleRadius},{leftBorderAxisY *
        outerSimpleRadius}
        A {outerSimpleRadius},{outerSimpleRadius} 0 0,1 {rightBorderAxisX *
        outerSimpleRadius},{rightBorderAxisY * outerSimpleRadius}
        L {rightBorderAxisX * trebleRingRadius},{rightBorderAxisY * trebleRingRadius}
        A {trebleRingRadius},{trebleRingRadius} 0 0,0 {leftBorderAxisX *
        trebleRingRadius},{leftBorderAxisY * trebleRingRadius}
        L {leftBorderAxisX * outerSimpleRadius},{leftBorderAxisY *
        outerSimpleRadius}
        Z
        "
      stroke={dividerColor}
      fill={simpleColor}
    />

    <!-- Double ring area -->
    <path
      d="
        M {leftBorderAxisX * trebleRingRadius},{leftBorderAxisY * trebleRingRadius}
        A {trebleRingRadius},{trebleRingRadius} 0 0,1 {rightBorderAxisX *
        trebleRingRadius},{rightBorderAxisY * trebleRingRadius}
        L {rightBorderAxisX * innerSimpleRadius},{rightBorderAxisY *
        innerSimpleRadius}
        A {innerSimpleRadius},{innerSimpleRadius} 0 0,0 {leftBorderAxisX *
        innerSimpleRadius},{leftBorderAxisY * innerSimpleRadius}
        L {leftBorderAxisX * trebleRingRadius},{leftBorderAxisY * trebleRingRadius}
        Z
        "
      stroke={dividerColor}
      fill={doubleTrebleColor}
    />

    <!-- Inner simple area -->
    <path
      d="
        M {leftBorderAxisX * innerSimpleRadius},{leftBorderAxisY *
        innerSimpleRadius}
        A {innerSimpleRadius},{innerSimpleRadius} 0 0,1 {rightBorderAxisX *
        innerSimpleRadius},{rightBorderAxisY * innerSimpleRadius}
        L {rightBorderAxisX * bullRadius},{rightBorderAxisY * bullRadius}
        A {bullRadius},{bullRadius} 0 0,0 {leftBorderAxisX *
        bullRadius},{leftBorderAxisY * bullRadius}
        L {leftBorderAxisX * innerSimpleRadius},{leftBorderAxisY *
        innerSimpleRadius}
        Z
        "
      stroke={dividerColor}
      fill={simpleColor}
    />
  {/each}

  <!-- Bull -->
  <path
    d="
      M -{bullRadius}, 0
      a {bullRadius},{bullRadius} 0 1,1 {bullRadius * 2},0
      a {bullRadius},{bullRadius} 0 1,1 -{bullRadius * 2},0
      z
      M -{bullsEyeRadius}, 0
      a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 {bullsEyeRadius * 2},0
      a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 -{bullsEyeRadius * 2},0
      Z
      "
      fill={bullColor}
  />

  <!-- Bull's eye -->
  <circle r={bullsEyeRadius} fill={bullsEyeColor} on:click={onBullsEyeClick} />
</svg>

<style>
</style>

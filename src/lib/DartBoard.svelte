<script lang="ts">
  // Physical Radius of a dart board : 457mm
  // Dimensions are in mm
  // from https://www.dimensions.com/element/dartboard
  const targetRadius = 451 / 2;
  const doubleRadius = 170;
  const exteriorSimpleRadius = doubleRadius - 8;
  const trebleRadius = 107;
  const interiorSimpleRadius = trebleRadius - 8;
  const bullRadius = 32 / 2;
  const bullsEyeRadius = 12.7 / 2;

  const doubleTrebleColors = ["red", "green"];
  const simpleColors = ["black", "white"];

  //numbers clockwise from 20
  const segments = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  //helpers
  const nbSegments = segments.length;
  const segmentArcRad = (Math.PI * 2) / nbSegments;
  const segmentArcOffsetRad = -(Math.PI * 2) - segmentArcRad / 2;

  function onBullsEyeClick() {
    console.log("bulls eye click");
  }
</script>

<svg
  viewBox="{-targetRadius} {-targetRadius} {targetRadius * 2} {targetRadius *
    2}"
>
  <path
    d="
    m -{targetRadius}, 0
    a {targetRadius},{targetRadius} 0 1,1 {targetRadius * 2},0
    a {targetRadius},{targetRadius} 0 1,1 -{targetRadius * 2},0
    z
    M -{doubleRadius}, 0
    a {doubleRadius},{doubleRadius} 0 1,0 {doubleRadius * 2},0
    a {doubleRadius},{doubleRadius} 0 1,0 -{doubleRadius * 2},0
    Z
    "
  />
  <path
    d="
    m -{bullRadius}, 0
    a {bullRadius},{bullRadius} 0 1,1 {bullRadius * 2},0
    a {bullRadius},{bullRadius} 0 1,1 -{bullRadius * 2},0
    z
    M -{bullsEyeRadius}, 0
    a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 {bullsEyeRadius * 2},0
    a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 -{bullsEyeRadius * 2},0
    Z
    "
  />

  {#each segments as segmentNumber, segmentPosition}
    <!-- compute colors -->
    {@const doubleTrebleColor = doubleTrebleColors[segmentPosition % 2]}
    {@const simpleColor = simpleColors[segmentPosition % 2]}
    <!-- compute positions -->
    {@const leftBorderAxisX = Math.cos(
      segmentPosition * segmentArcRad - segmentArcOffsetRad
    )}
    {@const leftBorderAxisY = Math.sin(
      segmentPosition * segmentArcRad - segmentArcOffsetRad
    )}
    {@const rightBorderAxisX = Math.cos(
      (segmentPosition + 1) * segmentArcRad - segmentArcOffsetRad
    )}
    {@const rightBorderAxisY = Math.sin(
      (segmentPosition + 1) * segmentArcRad - segmentArcOffsetRad
    )}
    <!-- treble -->
    <path
      d="
        M {leftBorderAxisX * doubleRadius},{leftBorderAxisY * doubleRadius}
        A {doubleRadius},{doubleRadius} 0 0,1 {rightBorderAxisX *
        doubleRadius},{rightBorderAxisY * doubleRadius}
        L {rightBorderAxisX * exteriorSimpleRadius},{rightBorderAxisY *
        exteriorSimpleRadius}
        A {exteriorSimpleRadius},{exteriorSimpleRadius} 0 0,0 {leftBorderAxisX *
        exteriorSimpleRadius},{leftBorderAxisY * exteriorSimpleRadius}
        L {leftBorderAxisX * doubleRadius},{leftBorderAxisY * doubleRadius}
        Z
        "
      stroke="black"
      fill={doubleTrebleColor}
    />
    <!-- exterior simple -->
    <path
      d="
        M {leftBorderAxisX * exteriorSimpleRadius},{leftBorderAxisY *
        exteriorSimpleRadius}
        A {exteriorSimpleRadius},{exteriorSimpleRadius} 0 0,1 {rightBorderAxisX *
        exteriorSimpleRadius},{rightBorderAxisY * exteriorSimpleRadius}
        L {rightBorderAxisX * trebleRadius},{rightBorderAxisY * trebleRadius}
        A {trebleRadius},{trebleRadius} 0 0,0 {leftBorderAxisX *
        trebleRadius},{leftBorderAxisY * trebleRadius}
        L {leftBorderAxisX * exteriorSimpleRadius},{leftBorderAxisY *
        exteriorSimpleRadius}
        Z
        "
      stroke="black"
      fill={simpleColor}
    />
    <!-- interior simple -->
    <path
      d="
        M {leftBorderAxisX * trebleRadius},{leftBorderAxisY * trebleRadius}
        A {trebleRadius},{trebleRadius} 0 0,1 {rightBorderAxisX *
        trebleRadius},{rightBorderAxisY * trebleRadius}
        L {rightBorderAxisX * interiorSimpleRadius},{rightBorderAxisY *
        interiorSimpleRadius}
        A {interiorSimpleRadius},{interiorSimpleRadius} 0 0,0 {leftBorderAxisX *
        interiorSimpleRadius},{leftBorderAxisY * interiorSimpleRadius}
        L {leftBorderAxisX * trebleRadius},{leftBorderAxisY * trebleRadius}
        Z
        "
      stroke="black"
      fill={doubleTrebleColor}
    />
    <!-- interior simple -->
    <path
      d="
        M {leftBorderAxisX * interiorSimpleRadius},{leftBorderAxisY *
        interiorSimpleRadius}
        A {interiorSimpleRadius},{interiorSimpleRadius} 0 0,1 {rightBorderAxisX *
        interiorSimpleRadius},{rightBorderAxisY * interiorSimpleRadius}
        L {rightBorderAxisX * bullRadius},{rightBorderAxisY * bullRadius}
        A {bullRadius},{bullRadius} 0 0,0 {leftBorderAxisX *
        bullRadius},{leftBorderAxisY * bullRadius}
        L {leftBorderAxisX * interiorSimpleRadius},{leftBorderAxisY *
        interiorSimpleRadius}
        Z
        "
      stroke="black"
      fill={simpleColor}
    />
  {/each}

  <path
    d="
      m -{bullRadius}, 0
      a {bullRadius},{bullRadius} 0 1,1 {bullRadius * 2},0
      a {bullRadius},{bullRadius} 0 1,1 -{bullRadius * 2},0
      z
      M -{bullsEyeRadius}, 0
      a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 {bullsEyeRadius * 2},0
      a {bullsEyeRadius},{bullsEyeRadius} 0 1,0 -{bullsEyeRadius * 2},0
      Z
      "
    fill="green"
  />
  <circle r={bullsEyeRadius} fill="red" on:click={onBullsEyeClick} />
</svg>

<style>
</style>

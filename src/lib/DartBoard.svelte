<script lang="ts">
  import { Area } from "./area";
  import type { Hit } from "./hit";

  export let sections;

  // Physical Radius of a dart board : 457mm
  // Dimensions are in mm
<<<<<<< HEAD
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

  // Helpers
  const nbSections = sections.length;
  const sectionArcRad = (Math.PI * 2) / nbSections;
  const firstSectionArcOffsetRad = -(Math.PI * 2) - sectionArcRad / 2;

  function onAreaHit(hit: Hit) {
    console.log(hit);
=======
  const targetRadius = 457 / 2;
  const doubleRadius = 400 / 2;
  const exteriorSimpleRadius = 350 / 2;
  const tripleRadius = 170 / 2;
  const interiorSimpleRadius = 150 / 2;
  const bullRadius = 40 / 2;
  const bullsEyeRadius = 20 / 2;

  const doubleTripleColors = ["red", "green"];
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
>>>>>>> 4022529... target drawn, wrong dimensions tho
  }
</script>

<svg
  viewBox="{-targetRadius} {-targetRadius} {targetRadius * 2} {targetRadius *
    2}"
>
<<<<<<< HEAD
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
=======
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
>>>>>>> 4022529... target drawn, wrong dimensions tho
    Z
    "
  />

<<<<<<< HEAD
  {#each sections as section, sectionIndex}
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
        M {leftBorderAxisX * doubleRingRadius},{leftBorderAxisY *
        doubleRingRadius}
        A {doubleRingRadius},{doubleRingRadius} 0 0,1 {rightBorderAxisX *
        doubleRingRadius},{rightBorderAxisY * doubleRingRadius}
        L {rightBorderAxisX * outerSimpleRadius},{rightBorderAxisY *
        outerSimpleRadius}
        A {outerSimpleRadius},{outerSimpleRadius} 0 0,0 {leftBorderAxisX *
        outerSimpleRadius},{leftBorderAxisY * outerSimpleRadius}
        L {leftBorderAxisX * doubleRingRadius},{leftBorderAxisY *
        doubleRingRadius}
        Z
        "
      stroke={dividerColor}
      fill={doubleTrebleColor}
      on:click={() => onAreaHit({ area: Area.TrebleRing, section })}
    />

    <!-- Outer simple area -->
    <path
      d="
        M {leftBorderAxisX * outerSimpleRadius},{leftBorderAxisY *
        outerSimpleRadius}
        A {outerSimpleRadius},{outerSimpleRadius} 0 0,1 {rightBorderAxisX *
        outerSimpleRadius},{rightBorderAxisY * outerSimpleRadius}
        L {rightBorderAxisX * trebleRingRadius},{rightBorderAxisY *
        trebleRingRadius}
        A {trebleRingRadius},{trebleRingRadius} 0 0,0 {leftBorderAxisX *
        trebleRingRadius},{leftBorderAxisY * trebleRingRadius}
        L {leftBorderAxisX * outerSimpleRadius},{leftBorderAxisY *
        outerSimpleRadius}
        Z
        "
      stroke={dividerColor}
      fill={simpleColor}
      on:click={() => onAreaHit({ area: Area.OuterSimple, section })}
    />

    <!-- Double ring area -->
    <path
      d="
        M {leftBorderAxisX * trebleRingRadius},{leftBorderAxisY *
        trebleRingRadius}
        A {trebleRingRadius},{trebleRingRadius} 0 0,1 {rightBorderAxisX *
        trebleRingRadius},{rightBorderAxisY * trebleRingRadius}
        L {rightBorderAxisX * innerSimpleRadius},{rightBorderAxisY *
        innerSimpleRadius}
        A {innerSimpleRadius},{innerSimpleRadius} 0 0,0 {leftBorderAxisX *
        innerSimpleRadius},{leftBorderAxisY * innerSimpleRadius}
        L {leftBorderAxisX * trebleRingRadius},{leftBorderAxisY *
        trebleRingRadius}
        Z
        "
      stroke={dividerColor}
      fill={doubleTrebleColor}
      on:click={() => onAreaHit({ area: Area.DoubleRing, section })}
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
      on:click={() => onAreaHit({ area: Area.InnerSimple, section })}
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
    on:click={() => onAreaHit({ area: Area.Bull })}
  />

  <!-- Bull's eye -->
  <circle
    r={bullsEyeRadius}
    fill={bullsEyeColor}
    on:click={() => onAreaHit({ area: Area.BullsEye })}
  />
=======
  {#each segments as segmentNumber, segmentPosition}
    <!-- compute colors -->
    {@const doubleTripleColor = doubleTripleColors[segmentPosition % 2]}
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
    <!-- triple -->
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
      fill={doubleTripleColor}
    />
    <!-- exterior simple -->
    <path
      d="
        M {leftBorderAxisX * exteriorSimpleRadius},{leftBorderAxisY *
        exteriorSimpleRadius}
        A {exteriorSimpleRadius},{exteriorSimpleRadius} 0 0,1 {rightBorderAxisX *
        exteriorSimpleRadius},{rightBorderAxisY * exteriorSimpleRadius}
        L {rightBorderAxisX * tripleRadius},{rightBorderAxisY * tripleRadius}
        A {tripleRadius},{tripleRadius} 0 0,0 {leftBorderAxisX *
        tripleRadius},{leftBorderAxisY * tripleRadius}
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
        M {leftBorderAxisX * tripleRadius},{leftBorderAxisY * tripleRadius}
        A {tripleRadius},{tripleRadius} 0 0,1 {rightBorderAxisX *
        tripleRadius},{rightBorderAxisY * tripleRadius}
        L {rightBorderAxisX * interiorSimpleRadius},{rightBorderAxisY *
        interiorSimpleRadius}
        A {interiorSimpleRadius},{interiorSimpleRadius} 0 0,0 {leftBorderAxisX *
        interiorSimpleRadius},{leftBorderAxisY * interiorSimpleRadius}
        L {leftBorderAxisX * tripleRadius},{leftBorderAxisY * tripleRadius}
        Z
        "
      stroke="black"
      fill={doubleTripleColor}
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
>>>>>>> 4022529... target drawn, wrong dimensions tho
</svg>

<style>
</style>

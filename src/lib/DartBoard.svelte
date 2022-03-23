<script lang="ts">
  import DartBoardArea from "./DartBoardArea.svelte";
  import { Area } from "./area";
  import type { Hit } from "./hit";
  import type { Riskette } from "./riskette";

  export let game: Riskette;
  const sections = game.getSections();

  // Parameters
  export let displayNumbers = false;
  export let displayCalibration = false;

  // Physical Radius of a dart board : 457mm
  // Dimensions are in mm
  // All radiuses are the outer bounds
  // from https://www.dimensions.com/element/dartboard
  const targetRadius = 451 / 2;
  const numberDistanceFromCenter = 198;
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
  const firstNumberOffsetRad = Math.PI / 2;
  const firstSectionArcOffsetRad = Math.PI / 2 + sectionArcRad / 2;

  function onAreaHit(hit: Hit) {
    game.hit(hit);
    game = game;
  }
</script>
<p style="background-color: {game.getCurrentPlayer().color};font-size:3em;text-align:center;">{game.getCurrentPlayer().name}
  {#each Array(game.getCurrentTurnRemainingDarts()) as _, i}
    <span>➶</span>
  {/each}
</p>

<svg
  viewBox="{-targetRadius} {-targetRadius} {targetRadius * 2} {targetRadius *
    2}"
>
  <!-- from https://codepen.io/mathiesjanssen/pen/QgLzmM?editors=1100 -->
  <filter id="highlight-glow" x="-50%" y="-50%" width="200%" height="200%">
    <feComponentTransfer in=SourceAlpha>
      <feFuncA type="table" tableValues="1 0" />
    </feComponentTransfer>
    <feGaussianBlur stdDeviation="4"/>
    <feOffset dx="0" dy="0" result="offsetblur"/>
    <feFlood flood-color="rgb(255, 255, 255)" result="color"/>
    <feComposite in2="offsetblur" operator="in"/>
    <feComposite in2="SourceAlpha" operator="in" />
    <feMerge>
      <feMergeNode in="SourceGraphic" />
      <feMergeNode />
    </feMerge>
  </filter>
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

  {#each sections as section, sectionIndex}
    <!-- Compute colors -->
    {@const doubleTrebleColor = ringsColors[sectionIndex % 2]}
    {@const simpleColor = simpleColors[sectionIndex % 2]}

    <!-- Compute positions -->
    {@const centerAxisX = Math.cos(
      sectionIndex * sectionArcRad - firstNumberOffsetRad
    )}
    {@const centerAxisY = Math.sin(
      sectionIndex * sectionArcRad - firstNumberOffsetRad
    )}
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

    <!-- Numbers -->
    {#if displayNumbers}
      <text
        x="{centerAxisX * numberDistanceFromCenter}"
        y="{centerAxisY * numberDistanceFromCenter}"
        style="text-align: center;"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        >
        {section}
      </text>
    {/if}

    <!-- Player ring area -->
    <DartBoardArea
      outerRadius={targetRadius}
      innerRadius={doubleRingRadius}
      {leftBorderAxisX}
      {leftBorderAxisY}
      {rightBorderAxisX}
      {rightBorderAxisY}
      fill={game.getSectionOwner(section)?.color}
    />

    <!-- Double ring area -->
    <DartBoardArea
      outerRadius={doubleRingRadius}
      innerRadius={outerSimpleRadius}
      {leftBorderAxisX}
      {leftBorderAxisY}
      {rightBorderAxisX}
      {rightBorderAxisY}
      highlight={game.canCurrentPlayerCaptureSection(section)}
      stroke={dividerColor}
      onClick={() => onAreaHit({ area: Area.TrebleRing, section })}
    />

    <!-- Outer simple area -->
    <DartBoardArea
      outerRadius={outerSimpleRadius}
      innerRadius={trebleRingRadius}
      {leftBorderAxisX}
      {leftBorderAxisY}
      {rightBorderAxisX}
      {rightBorderAxisY}
      highlight={game.canCurrentPlayerCaptureSection(section)}
      stroke={dividerColor}
      onClick={() => onAreaHit({ area: Area.TrebleRing, section })}
    />

    <!-- Treble ring area -->
    <DartBoardArea
      outerRadius={trebleRingRadius}
      innerRadius={innerSimpleRadius}
      {leftBorderAxisX}
      {leftBorderAxisY}
      {rightBorderAxisX}
      {rightBorderAxisY}
      highlight={game.canCurrentPlayerCaptureSection(section)}
      stroke={dividerColor}
      on:click={() => onAreaHit({ area: Area.DoubleRing, section })}
    />

    <!-- Inner simple area -->
    <DartBoardArea
      outerRadius={innerSimpleRadius}
      innerRadius={bullRadius}
      {leftBorderAxisX}
      {leftBorderAxisY}
      {rightBorderAxisX}
      {rightBorderAxisY}
      stroke={dividerColor}
      highlight={game.canCurrentPlayerCaptureSection(section)}
      onClick={() => onAreaHit({ area: Area.InnerSimple, section })}
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
    stroke={dividerColor}
    on:click={() => onAreaHit({ area: Area.Bull })}
  />

  <!-- Bull's eye -->
  <circle
    r={bullsEyeRadius}
    stroke={dividerColor}
    on:click={() => onAreaHit({ area: Area.BullsEye })}
  />
  <!-- Calibration marks -->
  <rect
      x="{-targetRadius}"
      y="{-targetRadius}"
      width="5"
      height="5"
      fill="white"
      stroke="none"
      on:click={() => {displayCalibration = !displayCalibration}}
    />
  {#if displayCalibration}
    <rect
      x="{-doubleRingRadius}"
      y="{-doubleRingRadius}"
      width="{doubleRingRadius*2}"
      height="{doubleRingRadius*2}"
      fill="white"
      stroke="none"
    />
    <circle
      r={doubleRingRadius}
      fill="black"
      stroke="white"
    />
    <rect
      x="{-bullRadius}"
      y="{-bullRadius}"
      width="{bullRadius*2}"
      height="{bullRadius*2}"
      fill="black"
      stroke="white"
    />
    <circle
      r={bullRadius}
      fill="white"
      stroke="none"
    />
    <line x1="{-doubleRingRadius}" y1="0" x2="{doubleRingRadius}" y2="0" stroke="white" />
    <line x1="0" y1="{-doubleRingRadius}" x2="0" y2="{doubleRingRadius}" stroke="white" />
  {/if}
</svg>

<style>
</style>

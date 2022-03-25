<script lang="ts">
  export let outerRadius: number;
  export let innerRadius: number;
  export let leftBorderAxisY: number;
  export let rightBorderAxisY: number;
  export let leftBorderAxisX: number;
  export let rightBorderAxisX: number;
  export let fill: string = undefined;
  export let stroke: string = undefined;
  export let onClick: svelte.JSX.MouseEventHandler<SVGPathElement> = undefined;
  export let highlight: boolean = false;
  export let flag: string = undefined;

  const centerX = (leftBorderAxisX + rightBorderAxisX) / 2;
  const centerY = (leftBorderAxisY + rightBorderAxisY) / 2;
  const centerDistance = (innerRadius + outerRadius) / 2
</script>

<path
  d="M {leftBorderAxisX * outerRadius},{leftBorderAxisY * outerRadius}
    A {outerRadius},{outerRadius} 0 0,1 {rightBorderAxisX * outerRadius},
    {rightBorderAxisY * outerRadius}
    L {rightBorderAxisX * innerRadius},{rightBorderAxisY * innerRadius}
    A {innerRadius},{innerRadius} 0 0,0 {leftBorderAxisX * innerRadius},
    {leftBorderAxisY * innerRadius}
    L {leftBorderAxisX * outerRadius},{leftBorderAxisY * outerRadius}
    Z"
  {fill}
  {stroke}
  on:click={onClick}
  class="{highlight ? "highlight":""}"
  filter="{highlight ? "url(#highlight-glow)":""}"
/>
{#if flag !== undefined}
  <image xlink:href="flags/{flag}.svg" x="{centerX * centerDistance - 5}" y="{centerY * centerDistance - 5}" height="10" width="10" />
{/if}
<style>
  .highlight {
    /* animation: fillColor 1.5s linear infinite; */
  }

  @keyframes fillColor {
    0% {fill: #000}
    50% {fill:#555}
    100% {fill: #000}
  }
</style>

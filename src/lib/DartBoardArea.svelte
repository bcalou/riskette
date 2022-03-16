<script lang="ts">
  export let outerRadius: number;
  export let innerRadius: number;
  export let leftBorderAxisY: number;
  export let rightBorderAxisY: number;
  export let leftBorderAxisX: number;
  export let rightBorderAxisX: number;
  export let fill: string;
  export let stroke: string = undefined;
  export let onClick: svelte.JSX.MouseEventHandler<SVGPathElement> = undefined;
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
/>

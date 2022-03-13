<script lang="ts">
  import DartBoard from "./lib/DartBoard.svelte";
  import { Riskette } from "./lib/riskette";

  // Numbers clockwise from 20
  const sections = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  const game = new Riskette(sections, [
    { name: "Saumon", color: "#FFFF00" },
    { name: "bcalou", color: "#FF00FF" },
  ]);
</script>

<h1>Riskette</h1>
<DartBoard {game} />

<style>
</style>

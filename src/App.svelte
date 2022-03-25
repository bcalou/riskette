<script lang="ts">
  import DartBoard from "./lib/DartBoard.svelte";
  import { Riskette } from "./lib/riskette";

  // Numbers clockwise from 20
  const sections = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  const game = new Riskette(sections, [
    { name: "Saumon", color: "yellow", team: "fr" },
    { name: "Simon", color: "blue", team: "gb" },
    { name: "Guitou", color: "red", team: "fr" },
    { name: "Pierre", color: "purple", team: "gb" },
  ]);
</script>
<DartBoard {game} />
<style>
</style>

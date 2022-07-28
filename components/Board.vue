<template>
  <div class="board">
    <board-intersections :state="state.cells" :traps="state.traps" :active="state.turn" :callback="self" />
    <board-edges :state="state.edges" :callback="self" ref="edges" />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  computed: {
    self () {
      return this
    },
  },
  mounted () {
    this.$watch(() => this.state.turn, () => this.$refs.edges.$forceUpdate())
  },
}
</script>

<style scoped>
.board {
  width: 256px;
  height: 256px;
  position: relative;
}
</style>

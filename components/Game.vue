<template>
  <div>
    <Board :state="state" @cell="state.cellClick" @edge="state.edgeClick" />
  </div>
</template>

<script>
import { Game } from '~/engine/game'

export default {
  data: () => ({
    state: new Game(),
  }),
  mounted () {
    this.$watch(() => this.state.result, () => {
      if (this.state.result !== null) this.state = new Game()
    })
  },
}
</script>

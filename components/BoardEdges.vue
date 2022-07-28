<template>
  <div>
    <div
      v-for="[ x, y ], i in offsetsH"
      :key="i + 'h'"
      class="edge horizontal"
      :class="{ blocked: stateH(i) }"
      :style="`left: ${x}px; top: ${y}px;`"
      @click="callback.$emit('edge', 'horizontal', xyFromIxH(i))"
    />
    <div
      v-for="[ x, y ], i in offsetsV"
      :key="i + 'v'"
      class="edge vertical"
      :class="{ blocked: stateV(i) }"
      :style="`left: ${x}px; top: ${y}px;`"
      @click="callback.$emit('edge', 'vertical', xyFromIxV(i))"
    />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
    callback: {
      type: Object,
      required: true,
    },
  },
  methods: {
    xyFromIxH (ix) {
      return [ ix % 3, Math.floor(ix / 3) ]
    },
    xyFromIxV (ix) {
      return [ ix % 4, Math.floor(ix / 4) ]
    },
    stateH (ix) {
      const [ x, y ] = this.xyFromIxH(ix)
      return this.state.horizontal[y][x]
    },
    stateV (ix) {
      const [ x, y ] = this.xyFromIxV(ix)
      return this.state.vertical[y][x]
    }
  },
  computed: {
    offsetsH () {
      const offsetX = Array.from(Array(3).keys()).map(x => 48 + x * 64)
      const offsetY = Array.from(Array(4).keys()).map(x => 16 + x * 64)
      return Array.from(offsetY.values()).flatMap(y => offsetX.map(x => [ x, y ]))
    },
    offsetsV () {
      const offsetX = Array.from(Array(4).keys()).map(x => 16 + x * 64)
      const offsetY = Array.from(Array(3).keys()).map(x => 48 + x * 64)
      return Array.from(offsetY.values()).flatMap(y => offsetX.map(x => [ x, y ]))
    },
    state_ () {
      return Object.fromEntries(Object.entries(this.state).map(([ k, v ]) => [ k, v.flat() ]))
    },
  },
}
</script>

<style scoped>
.edge {
  position: absolute;
  width: 32px;
  height: 32px;
}
.edge.horizontal::before {
  position: absolute;
  content: ' ';
  width: 32px;
  top: 15.25px;
  border-top: 1.5px solid #89a;
}
.edge.vertical::before {
  position: absolute;
  content: ' ';
  height: 32px;
  left: 15.25px;
  border-left: 1.5px solid #89a;
}
.edge.blocked {
  opacity: .1;
}
</style>

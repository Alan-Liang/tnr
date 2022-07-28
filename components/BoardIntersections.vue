<template>
  <div>
    <div
      v-for="[ x, y ], i in cells"
      :key="i"
      class="cell"
      :class="{ [state_(i)]: true, [active + '-active']: true, [traps_(i) + '-trapped']: true }"
      :style="`left: ${x}px; top: ${y}px;`"
      @click="callback.$emit('cell', xyFromIx(i))"
    />
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Array,
      required: true,
    },
    traps: {
      type: Array,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    callback: {
      type: Object,
      required: true,
    },
  },
  methods: {
    xyFromIx (ix) {
      return [ ix % 4, Math.floor(ix / 4) ]
    },
    state_ (i) {
      const [ x, y ] = this.xyFromIx(i)
      return this.state[y][x]
    },
    traps_ (i) {
      const [ x, y ] = this.xyFromIx(i)
      return this.traps[y][x]
    },
  },
  computed: {
    cells () {
      const offsets = Array.from(Array(4).keys()).map(x => 16 + x * 64)
      return Array.from(offsets.values()).flatMap(y => offsets.map(x => [ x, y ]))
    },
  },
}
</script>

<style scoped>
.cell {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1.5px solid #89a;
  border-radius: 50%;
  overflow: hidden;
}
.cell.a-trapped::before, .cell.b-trapped::after, .cell.both-trapped::before, .cell.both-trapped::after {
  content: ' ';
  position: absolute;
  top: -1.5px;
  left: -1.5px;
  width: 32px;
  height: 32px;
}
.cell.a-trapped::before, .cell.both-trapped::before {
  background-image: linear-gradient(45deg, transparent 45%, #f88 46%, #f88 54%, transparent 55%);
}
.cell.b-trapped::after, .cell.both-trapped::after {
  background-image: linear-gradient(-45deg, transparent 45%, #0f0 46%, #0f0 54%, transparent 55%);
}
@keyframes a-active {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: #f67;
  }
  100% {
    background-color: transparent;
  }
}
@keyframes b-active {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: #3d4;
  }
  100% {
    background-color: transparent;
  }
}
.cell.a {
  background-color: #f67;
}
.cell.a.a-active {
  animation: a-active linear 0.5s infinite;
}
.cell.b {
  background-color: #3d4;
}
.cell.b.b-active {
  animation: b-active linear 0.5s infinite;
}
.cell.both {
  background-image: linear-gradient(-45deg, #f67 49%, #3d4 50%);
  background-size: 64px 64px;
  background-position: center;
}
@keyframes both-a-active {
  0% {
    background-image: linear-gradient(-45deg, #f67 49%, #3d4 50%);
  }
  50% {
    background-image: linear-gradient(-45deg, transparent 49%, #3d4 50%);
  }
  100% {
    background-image: linear-gradient(-45deg, #f67 49%, #3d4 50%);
  }
}
@keyframes both-b-active {
  0% {
    background-image: linear-gradient(-45deg, #f67 49%, #3d4 50%);
  }
  50% {
    background-image: linear-gradient(-45deg, #f67 49%, transparent 50%);
  }
  100% {
    background-image: linear-gradient(-45deg, #f67 49%, #3d4 50%);
  }
}
.cell.both.a-active {
  animation: both-a-active linear 0.5s infinite;
}
.cell.both.b-active {
  animation: both-b-active linear 0.5s infinite;
}
</style>

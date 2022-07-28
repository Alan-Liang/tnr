const flip = who => who === 'a' ? 'b' : 'a'
const add = (state, who) => {
  switch (state) {
    case who:
    case 'both':
      throw 1
    case 'none':
      return who
    default:
      return 'both'
  }
}
const remove = (state, who) => {
  switch (state) {
    case who:
    case 'none':
      return 'none'
    case 'both':
      return flip(who)
    default:
      throw 1
  }
}
const contains = (state, who) => state === who || state === 'both'

export class Game {
  result = null
  posa = null
  posb = null
  turn = 'a'
  cells = Array(4).fill(0).map(() => Array(4).fill('none'))
  traps = Array(4).fill(0).map(() => Array(4).fill('none'))
  edges = {
    horizontal: Array(4).fill(0).map(() => Array(3).fill(false)),
    vertical: Array(3).fill(0).map(() => Array(4).fill(false)),
  }
  constructor () {
    this.cellClick = this.cellClick.bind(this)
    this.edgeClick = this.edgeClick.bind(this)
  }
  cellClick ([ x, y ]) {
    if (!this.posa) {
      this.move('a', x, y)
      return
    }
    if (!this.posb && this.turn === 'b') {
      this.move('b', x, y)
      return
    }
    if (this.turn.endsWith('edge')) {
      const who = this.turn[0]
      const now = this.traps[y][x]
      if (contains(now, who)) return
      this.traps[y][x] = add(now, who)
      this.turn = flip(who)
      this.check()
      return
    }
    const [ x0, y0 ] = this['pos' + this.turn]
    const isH = y0 === y && Math.abs(x0 - x) === 1
    const isV = x0 === x && Math.abs(y0 - y) === 1
    if (!isH && !isV) return
    if (isH) {
      const pathX = Math.min(x, x0)
      const blocked = this.edges.horizontal[y][pathX]
      if (blocked) return
      this.move(this.turn, x, y)
    } else {
      const pathY = Math.min(y, y0)
      const blocked = this.edges.vertical[pathY][x]
      if (blocked) return
      this.move(this.turn, x, y)
    }
  }
  edgeClick (type, [ x, y ]) {
    if (this.turn === 'a' || this.turn === 'b') return
    const who = this.turn[0]
    const now = this.edges[type][y][x]
    this.edges[type][y][x] = !now
    this.turn = flip(who)
    this.check()
  }
  move (who, x, y) {
    const key = 'pos' + who
    const original = this[key]
    if (original) {
      const [ x, y ] = original
      this.cells[y][x] = remove(this.cells[y][x], who)
    }
    this[key] = [ x, y ]
    this.cells[y][x] = add(this.cells[y][x], who)
    switch (this.traps[y][x]) {
      case who:
      case 'none':
        this.turn = who + '-edge'
        break
      default:
        this.turn = flip(who)
    }
    this.check()
  }
  check () {
    const loser = []
    if (!this.posa || !this.posb) return
    for (const who of 'ab') {
      const [ x, y ] = this['pos' + who]
      const ok = (type, x, y) => !this.edges[type][y][x]
      if (x !== 0 && ok('horizontal', x - 1, y)) continue
      if (x !== 3 && ok('horizontal', x, y)) continue
      if (y !== 0 && ok('vertical', x, y - 1)) continue
      if (y !== 3 && ok('vertical', x, y)) continue
      loser.push(who)
    }
    if (loser.length === 0) return
    if (loser.length === 2) {
      alert('Draw...')
      this.result = 'draw'
    }
    if (loser.length === 1) {
      const winner = flip(loser[0])
      alert(winner.toUpperCase() + ' wins!')
      this.result = winner
    }
  }
}

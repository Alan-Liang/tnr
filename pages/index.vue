<template>
  <div id="game-container">
    <p>Traps N' Roads Remastered</p>
    <Game />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
*, *::before, *::after {
  box-sizing: border-box;
}
</style>

<style scoped>
#game-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

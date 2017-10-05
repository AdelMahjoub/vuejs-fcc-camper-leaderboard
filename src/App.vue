<template>
  <div id="app">
    <navbar></navbar>
    <div class="section">
      <div class="container">
        <board></board>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Board from './components/Board';

export default {
  name: 'app',
  components: {
    Navbar,
    Board,
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Audiowide|Orbitron|Slabo+27px');
  #app {
    font-family: 'Audiowide', cursive;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #999;
  }
</style>

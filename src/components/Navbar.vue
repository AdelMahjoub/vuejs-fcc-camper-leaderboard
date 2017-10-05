<template>
  <div class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <a
        id="brand-text" 
        class="navbar-item" 
        href="/">Camper Leaderboard</a>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <a href="https://github.com/AdelMahjoub/vuejs-fcc-camper-leaderboard" class="navbar-item" target="_blank">
            <span class="has-icon">
              <i class="fa fa-github fa-lg"></i>
              <span>github</span>
            </span>
          </a>
          <a href="https://www.freecodecamp.org" class="navbar-item" target="_blank">
            <span class="has-icon">
              <i class="fa fa-free-code-camp fa-lg"></i>
              <span>freecodecamp</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
 #brand-text {
  color: darkgreen;
  font-size: 18px;
 }
 .navbar-item span{
   color: darkgreen;
   font-size: 14px;
 }
 @media screen and (min-width: 1024px){
  .navbar-brand > a {
    padding-left: 0;
  }
  .navbar-end a {
    padding-right: 0;
  }
 }

</style>

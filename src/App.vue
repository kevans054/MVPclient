<template>
  <div id="app">
    <div id="nav">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default{
  
}
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(18, 18, 19)
}

#nav {
  padding: 30px;
  background-color: rgb(155, 186, 194);

  a {
    font-weight: bold;
    color: #1111e4;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

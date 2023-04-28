<template>
  <base-container>
    <router-view></router-view>
  </base-container>
</template>

<style>
#app {
  font-family: 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333333;
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 280px) {
  h2 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
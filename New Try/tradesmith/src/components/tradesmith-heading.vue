<template>
  <h1 class="header">TradeSmith</h1>
</template>

<style scoped>
.header {
  font-family: 'Helvetica Neue', sans-serif;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  background-color: #444444;
  border: 5px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  width: 100%;
  font-size: 4rem;
}

@media screen and (max-width: 700px) {
  .header {
    font-size: 2rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }
}

@media screen and (max-width: 280px) {
  .header {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    letter-spacing: 0.05rem;
    border-width: 2px;
  }
}
</style>

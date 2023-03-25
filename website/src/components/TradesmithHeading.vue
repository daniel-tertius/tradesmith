<template>
  <div>
    <h1 class="header">TradeSmith</h1>
  </div>
</template>

<style scoped>
.header {
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;

  background-color: #444444;
  border: 5px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);

  margin: 0;
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: 4rem;
}

@media screen and (max-width: 33rem) {
  .header {
    font-size: 2rem;
    padding: 1rem;
  }
}

@media screen and (max-width: 300px) {
  .header {
    font-size: 1.5rem;
    padding: 0.5rem;
    letter-spacing: 0.05rem;
    border-width: 2px;
  }
}
</style>

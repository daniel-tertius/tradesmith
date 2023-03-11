<template>
  <h1>TradeSmith</h1>
</template>

<style scoped>
h1 {
  font-family: 'Helvetica Neue', sans-serif;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  background-color: #444444;
  border: 5px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);

  font-size: 4rem;
  padding: 2rem 1rem;
  width: 100%;
}

@media screen and (max-width: 700px) {
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    width: 100%;
  }
}

@media screen and (max-width: 280px) {
  h1 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    width: 100%;
    letter-spacing: 0.05rem;
  }
}
</style>

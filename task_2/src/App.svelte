<script lang="ts">
  import { getCurrency } from "./api/getCurrency"

  let rightCurrency = 'USD';
  let leftCurrency = 'USD';
  let rightValue: number;
  let leftValue: number;
  let rates: {string: number};
  
  getCurrency()
    .then((res) => {
      rates = res
    });

  function changeRightValue(e: Event) {
    // @ts-ignore
    rightValue = e.target.value * (rates[leftCurrency] / rates[rightCurrency])
  }

  function changeLeftValue(e: Event) {
    // @ts-ignore
    leftValue = e.target.value * (rates[rightCurrency] / rates[leftCurrency])
  }
  
</script>

<main class="card">
  <h1>Exchange rate</h1>

  <div class="selection-wrapper">
    <select bind:value={rightCurrency} class="selection">
      {#if rates}
      {#each Object.entries(rates) as [key, some]}
        <option value={key}>{key}</option>
      {/each}
      {/if}
    </select>

    <select bind:value={leftCurrency} class="selection">
      {#if rates}
      {#each Object.entries(rates) as [key, value]}
        <option value={key}>{key}</option>
      {/each}
      {/if}
    </select>
  </div>
  
  <div class="input-wrapper">
    <input
      on:input={changeRightValue}
      value={leftValue}
      type="number"
      class="input"
      disabled={!rightCurrency}
    >
    <input
      on:input={changeLeftValue}
      value={rightValue}
      type="number"
      class="input"
      disabled={!leftCurrency}
    >
  </div>
</main>

<style>

.card {
    width: 500px;
    height:300px;
    background-color: rgba(0, 122, 200, 1);
    border-radius: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 1.5em;
  }

  .selection-wrapper {
    width: 51%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
  }

  .selection {
    background-color: #242424;
    padding: 1em;
    height: 65px;
    width: 100px;
    border: none;
    border-radius: 18px;
    color: white;
    font-size: 17px;
  }
  .selection:focus {
    outline: none;
  }

  .input-wrapper {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }

  .input {
    background-color: #242424;
    padding: 1em;
    height: 30px;
    width: 140px;
    border: none;
    border-radius: 18px;
    color: white;
    font-size: 17px;
  }

  .input:focus {
    outline: none;
  }
</style>

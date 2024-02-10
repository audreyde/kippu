<svelte:head>
  <title>kippu</title>
  <meta name="description" content="kippu" />
  <meta name="author" content="Audrey Deigaard" />
</svelte:head>

<style>
  .remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
  :global(body) {
    background-color: #f3e7e8;
  }
  :global(.svlt-grid-item) {
      border-radius: 10px;
      background-color: #f3a732;
      flex-direction: column;
  }
  .grid-container { 
			display: grid;
			grid-template-columns: 275px auto;
	}
  h3 {
    margin: 0px 0px 0px 0px;
  }
  p {
    margin: 0px;
  }
  .demo-widget {
    padding: 20px 0px 0px 10px;
  }
  input[type=text]{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
     border-radius: 10px;
     border: 1.5px solid #000000;
     color: #393939;
     width: 250px;
     height: 30px;
     padding-left: 10px;
     margin: 5px;
     flex-direction: column;
  }
  button {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
     border-radius: 20px;
     /* border: 1px solid #000000; */
     color: #f3a732;
     width: 264px;
     height: 30px;
     padding-left: 10px;
     margin: 5px;
     border-style: solid;
     background: white;
     border: none;
     cursor: pointer;
  }
  form {
    flex-direction: column;
  }
  .cards {
		flex-direction: column;
    border-radius: 10px;
    flex-direction: column;
	}
  .card {
    background-color: #f3a732;
    border-width: 2px;
    border-color: black;
  }
  .column {
    min-width: 25ch;
    height: 675px;
    /* border-color: black; */
    /* margin: 5px 5px 5px 5px; */
  }
  ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}
	li {
		padding: 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: transparent;
    border-width: 1.5px;
	}
  .column:global(.droppable) {
		outline-offset: 0.25rem;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	}

</style>

kippu
<div class="grid-container">
  <div class="new">
    <form class="form" on:submit={handleOnSubmit}>
      <div>
        <input
          placeholder="name"
          type="text"
          id="activity"
          name="activity"
          bind:value={title}
        />
      </div>
      <div>
        <input
          placeholder="location"
          type="text"
          id="location"
          name="location"
          bind:value={location}
        />
      </div>
      <div>
        <input
          placeholder="cost"
          type="text"
          id="cost"
          name="cost"
          bind:value={cost}
        />
      <div>
        <input
          placeholder="depends on"
          type="text"
          id="depends"
          name="depends"
          bind:value={depends}
        />
      </div>
      <div>
        <input
          placeholder="other constraints"
          type="text"
          id="constraints"
          name="constraints"
          bind:value={constraints}
        />
      </div>
      </div>
      <button>Add</button>
    </form>
  </div>
  <div class=demo-container>
    <ul>
      {#each data.columns as column}
        {@const cards = data.cards.filter((c) => c.column === column.id)}
        <li
          class="column"
          use:dropzone={{
            on_dropzone(card_id) {
              const card = data.cards.find((c) => c.id === card_id);
              card.column = column.id;
              data = data;
            }
          }}
        >
          <h2>{column.label}</h2>
          {#if cards.length > 0}
            <ul class="cards">
              {#each cards as card}
                <li class="card" use:draggable={card.id}>
                  {card.title}
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  
</div>
<script lang="ts">
  // import "../styles/app.css";
  import {draggable, dropzone} from "$lib/dnd"
  export let data
  // import './global.css';

let title: string;
let location: string;
let cost: number;
let depends: JSON;
let constraints: JSON;

const id = () => "_" + Math.random().toString(36).substr(2, 9);

let items = [];

function add(name, location, cost, depends, constraints) {
  let newItem = {
    id: id(),
    name: name,
    location: location,
    cost: cost,
    depends: depends,
    constraints: constraints,
  };
  return newItem

}

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);
  
};

function handleOnSubmit() {
  add(title, location, cost, depends, constraints)
}
let adjustAfterRemove = false;
</script>
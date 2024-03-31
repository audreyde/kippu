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
  .grid-container { 
			display: grid;
			grid-template-columns: 275px auto;
	}
  h2 {
    margin: 0px 5px 0px 0px;
    padding-left: 5px;
    font-family: Arial, Helvetica, sans-serif;
  }
  p {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .demo-widget {
    padding: 20px 0px 0px 10px;
  }
  input[type=text]{
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
     border-radius: 20px;
     border: 1.5px solid #000000;
     /* border: none; */
     color: #393939;
     width: 250px;
     height: 30px;
     padding-left: 10px;
     margin: 10px;
     flex-direction: column;
     /* box-shadow: inset -5px 5px 9px #cfc4c5,
            inset 5px -5px 9px #ffffff; */
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
     margin: 10px;
     border-style: solid;
     background: white;
     border: none;
     cursor: pointer;
     /* box-shadow: -5px 5px 16px #aaa2a2,
             5px -5px 16px #ffffff; */
  }
  form {
    flex-direction: column;
    margin-top: 20px;
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
    min-height: 10px;
    padding: 20px;
    margin: 10px;
    border-radius: 20px;
    font-family: Arial, Helvetica, sans-serif;
  }
  /* .column {
    width: 25ch;
    height: 675px;
    /* border-color: black; */
    /* margin: 5px 5px 5px 5px; */
  /* } */
  .column {
        height: 100%;
        width: 250px;
        padding: 0.5em;
        margin: 1em;
        float: left;
        /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
    }
  .column-content {
        height: 100%;
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
        
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
  div {
    font-family: Arial, Helvetica, sans-serif;
  }
  .column-title {
    padding-left: 10px;
  }
  /* .column:global(.droppable) {
		outline-offset: 0.25rem;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	} */

  /* section {
        width: 50%;
        padding: 0.3em;
        border: 1px solid black;
        /* this will allow the dragged element to scroll the list */
        /* overflow: scroll;
        height: 200px; */
    /* }
    div {
        width: 50%;
        padding: 0.2em;
        border: 1px solid blue;
        margin: 0.15em 0;
    } */
    .column-content:global(.hovered) {
      border-color: transparent;
  }

</style>

<h2>kippu</h2>
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
  <section class="board">
    {#each columnItems as column (column.id)}
        <div class="column">
            <h3 class="column-title">{column.name}</h3>
            <div class="column-content" use:dndzone={{items:column.items, flipDurationMs}}
                 on:consider={(e) => handleDndConsider(column.id, e)} on:finalize={(e) => handleDndFinalize(column.id, e)}>
                {#each column.items as item (item.id)}
                    <div class="card" animate:flip="{{duration: flipDurationMs}}" on:click={handleClick}>
                        {item.name}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</section>
</div>  
<!-- <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
  {#each items as item(item.id)}
  <div animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
  {/each}
</section> -->

<script lang="ts">
  // import "../styles/app.css";
  // import {draggable, dropzone} from "$lib/dnd"
  import {dndzone} from 'svelte-dnd-action';
  export let data
  // import './global.css';
  import {flip} from "svelte/animate";
  let title: string;
  let location: string;
  let cost: number;
  let depends: JSON;
  let constraints: JSON;

  let columnItems = [
		{
			id: 1,
			name: "Day 1",
			items: [
				{id: 41, name: "arrive at Taoyuan Airport"},
				{id: 42, name: "check in to Hotel Proverbs"},
				{id: 43, name: "see Taipei 101"},
				{id: 44, name: "Shilin Night Market"},
				{id: 45, name: "see Rainbow Village"},
				{id: 46, name: "travel to Jiufen"},
				{id: 47, name: "dinner reservation at Akame"},
			]
		},
		{
			id: 2,
			name: "Day 2",
			items: []
		},
		{
			id: 3,
			name: "Day 3",
			items: []
		}
	];

const flipDurationMs = 300;
function handleDndConsider(cid, e) {
  const colIdx = columnItems.findIndex(c => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];
	}
	function handleDndFinalize(cid, e) {
		const colIdx = columnItems.findIndex(c => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];
	}

function handleClick(e) {
        alert('dragabble elements are still clickable :)');
    }

const id = () => Math.random()

// let items = [];

function add(name: string, location, cost, depends, constraints) {
  let newItem = {
    id: id(),
    name: name,
    // location: location,
    // cost: cost,
    // depends: depends,
    // constraints: constraints,
  };
  if (newItem.name === undefined || newItem.name === "") {
    alert("needs a name!")
  }
  else {
    columnItems[0].items.push(newItem);
    columnItems = [...columnItems];
  }
} 

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);
  
};

function handleOnSubmit() {
  add(title, location, cost, depends, constraints)
}
</script>
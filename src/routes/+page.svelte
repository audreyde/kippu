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
  :global(.svlt-grid-shadow) {
    border-radius: 7px;
    background: transparent!important;
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
    <Grid bind:items={items} fillSpace=false rowHeight={100} let:item let:dataItem {cols}>
      <div class=demo-widget>
        <h3>{dataItem.name}</h3>
        <p>{dataItem.location}</p>
        <span on:pointerdown={e => e.stopPropagation()}
          on:click={() => remove(dataItem)}
          class=remove
          >
          ✕
        </span>
      </div>
    </Grid>
  </div>
  
</div>
<script lang="ts">
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";
import "../styles/app.css";

let title: string;
let location: string;
let cost: number;
let depends: JSON;
let constraints: JSON;
const COLS = 7;

const id = () => "_" + Math.random().toString(36).substr(2, 9);

let items = [];

const cols = [[1100, 7]];

function add(name, location, cost, depends, constraints) {
  let newItem = {
    7: gridHelp.item({
      w: 1,
      h: 1,
      x: 0,
      y: 0,
      resizable: false,
    }),
    id: id(),
    name: name,
    location: location,
    cost: cost,
    depends: depends,
    constraints: constraints,
  };
  
  let findOutPosition = gridHelp.findSpace(newItem, items, COLS);

  newItem = {
    ...newItem,
    [COLS]: {
      ...newItem[COLS],
      ...findOutPosition,
    },
  };
  items = [...items, ...[newItem]];
}

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);
  
};

function handleOnSubmit() {
  add(title, location, cost)
}
let adjustAfterRemove = false;
</script>
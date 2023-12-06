<svelte:head>
  <title>kippu</title>
  <meta name="description" content="kippu" />
  <meta name="author" content="Audrey Deigaard" />
</svelte:head>

<style>
  .remove { cursor: pointer; position: absolute; right: 5px; top: 3px; }
  :global(.svlt-grid-item) {
      border-radius: 10px;
      background-color: rgb(136, 184, 216);
      padding-left: 10px;
  }

  :global(.svlt-grid-shadow) {
    border-radius: 7px;
  }
  h3 {
    padding: 0px;
  }
  p {
    margin: 0px;
  }
</style>

kippu
<div class="new">
  <form on:submit={handleOnSubmit}>
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
    </div>
    <button>Add</button>
  </form>
</div>
<div class=demo-container>
  <Grid bind:items={items} rowHeight={100} let:item let:dataItem {cols}>
    <div class=demo-widget>
      <h3>{dataItem.name}</h3>
      <p>{dataItem.location}</p>
      <p>{dataItem.cost}</p>
      <span on:pointerdown={e => e.stopPropagation()}
        on:click={() => remove(dataItem)}
        class=remove
        >
        ✕
      </span>
    </div>
  </Grid>
</div>

<script lang="ts">
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";
import "../styles/app.css";
let title;
let location;
let cost;
const COLS = 7;

const id = () => "_" + Math.random().toString(36).substr(2, 9);

let items = [];

const cols = [[1100, 7]];

function add(name, location, cost) {
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
    cost: cost
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

const addAt = (title: string) => {
  let newItem = {
    6: gridHelp.item({
      w: 1,
      h: 1,
      x: 0,
      y: 0,
    }),
    id: id(),
    title: title,
  };

  items = [...[newItem], ...items];

  items = gridHelp.adjust(items, COLS);
};

const remove = (item) => {
  items = items.filter((value) => value.id !== item.id);
};

function handleOnSubmit() {
  add(title, location, cost)
}

</script>
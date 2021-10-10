import Items from '@/components/Items.vue';
import Item from '@/components/Item.vue';
import pokemons from '../fixtures/pokemons';
import { preTesting } from '../helpers';
import state from '../../src/store/state';

let actions;
let wrapper;

const runBeforeEach = () => {
  actions = {
    getPokemons: jest.fn(),
  };

  wrapper = preTesting({
    component: Items,
    state,
    actions,
  });
};

describe('Items.vue unfiltered', () => {
  beforeEach(runBeforeEach);

  it('requests list of pokemons', () => {
    expect(actions.getPokemons).toHaveBeenCalled();
  });

  it('renders list of pokemons', () => {
    const items = wrapper.findAllComponents(Item);
    expect(items.length).toBe(state.pokemons.keys.length);
  });
});

describe('Items.vue filtered', () => {
  beforeEach(() => {
    state.query.search = 'saur';
    runBeforeEach();
  });

  it('filters when searching by name and ability', () => {
    state.query.search = 'saur';
    runBeforeEach();
    expect(wrapper.findAllComponents(Item).length).toBe(3);
  });

  it('sorts by name', () => {
    state.query = Object.assign(state.query, {
      sort_by: 'name',
      search: null,
    });
    runBeforeEach();
    const itemsReceived = wrapper.findAllComponents(Item);
    const itemsExpected = pokemons.keys.sort(
      (a, b) => a.localeCompare(b),
    );

    itemsExpected.forEach(
      (item, index) => {
        expect(item).toBe(itemsReceived.at(index).props().item.name);
      },
    );
  });

  it('sorts by height', () => {
    state.query = Object.assign(state.query, {
      sort_by: 'height',
      search: null,
    });
    runBeforeEach();
    const itemsReceived = wrapper.findAllComponents(Item);
    const itemsExpected = pokemons.keys.map((key) => pokemons.data[key].height).sort(
      (a, b) => a - b,
    );

    itemsExpected.forEach(
      (item, index) => expect(item).toBe(itemsReceived.at(index).props().item.height),
    );
  });

  it('sorts by weight', () => {
    state.query = Object.assign(state.query, {
      sort_by: 'height',
      search: null,
    });
    runBeforeEach();
    const itemsReceived = wrapper.findAllComponents(Item);
    const itemsExpected = pokemons.keys.map((key) => pokemons.data[key].weight).sort(
      (a, b) => a - b,
    );

    itemsExpected.forEach(
      (item, index) => expect(item).toBe(itemsReceived.at(index).props().item.weight),
    );
  });

  it('sorts in descending order', () => {
    state.query = Object.assign(state.query, {
      sort_by: 'height',
      order_by: 'descending',
      search: null,
    });
    runBeforeEach();
    const itemsReceived = wrapper.findAllComponents(Item);
    const itemsExpected = pokemons.keys.map((key) => pokemons.data[key].weight).sort(
      (a, b) => a - b,
    ).reverse();

    itemsExpected.forEach(
      (item, index) => expect(item).toBe(itemsReceived.at(index).props().item.weight),
    );
  });
});

describe('Items watch query', () => {
  beforeEach(runBeforeEach);

  it('requests for pokemons when limit changes', () => {
    state.query = Object.assign(state.query, { limit: 30 });

    expect(actions.getPokemons).toHaveBeenCalled();
  });

  it('requests for pokemons when offset changes', () => {
    state.query = Object.assign(state.query, { offset: 30 });

    expect(actions.getPokemons).toHaveBeenCalled();
  });
});

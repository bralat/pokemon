import FilterInputs from '@/components/FilterInputs.vue';
import { preTesting } from '../helpers';
import state from '../../src/store/state';

let actions;
let wrapper;

const runBeforeEach = () => {
  actions = {
    setQuery: jest.fn(),
  };

  wrapper = preTesting({
    component: FilterInputs,
    state,
    actions,
    deepMount: true,
  });
};

describe('FilteredInputs sets local state on mount', () => {
  beforeEach(runBeforeEach);

  it('sets global query state when mounted', async () => {
    expect(actions.setQuery).toHaveBeenCalled();
  });
});

describe('FilteredInputs sets global query state when any input is changed', () => {
  beforeEach(runBeforeEach);

  it('sets global query state when search input is changed', async () => {
    await wrapper.find('.input-search input[type="text"]').setValue('saur');
    expect(actions.setQuery).toHaveBeenCalled();
  });

  it('sets global query state when search-by input is changed', async () => {
    await wrapper.find('.input-search_by input[type="text"]').setValue('name');
    expect(actions.setQuery).toHaveBeenCalled();
  });

  it('sets global query state when sort-by input is changed', async () => {
    await wrapper.find('.input-sort_by input[type="text"]').setValue('name');
    expect(actions.setQuery).toHaveBeenCalled();
  });

  it('sets global query state when order-by input is changed', async () => {
    await wrapper.find('.input-order_by input[type="text"]').setValue('descending');
    expect(actions.setQuery).toHaveBeenCalled();
  });

  it('sets global query state when pokemons-per-input is changed', async () => {
    await wrapper.find('.input-limit input[type="text"]').setValue(5);
    expect(actions.setQuery).toHaveBeenCalled();
  });
});

describe('FilteredInputs sets local query state when global query state is changed', () => {
  it('sets search input global query state is changed', () => {
    state.query.search = 'saur';
    runBeforeEach();
    const inputValue = wrapper.find('.input-search').props().value;
    expect(inputValue).toBe(state.query.search);
  });

  it('sets search-by input global query state is changed', () => {
    state.query.search_by = ['name,abilities'];
    runBeforeEach();
    const inputValue = wrapper.find('.input-search_by').props().value;
    expect(inputValue).toBe(state.query.search_by);
  });

  it('sets sort-by input global query state is changed', () => {
    state.query.sort_by = 'name';
    runBeforeEach();
    const inputValue = wrapper.find('.input-sort_by').props().value;
    expect(inputValue).toBe(state.query.sort_by);
  });

  it('sets order-by input global query state is changed', () => {
    state.query.order = 'ascending';
    runBeforeEach();
    const inputValue = wrapper.find('.input-order_by').props().value;
    expect(inputValue).toBe(state.query.order);
  });

  it('sets pokemons-per-input global query state is changed', () => {
    state.query.limit = '50';
    runBeforeEach();
    const inputValue = wrapper.find('.input-limit').props().value;
    expect(inputValue).toBe(state.query.limit);
  });
});

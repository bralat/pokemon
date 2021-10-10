import Navbar from '@/components/Navbar.vue';
import { preTesting } from '../helpers';
import state from '../../src/store/state';

let actions;
let wrapper;

const runBeforeEach = () => {
  actions = {
    setQuery: jest.fn(),
  };

  state.pagination.count = 100;
  state.query.offset = 50;

  wrapper = preTesting({
    component: Navbar,
    state,
    actions,
    deepMount: true,
  });
};

describe('Navbar sets global query state when button is clicked', () => {
  beforeEach(runBeforeEach);

  it('sets global query state when next button is clicked', async () => {
    await wrapper.find('button.btn-next').trigger('click');
    expect(actions.setQuery).toHaveBeenCalled();
  });

  it('sets global query state when previous button is clicked', async () => {
    await wrapper.find('button.btn-previous').trigger('click');
    expect(actions.setQuery).toHaveBeenCalled();
  });
});

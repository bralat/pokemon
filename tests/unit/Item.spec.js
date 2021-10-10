import Item from '@/components/Item.vue';
import pokemons from '../fixtures/pokemons';
import pokemon from '../fixtures/pokemon';
import { preTesting } from '../helpers';

let actions;
let wrapper;

const runBeforeEach = (itemName) => () => {
  actions = {
    getPokemonDetails: jest.fn(),
  };

  wrapper = preTesting({
    component: Item,
    actions,
    propsData: {
      item: itemName,
    },
    deepMount: true,
  });
};

describe('Item with limited pokemon data', () => {
  beforeEach(runBeforeEach(pokemon));
  const localPokemon = pokemons.data[pokemons.keys[0]];

  it('renders Pokemon name', () => {
    expect(wrapper.text()).toMatch(localPokemon.name);
  });

  it('requests for Pokemon details', () => {
    expect(actions.getPokemonDetails).toHaveBeenCalled();
  });
});

describe('Item with detailed pokemon data', () => {
  beforeEach(runBeforeEach(pokemon));

  it('renders Pokemon image', () => {
    const imageWrapper = wrapper.find('.image');
    expect(imageWrapper.exists()).toBe(true);
    expect(imageWrapper.props().src).toBe(pokemon.sprites.other['official-artwork'].front_default);
  });

  it('renders Pokemon height', () => {
    expect(wrapper.text()).toMatch(String(pokemon.height));
  });

  it('renders Pokemon weight', () => {
    expect(wrapper.text()).toMatch(String(pokemon.weight));
  });

  it('renders Pokemon abilities', () => {
    const chips = wrapper.findAll('.abilities .v-chip__content');

    expect(chips.length).toBe(pokemon.abilities.length);

    pokemon.abilities.forEach((ability, index) => {
      expect(chips.at(index).text()).toBe(ability.ability.name);
    });
  });
});

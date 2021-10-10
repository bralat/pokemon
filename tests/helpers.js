import Vue from 'vue';
import Vuetify from 'vuetify';
import vuex from 'vuex';
import VueRouter from 'vue-router';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import pokemons from './fixtures/pokemons';
import localState from '../src/store/state';
import getters from '../src/store/getters';

const localVue = createLocalVue();
localVue.use(vuex);
localVue.use(VueRouter);
Vue.use(Vuetify);

export const preTesting = ({
  component,
  state,
  actions,
  propsData,
  deepMount,
  mock,
}) => {
  // prepare state
  const state2 = state || localState;
  state2.pokemons = pokemons;

  // mock dependencies
  const store = new vuex.Store({
    actions,
    getters,
    state: state2,
  });
  const vuetify = new Vuetify();
  const router = new VueRouter({ });
  const localMock = {
    store,
    localVue,
    vuetify,
    router,
    propsData,
    ...mock,
  };

  // mount component
  if (deepMount) {
    return mount(component, localMock);
  }

  return shallowMount(component, localMock);
};

// added to avoid error with es-lint
export const anotherHelper = { };

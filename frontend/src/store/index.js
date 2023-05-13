import { createStore } from 'vuex';

import actions from './action';
import mutations from './mutation';
import getters from './getters';

const store = createStore({
  state: {
    armyList: {},
    currencyList: {},
    stateList: {},
    stateMap: {},
    unitList: [],
  },
  actions: actions,
  mutations: mutations,
  getters: getters,
});

export default store;

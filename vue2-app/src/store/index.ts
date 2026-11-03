import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

Vue.use(Vuex)

export interface Item {
  id: number
  name: string
  category: string
  price: number
}

export interface RootState {
  counter: number
  items: Item[]
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: localforage,
  asyncStorage: true,
  key: 'vue2-app',
})

export default new Vuex.Store<RootState>({
  state: {
    counter: 0,
    items: [
      { id: 1, name: 'Widget', category: 'Hardware', price: 9.99 },
      { id: 2, name: 'Gadget', category: 'Hardware', price: 24.5 },
      { id: 3, name: 'License', category: 'Software', price: 199 },
    ],
  },
  getters: {
    total: (state) => state.items.reduce((sum, i) => sum + i.price, 0),
  },
  mutations: {
    increment(state) {
      state.counter++
    },
  },
  plugins: [vuexLocal.plugin],
})

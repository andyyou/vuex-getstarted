import Vue from 'vue'
import Vuex from 'vuex'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
Vue.use(Vuex)

const CartStore = {
  state: {
    items: [
      {
        name: 'Pen',
        price: 1.9,
        marked: false
      },
      {
        name: 'Notebook',
        price: 2000,
        marked: true
      }
    ]
  },
  mutations: {
    add (state) {
      state.items.push({
        name: 'New Product',
        price: 10,
        marked: false
      })
    }
  },
  getters: {
    markedItems (state, getters, rootState, rootGetters) {
      return state.items.filter(item => item.marked)
    }
  },
  actions: {
    remove (context) {
      // context.rootState
      // context.state
      console.log('cart/remove')
    }
  }
}

const store = new Vuex.Store({
  state: {
    count: 0,
    name: 'Vue',
    todos: [
      {id: 1, task: 'Read Javascript', done: false},
      {id: 2, task: 'Learn Ruby', done: true},
    ]
  },
  getters: {
    doneTodos (state, getters) {
      return state.todos.filter(todo => todo.done)
    },
    getTaskById: (state, getters) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    }
  },
  actions: {
    incrementAsync (context) {
      // context != store instance but exposes all methods/properties of store
      // context.state, context.getters, context.commit
      setTimeout(function () {
        context.commit('increment')
      }, 1000)
    },
    decrementAsync ({ commit }, payload) {
      commit('descrment')
    }
  },
  modules: {
    cart: CartStore
  }
})

const Counter = {
  template: `
    <h1>
      <span @click="increment">
        {{ name }}
      </span>
       : {{ count }}
      <button @click.stop.prevent="incrementAsync">
        Async
      </button>

    </h1>
  `,

  computed: {
    go () {
      return 'Go'
    },
    ...mapState({
      name: state => state.name,
      count () {
        return this.$store.state.count
      }
    })
  },

  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['incrementAsync'])
  }
}

new Vue({
  el: '#app',
  store,
  computed: {
    ...mapState(['todos', 'cart', 'markedItems']),
    ...mapGetters(['doneTodos', 'markedItems'])
  },
  methods: {

  },
  components: {
    counter: Counter
  }
})

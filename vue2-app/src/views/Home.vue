<template>
  <div>
    <h1>Home <span class="mdi mdi-vuejs" /></h1>
    <p class="text-muted">Today is {{ today }}. Route: {{ $store.state.route.path }}</p>

    <b-card title="Vuex + vuex-class" class="mb-3">
      <p>Counter (persisted to IndexedDB via localforage): {{ counter }}</p>
      <b-button variant="primary" @click="onIncrement">
        <plus-icon /> Increment
      </b-button>
    </b-card>

    <b-card title="vee-validate + vue-select" class="mb-3">
      <b-form-group label="Email">
        <b-form-input v-model="email" v-validate="'required|email'" name="email" />
        <small class="text-danger">{{ errors.first('email') }}</small>
      </b-form-group>
      <v-select v-model="category" :options="categories" placeholder="Category" />
    </b-card>

    <b-card :title="`ag-grid (total ${totalLabel})`" class="mb-3">
      <item-grid :rows="filteredItems" />
    </b-card>

    <b-card title="zod + axios" class="mb-3">
      <b-button @click="fetchTodo">Fetch a todo</b-button>
      <pre class="mt-2">{{ todo }}</pre>
    </b-card>

    <portal to="footer">
      <footer class="text-center text-muted py-3">Rendered via portal-vue</footer>
    </portal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation } from 'vuex-class'
import axios from 'axios'
import { z } from 'zod'
import { format } from 'date-fns'
import { uniq } from 'lodash-es'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import ItemGrid from '@/components/ItemGrid.vue'
import { Item } from '@/store'

const Todo = z.object({ id: z.number(), title: z.string(), completed: z.boolean() })

@Component({ components: { ItemGrid, PlusIcon } })
export default class Home extends Vue {
  @State counter!: number
  @State items!: Item[]
  @Getter total!: number
  @Mutation increment!: () => void

  email = ''
  category: string | null = null
  todo: unknown = null

  get today() {
    return format(new Date(), 'PPP')
  }

  get categories() {
    return uniq(this.items.map((i) => i.category))
  }

  get filteredItems() {
    return this.category ? this.items.filter((i) => i.category === this.category) : this.items
  }

  get totalLabel() {
    return `$${this.total.toFixed(2)}`
  }

  onIncrement() {
    this.increment()
    this.$snotify.success(`Counter is ${this.counter}`)
  }

  async fetchTodo() {
    const loader = this.$loading.show()
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      this.todo = Todo.parse(data)
    } catch (e) {
      this.$log.error(e)
      this.$snotify.error('Request failed')
    } finally {
      loader.hide()
    }
  }
}
</script>

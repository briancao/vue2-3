<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 200px"
    :columnDefs="columnDefs"
    :rowData="rows"
    :modules="modules"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AgGridVue } from '@ag-grid-community/vue'
import { AllModules } from '@ag-grid-enterprise/all-modules'
import { Item } from '@/store'

@Component({ components: { AgGridVue } })
export default class ItemGrid extends Vue {
  @Prop({ required: true }) readonly rows!: Item[]

  modules = AllModules
  columnDefs = [
    { field: 'name', sortable: true },
    { field: 'category', sortable: true, enableRowGroup: true },
    { field: 'price', sortable: true },
  ]
}
</script>

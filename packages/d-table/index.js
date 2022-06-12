import DTable from './src/index.vue'
DTable.install = (Vue) => {
  Vue.component(DTable.name, DTable)
}

export default DTable
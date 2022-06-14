import TablePage from './src/index.vue'
TablePage.install = (Vue) => {
  Vue.component(TablePage.name, TablePage)
}

export default TablePage
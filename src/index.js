
import DTable from '../packages/d-table/index.js'
function install(Vue) {
  Vue.component(DTable.name, DTable)
}

export {
  DTable
}

export default install  //umd
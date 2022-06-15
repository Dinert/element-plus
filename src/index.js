
import DTable from '../packages/d-table'
import TablePage from '../packages/table-page'
import DDialog from '../packages/d-dialog'
import DForm from '../packages/d-form'
import { getFormValue } from './utils/getValue'
import { filterNullStrUndefind } from './utils/tools'


const components = [DTable, TablePage, DDialog, DForm]
const install = (Vue) => {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

export {
  DTable,
  TablePage,
  DDialog,
  DForm,
  getFormValue,
  filterNullStrUndefind,
}

export default install  //umd
import DDialog from './src/index.vue'
DDialog.install = (Vue) => {
  Vue.component(DDialog.name, DDialog)
}

export default DDialog
<script setup>
import DForm from '../../d-form'
import DTable from '../../d-table'
import { getFormValue } from '@/utils/getValue'
import { filterNullStrUndefind } from '@/utils/tools'

const props = defineProps({

  // form表单的配置
  formItem: {
    type: Object,
    default: () => { }
  },

  // 表格的数据
  table: {
    type: Object,
    default: () => {
      return {
        tableColumn: []
      }
    }
  },

  // 是否显示操作
  isOperation: {
    type: Boolean,
    default: true
  },

  // 分页
  pagination: {
    type: Object,
    default: () => { }
  },

  tableSlot: {
    type: Boolean,
    default: true
  },

  // form表单
  colLayout: {
    type: Object,
    default: () => { },
  },

  form: {
    type: Object,
    default: () => { 
      return {
        model: {},
        on: {}
      }
    }
  },

  disabled: {
    type: Boolean,
  },

  showHeader: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  }
})

// emit
const emit = defineEmits(['currentChange', 'sizeChange'])

// column的prop
const columnProp = (prop) => {
  return 'column_' + prop
}

// 当前页条数
const sizeChange = (value) => {
  emit('sizeChange', value)
}

// 页数
const currentChange = (value) => {
  emit('currentChange', value)
}


// watch

</script>

<template>
  <section class="table-page">
    <d-form ref="searchForm" v-bind="{
      formItem,
      form: {
        ...form
      },
      colLayout
    }" v-if="showSearch">
      <template #search>
        <slot name="search"></slot>
      </template>
    </d-form>
    <d-table v-bind="{ table, pagination, tableSlot: false, showHeader }" v-on="{
      sizeChange,
      currentChange
    }">
      <template #header-left>
        <slot name="header-left"></slot>
      </template>
      <template #default="scope">
        <template v-if="tableSlot">
          <slot v-bind="scope" :name="columnProp(scope.prop)"></slot>
        </template>
        <template v-else>
          <slot v-bind="scope"></slot>
        </template>
      </template>

    </d-table>
  </section>
</template>

<style lang="scss" scoped>
.table-page {
  display: flex;
  flex-direction: column;

  .d-table {
    flex: 1;
    height: 0;
  }
}
</style>

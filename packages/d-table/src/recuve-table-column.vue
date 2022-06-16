<script setup>
defineProps({
  tableColumn: {
    type: Array,
    default: () => []
  }
})
const filterColumn = (column) =>{
  const obj = {}
  for(const prop in column) {
    if(prop !== 'children') {
      obj[prop] = column[prop]
    }
  }
  return obj
}
</script>

<template>
  <el-table-column v-for="column in tableColumn" :key="column.prop" :showOverflowTooltip="true" v-bind="filterColumn(column)">
    <template #default="scope">
      <slot v-bind="scope" :data="column" :prop="column.prop" >
        {{ scope.row[column.prop] }}
      </slot>
      <template v-if="column.children && column.children.length">
        <!-- 式 -->
        <recuve-table-column :tableColumn="column.children" :key="column.prop">
          <template #default="scope">
            <slot v-bind="scope"></slot>
          </template>
        </recuve-table-column>
      </template>
    </template>
  </el-table-column>
  <slot name="tableColumnAfter"></slot>
</template>

<style lang="scss" scoped>
</style>

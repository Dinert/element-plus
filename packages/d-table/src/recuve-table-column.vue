<script setup>
defineProps({
  tableColumn: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-table-column v-for="column in tableColumn" :key="column.prop" :showOverflowTooltip="true" v-bind="column">
    <template #default="scope">
      <slot v-bind="scope" :prop="column.prop">
        {{ scope.row[column.prop] }}
      </slot>
      <template v-if="column.children && column.children.length">
        <!-- 式 -->
        <recuve-table-column :tableColumn="column.children" :key="column.prop" :name="column.prop">
          <template #default="scope">
            <slot v-bind="scope">{{scope.row[scope.prop]}}</slot>
          </template>
        </recuve-table-column>
      </template>
    </template>
  </el-table-column>
  <slot name="tableColumnAfter"></slot>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import { firstUpperCase } from '@/utils/tools'
import useWindowResize from '@/hook/useWindowResize'

// props
const props = defineProps({
  ref,
  formItem: {
    type: Object,
    default: () => { },
  },
  model: {
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
  row: {
    type: Object,
    default: () => { }
  },
  colLayout: {
    type: Object,
    default: () => {
      return {
        xl: 3, // ≥1920px
        lg: 4, // ≥1200px
        md: 8, // ≥992px
        sm: 12, // ≥768px
        xs: 24 // <768px
      }
    }
  },
  isSearch: {
    type: Boolean,
    default: true
  }
});

// mounted


// data
const formRef = ref(null)
const setFormArr = []
const elFormHeight = ref(props.form.height || 62)
const isArrow = ref(false) // 是否显示展示操作
const packUp = ref(true)

// methods

// 监听winodw窗口缩放
useWindowResize(() => {
  const elFormLeft = document.querySelector('.el-form-left')
  const clientHeight = elFormLeft.clientHeight
  if (clientHeight > elFormHeight.value) {
    isArrow.value = true
  } else {
    if (!packUp.value) {
      packUp.value = true
    }
    isArrow.value = false
  }
})

// 展开还是收起状态
const unfold = () => {
  if (packUp.value) {
    packUp.value = false
  } else {
    packUp.value = true
  }
}

// item的ref
const setForm = (el) => {
  setFormArr.push(el)
}

// 显示label的tooltip
const labelMounseEnter = (index, form) => {
  const labelEl = setFormArr[index].$el.querySelector('.el-form-item__label')
  const tooltipEl = setFormArr[index].$el.querySelector('.label-tooltip')
  const labelMaxWidth = parseInt(window.getComputedStyle(labelEl, null).getPropertyValue('max-width'))
  const tooltipWidth = parseInt(window.getComputedStyle(tooltipEl, null).getPropertyValue('width'))
  if (tooltipWidth > labelMaxWidth) {
    form.labelTooltip = false
  } else {
    form.labelTooltip = true
  }
}

// 鼠标移入显示tooltip
const mouseEnter = (index, form) => {
  const el = setFormArr[index].$el.querySelector('.el-input__inner')
  const tempEl = setFormArr[index].$el.querySelector('.temp-tooltip')
  const elWidth = el.offsetWidth
  const tempElWidth = tempEl.offsetWidth
  if (tempElWidth > elWidth) {
    form.tooltip = true
  } else {
    form.tooltip = false
  }
}

// 获取显示的tooltip值
const getTooltipValue = (value, form) => {
  const type = form.type
  const options = form.options && form.options.options
  if (['input'].includes(type)) {
    return value
  } else if (['select'].includes(type)) {
    let item = options.filter(item => item.value === value)[0]
    return item && item.label
  }
}

// 更改日期组件显示的placeholder
const datePickerPlaceholder = (label, item) => {
  const type = item.type;
  if (["week"].includes(type)) {
    return "周";
  } else if (["month", "monthrange"].includes(type)) {
    return "月份";
  } else if (["year", "yearrange"].includes(type)) {
    return "年份";
  }
  return "时间";
}

// expose
defineExpose({
  formRef
})
</script>

<template>
  <el-form v-bind="{
    inline: true,
    ...form
  }" ref="formRef" :class="{ packUp: !packUp }">
    <el-row v-bind="{ gutter: 20, ...row }" class="el-form-left">
      <el-col v-bind="colLayout" v-for="(item, key, index) in formItem" :class="[item.type]">
        <el-form-item v-bind="{
          key: key,
          prop: key,
          ref: setForm,
          ...item
        }">
          <template #label>
            <span class="label-tooltip">{{ item['label'] }}</span>
            <el-tooltip v-bind="{
              content: item['label'],
              placement: 'top',
              disabled: item.labelTooltip
            }">
              <span class="label-text" @mouseenter="labelMounseEnter(index, item)">{{ item['label'] }}</span>
            </el-tooltip>
          </template>
          <el-tooltip v-bind="{
            content: getTooltipValue(form.model[key], item),
            placement: 'top',
            disabled: !item.tooltip
          }">
            <div @mouseenter="mouseEnter(index, item)">
              <span class="temp-tooltip">{{ getTooltipValue(form.model[key], item) }}</span>
              <template v-if="['input'].includes(item.type)">
                <el-input clearable v-model="form.model[key]"
                  v-bind="{ placeholder: '请输入' + item.label, ...item.options }" v-on="{ ...item.on }"></el-input>
              </template>
              <template v-else-if="['select'].includes(item.type)">
                <el-select clearable v-model="form.model[key]"
                  v-bind="{ placeholder: '请选择' + item.label, ...item.options }" v-on="{ ...item.on }">
                  <el-option v-for="options in item.options.options" v-bind="options" v-on="{ ...item.on }">
                    <slot :name="item.type + firstUpperCase(key)" :options="options"></slot>
                  </el-option>
                </el-select>
              </template>
              <template
                v-else-if="['datetime', 'date', 'week', 'month', 'year', 'datetimerange', 'daterange', 'monthrange', 'yearrange'].includes(item.type)">
                <el-date-picker clearable v-model="form.model[key]" v-bind="{
                  placeholder:
                    '请选择' + datePickerPlaceholder(item.label, item),
                  startPlaceholder:
                    '开始' + datePickerPlaceholder(item.label, item),
                  endPlaceholder:
                    '结束' + datePickerPlaceholder(item.label, item), 'unlink-panels': true, ...item.options
                }"
                  v-on="{ ...item.on }">
                </el-date-picker>
              </template>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="el-form-right">
      <el-button type="text" v-if="isArrow" @click="unfold" class="el-form-right-operation">
        <svg class="ali-icon" aria-hidden="true" style="margin-right: 3px;">
          <use :xlink:href="packUp ? `#icon-arrow-up` : `#icon-arrow-down`"></use>
        </svg>
        {{ packUp ? '收起' : '展开' }}
      </el-button>
      <slot name="search"></slot>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  padding: 16px 16px 0;
  background-color: var(--el-bg-color);
  border-radius: var(--el-bg-radius);
  display: flex;
  overflow: auto;
  transition: var(--el-transition-all);
  max-height: 300px;
  min-height: 50px;

  &.packUp {
    max-height: 50px;
  }

  .el-form-left {
    flex: 1;

    .el-col {
      &.datetimerange {
        min-width: 450px;
      }

      &.date {
        min-width: 210px;
      }

      &.month {
        min-width: 190px;
      }

      &.select {
        min-width: 230px;
      }
    }
  }

  .el-form-right {
    margin-left: 20px;
    min-width: 150px;
    display: flex;
    justify-content: flex-end;

    .el-form-right-operation {
      &.el-button.is-text {
        background-color: unset;
        padding-right: 0;
      }
    }
  }

  .el-form-item {
    width: 100%;
    margin-bottom: 18px;

    &::v-deep(.temp-tooltip) {
      display: block;
      position: absolute;
      left: 999999999;
      z-index: -9999;
    }

    &::v-deep(.el-tooltip__trigger) {
      width: 100%;
    }


    &::v-deep(.el-date-editor) {
      width: 100%;

      .el-input__wrapper {
        width: 100%;
        box-sizing: border-box;
      }
    }



    &::v-deep(.el-input__inner) {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &::v-deep(.el-form-item__label) {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 80px;
    }

    &::v-deep(.label-tooltip) {
      position: absolute;
      left: -99999999999px;
      z-index: 9999999999;
    }

    &::v-deep(.el-tooltip__trigger) {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }


  }

  .el-select {
    width: 100%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>

<template>
  <CAccordion
    color="primary"
    v-if="acl?.includes('DEV')"
    class="dev-accordion mb-3"
    :active-item-key="opened ? 1 : null"
  >
    <CAccordionItem :item-key="1">
      <CAccordionHeader @click="onDevAccordionClicked">
        <b>Dev Info</b>
      </CAccordionHeader>
      <CAccordionBody active>
        <CSmartTable
          cleaner
          tableFilter
          column-sorter
          class="mm-table-fixes w-auto"
          :table-filter-value="tableFilterValue"
          :sorter-value="mySorterValue"
          :table-props="{
            striped: true,
            hover: true,
            responsive: true,
          }"
          :columns="tableColumns"
          :items="tableItems"
          :items-per-page="100"
          :activePage="1"
          :column-filter-value="columnFilterValue"
          @column-filter-change="onColumnFilterChange"
          @table-filter-change="onTableFilterChange"
          @sorter-change="onSorterChanged"
          @tableCleanerClick="onTableCleanerClick"
        >
          <template #cleanerIcon>
            <span @click="onTableCleanerClick">
              <CIcon icon="cil-filter-x" alt="Clear Filters and Sorters" />
            </span>
          </template>
          <template #name="{ item }">
            <td class="text-left word-break-cell">
              <span
                :class="{ 'text-primary': item.isComputed }"
                :title="item.isComputed ? 'Computed Variable' : ''"
              >
                {{ item.name }}
                <span class="text-italic text-warning fs-12">
                  {{ _isArray(vm[item.name]) ? 'array' : typeof vm[item.name] }}
                </span>
              </span>
            </td>
          </template>
          <template #value="{ item }">
            <td>
              <template
                v-if="
                  typeof vm[item.name] === 'object' &&
                  Object?.keys(vm[item.name] || [])?.length > 0
                "
              >
                <CAccordion color="primary" class="dev-accordion mb-0">
                  <CAccordionItem :item-key="1">
                    <CAccordionHeader>
                      <b class="pe-2">{{
                        _isArray(vm[item.name]) ? 'array' : 'object'
                      }}</b>
                    </CAccordionHeader>
                    <CAccordionBody active>
                      <pre class="mb-0">{{ vm[item.name] }}</pre>
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
              </template>
              <template v-else>
                {{ vm[item.name] }}
              </template>
            </td>
          </template>
        </CSmartTable>
        <slot class="mt-3"></slot>
      </CAccordionBody>
    </CAccordionItem>
  </CAccordion>
</template>

<script>
import { mapState } from 'vuex'
import { isArray } from 'lodash'

export default {
  data() {
    const tableColumns = [
      {
        key: 'name',
        label: 'Name',
        _props: {
          class: ['text-left'],
        },
      },
      {
        key: 'value',
        label: 'Value',
      },
    ]

    const columnFilterValue = localStorage.columnFilterValueDev
      ? JSON.parse(localStorage.columnFilterValueDev)
      : {}

    const mySorterValue = localStorage.mySorterValueDev
      ? JSON.parse(localStorage.mySorterValueDev)
      : {}

    const tableFilterValue = localStorage.tableFilterValueDev || ''
    const opened = localStorage.devAccordionOpened === 'true'

    return {
      myVariableNames: [],
      myComputedVariablesNames: [],
      tableColumns,
      tableItems: [],
      columnFilterValue,
      mySorterValue,
      tableFilterValue,
      opened,
    }
  },
  props: {
    // set which variables should be visible on the table (whitelist). If not set, all variables will be visible
    variableNames: {
      type: Array,
      default: () => [],
    },
    // set which computed variables should be visible on the table (whitelist). If not set, all variables will be visible
    computedVariableNames: {
      type: Array,
      default: () => [],
    },
    vm: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  mounted() {
    this.start()
  },
  computed: {
    ...mapState('memberModule', ['acl']),
  },
  methods: {
    start() {
      this.myVariableNames = this.variableNames?.length
        ? this.variableNames
        : Object.keys(this.vm.$data)

      this.myVariableNames = this.myVariableNames.sort()

      this.myComputedVariablesNames = Object?.keys(
        this.computedVariableNames?.length || this.vm.$options.computed || {},
      ).map((variable) => {
        return variable
      })

      this.myComputedVariablesNames = this.myComputedVariablesNames
        .sort()
        .reverse()

      this.tableItems = this.myVariableNames.map((variable) => {
        return {
          name: variable,
          value: this.vm[variable],
          isComputed: false,
        }
      })

      this.myComputedVariablesNames.forEach((variable) => {
        this.tableItems.unshift({
          name: variable,
          value: this.vm[variable],
          isComputed: true,
        })
      })
    },
    onColumnFilterChange(e) {
      localStorage.columnFilterValueDev = JSON.stringify(e)
    },
    onTableFilterChange(e) {
      localStorage.tableFilterValueDev = e?.value
    },
    onSorterChanged(e) {
      localStorage.mySorterValueDev = JSON.stringify(e)
    },
    onTableCleanerClick() {
      localStorage.removeItem('columnFilterValueDev')
      localStorage.removeItem('tableFilterValueDev')
      localStorage.removeItem('mySorterValueDev')
    },
    onDevAccordionClicked() {
      this.opened = !this.opened
      localStorage.devAccordionOpened = this.opened
    },
    _isArray(item) {
      return isArray(item)
    },
  },
}
</script>

<style lang="scss">
.dev-accordion {
  .accordion-button {
    padding: 10px 20px;
  }

  .mm-table-fixes.w-auto {
    table {
      width: auto;
    }
  }

  .form-label.col-sm-auto.col-form-label {
    padding-left: 20px;
  }
}
</style>

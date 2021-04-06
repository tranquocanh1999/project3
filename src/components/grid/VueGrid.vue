<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      noDataText="Không có dữ liệu"
      :data-source="data"
      :show-borders="true"
      :allow-column-reordering="true"
      ref="dataGrid"
      :key-expr="id"
      :hoverStateEnabled="true"
    >
      <DxPaging :enabled="false"></DxPaging>

      <DxSelection
        v-if="false"
        mode="multiple"
        show-check-boxes-mode="always"
        select-all-mode="page"
      />
      <DxColumn
        v-for="item in header"
        :key="item.id"
        :width="item.width"
        :data-field="item.class"
        :cell-template="item.class==='image'?'image':''"
        :caption="item.name"
      />
      <template #image="{ data }">
      
             <img class="bill-search-image" :src="data.value" />
        </template>
    </DxDataGrid>
  </div>
</template>

<script>
export default {
  name: "vue-grid",
  props: {
    data: {
      type: Array,
      default: null,
    },
    header: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style></style>

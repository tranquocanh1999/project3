<template>
  <div class="grid" :class="[paging ? 'hasPaging' : '']">
    <DxDataGrid
      id="gridContainer"
      noDataText="Không có dữ liệu"
      :data-source="data"
      :show-borders="true"
      :allow-column-reordering="true"
      @selection-changed="onSelectionChanged"
      ref="dataGrid"
      key-expr="id"
      :hoverStateEnabled="true"
    >
      <DxLoadPanel :enabled="true" />
      <DxPaging :enabled="false"></DxPaging>

      <DxSelection
        v-if="selectionMode"
        mode="multiple"
        show-check-boxes-mode="always"
        select-all-mode="page"
      />
      <DxColumn
        v-for="item in header"
        :key="item.id"
        :width="item.width"
        :data-field="item.class"
        :cell-template="item.class === 'image' ? 'image' : ''"
        :caption="item.name"
      />
      <template #image="{ data }">
        <img class="bill-search-image" :src="data.value" />
      </template>
    </DxDataGrid>
    <div class="paging w-full" v-if="paging">
      <div class="page-total" id="test">
        Tổng số bản ghi: <b>{{ totalElements }}</b>
      </div>
      <diV class="page-left">
        <div class="page-select-box">
          <div class="center-text checked-text">
            <DxSelectBox
              :items="page"
              :value.sync="numberElementsOfPage"
              item-template="customItem"
              :onValueChanged="onChangePageSize"
            >
              <template #customItem="{ data }">
                <div class="page-custom-item">
                  <div class="page-name">
                    {{ data }}
                  </div>
                  <div
                    class="page-selected"
                    v-if="data === numberElementsOfPage"
                  ></div>
                </div>
              </template>
            </DxSelectBox>
          </div>
        </div>
        <div class="page-infor">
          từ <b>{{ elementFrom }}</b> đến <b>{{ elementTo }}</b> bản ghi
        </div>
        <div class="page-paging">
          <div
            class="btn-prev "
            @click="prevClick"
            :class="{ disable: pageNumber < 2 }"
          ></div>
          <div
            @click="nextClick"
            :class="{
              disable:
                Math.ceil(totalElements / numberElementsOfPage) <= pageNumber,
            }"
            class="btn-next"
          ></div>
        </div>
      </diV>
    </div>
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
    selectionMode: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Array,
      default: null,
    },
    deleteMode: {
      type: Boolean,
      default: false,
    },
    totalElements: {
      type: String,
      default: "0",
    },
    paging: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listSelection: [],
      page: [15, 25, 50, 100],
      numberElementsOfPage: 25,
      elementFrom: 0,
      elementTo: 0,
      pageNumber: 1,
    };
  },

  methods: {
    onSelectionChanged(e) {
      this.$emit("onSelectionChanged", e.selectedRowKeys);
    },
    onChangePageSize() {
      this.$emit("onChangePageSize", this.numberElementsOfPage);
    },
    prevClick() {},
    nextClick() {},
  },
  watch: {
    deleteMode: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (this.deleteMode === false) {
        const dataGrid = this.$refs["dataGrid"].instance;
        dataGrid.clearSelection();
      }
    },
  },
};
</script>

<style></style>

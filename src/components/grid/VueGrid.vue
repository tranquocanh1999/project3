<template>
  <div class="grid" :class="[paging ? 'hasPaging' : '']">
    <DxDataGrid
      id="gridContainer"
      noDataText="Không có dữ liệu"
      :data-source="data"
      :show-borders="true"
      :allow-column-reordering="true"
      @selection-changed="onSelectionChanged"
      @option-changed="handlePropertyChange"
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
        :cell-template="getTemplate(item)"
        :caption="item.name"
        data-type="text"
      />
      <template #image="{ data }">
        <img class="bill-search-image" :src="data.value" />
      </template>
      <template #gender="{ data }">
        <div>{{ data.value == 1 ? "Nữ" : "Nam" }}</div>
      </template>
      <template #date="{ data }">
        <div>{{ data.value | date }}</div>
      </template>
      <template #selectBox="{ data }">
        <div>{{ onHandleSelecBox(data) }}</div>
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
            @click="prevClick(!(pageNumber < 2))"
            :class="{ disable: pageNumber < 2 }"
          ></div>
          <div
            @click="
              nextClick(
                !(Math.ceil(totalElements / numberElementsOfPage) <= pageNumber)
              )
            "
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
import Vue from "vue";

export default {
  name: "vue-grid",
  props: {
    name: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: null,
    },
    selectionMode: {
      type: Boolean,
      default: false,
    },
    selecBox: {
      type: Object,
      default: null,
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
      type: Number,
      default: 0,
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
    handlePropertyChange() {
      this.countInfor();
    },
    onSelectionChanged(e) {
      this.$emit("onSelectionChanged", e.selectedRowKeys);
    },
    onChangePageSize() {
      this.pageNumber = 1;
      this.$emit("onChangePageSize", this.numberElementsOfPage);
    },
    onChangePage() {
      this.$emit("onChangePage", this.pageNumber - 1);
    },
    countInfor() {
      this.elementFrom = (this.pageNumber - 1) * this.numberElementsOfPage + 1;
      this.elementTo = this.pageNumber * this.numberElementsOfPage;
      this.elementTo =
        this.elementTo < parseInt(this.totalElements)
          ? this.elementTo
          : parseInt(this.totalElements);
    },
    onHandleSelecBox(value) {
      if (this.name === "employee") {
        if (value.column.name === "position")
          return Vue.filter("employeePosition")(value.value);
        if (value.column.name === "status")
          return Vue.filter("employeeStatus")(value.value);
      }
      if (this.name === "product") {
        if (value.column.name === "category")
          return Vue.filter("productCategory")(value.value);
      }
      console.log(value.column.name);
      console.log(this.name);
      if (this.name === "bill") {
        if (value.column.name === "status")
          return Vue.filter("billStatus")(value.value);
      }
    },

    prevClick(check) {
      if (check) {
        this.pageNumber--;
        this.onChangePage();
      }
    },
    nextClick(check) {
      if (check) {
        this.pageNumber++;
        this.onChangePage();
      }
    },
    getTemplate(data) {
      if (data.class === "image") return "image";
      if (data.class === "gender") return "gender";
      if (data.type === "date") return "date";
      if (data.type === "selectBox") return "selectBox";
      return "";
    },
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
  created() {
    this.countInfor();
  },
};
</script>

<style></style>

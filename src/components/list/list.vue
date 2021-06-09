<template>
  <div class="list w-full">
    <div class="w-full list-header" v-if="deleteMode">
      <div class="selected">
        Đã chọn <b>{{ itemsSelected.length }}</b>
      </div>
      <div class="unselected" @click="closeDeleteMode">Bỏ chọn</div>
      <vue-button
        class="ms-button-danger"
        :iconStyle="{
          width: '20px',
          height: '20px',
          maskPosition: '-170px -26px',
          backgroundColor: 'var( --primary)',
        }"
        :buttonStyle="{
          marginRight: '5px',
          marginLeft: '-15px',
        }"
        text="Xóa"
        @onClick="onDeleteClicked()"
      ></vue-button>
      <vue-button
        v-if="itemsSelected.length === 1"
        class="ms-button-primary ml-10"
        :iconStyle="{
          width: '16px',
          height: '16px',
          maskPosition: '-292px -26px',
          backgroundColor: 'white',
        }"
        :buttonStyle="{
          marginRight: '5px',
          marginLeft: '-15px',
        }"
        @onClick="onUpdateClicked()"
      ></vue-button>
    </div>
    <div class="w-full list-header" v-if="!deleteMode">
      <div class="list-header-title">{{ title }}</div>
      <div
        class="list-header-selectbox"
        v-for="(item, index) in headerSelecBox"
        :key="index"
      >
        {{ item.title }}:
        <div class="center-text w-150 ml-10 mr-10">
          <DxSelectBox
            :items="item.data"
            v-model="item.value"
            placeholder=""
            display-expr="name"
            value-expr="id"
            @value-changed="onHandleSelection(item)"
          />
        </div>
      </div>
      <div style="width: 300px">
        <DxTextBox
          :placeholder="placeholder"
          @value-changed="onFilter()"
          :value.sync="payload.param"
        ></DxTextBox>
      </div>
      <div class="list-header-right">
        <vue-button
          class="vue-button-primary"
          :iconStyle="{
            width: '16px',
            height: '16px',
            maskPosition: '-292px -76px',
          }"
          :buttonStyle="{
            marginRight: '5px',
            marginLeft: '-15px',
            marginTop: ' 4px',
          }"
          text="Thêm"
          @onClick="onCreateClicked()"
          v-if="add"
        ></vue-button>
        <vue-button
          class="vue-button-secondary"
          :iconStyle="{
            width: '16px',
            height: '18px',
            maskPosition: '-244px -51px',
            backgroundColor: 'white',
          }"
          :buttonStyle="{
            marginTop: ' 4px',
          }"
          @onClick="onHandleFilter()"
        ></vue-button>
      </div>
    </div>

    <div class="list-content">
      <div class="list-grid" :class="[isFilter ? 'w-filter' : 'w-full']">
        <vue-grid
          :header="header"
          :totalElements="totalElements"
          :data="data"
          @onSelectionChanged="onSelectionRows"
          @onChangePageSize="onChangePageSize"
          @onChangePage="onChangePage"
          selectionMode
          :selecBox="selectBox"
          :deleteMode="deleteMode"
          :name="name"
          paging
        ></vue-grid>
      </div>
      <div class="list-filter" v-if="isFilter">
        <vue-filter
          :data="header"
          @onCloseFilter="onHandleFilter()"
          :payload.sync="payload.filter"
          @onSubmit="onFilter()"
        ></vue-filter>
      </div>
    </div>
    <confirm
      :popupVisible.sync="confirmVisible"
      :option="confirmOption"
    ></confirm>
  </div>
</template>

<script>
import { event } from "@/js/event.js";
import confirmOption from "@/js/confirm.js";
import notify from "devextreme/ui/notify";
export default {
  name: "vue-list",
  props: {
    name: {
      type: String,
      default: "",
    },
    totalElements: {
      type: String,
      default: "0",
    },
    header: {
      type: [Array, Object],
      default: null,
    },
    data: {
      type: [Array, Object],
      default: null,
    },

    placeholder: {
      type: String,
      default: "",
    },

    add: {
      type: Boolean,
      default: false,
    },
    headerSelecBox: {
      type: Array,
      default: null,
    },

    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isFilter: false,
      deleteMode: false,
      itemsSelected: [],
      confirmOption: {},
      confirmVisible: false,
      payload: {
        pageSize: 25,
        offSet: 0,
        param: "",
        filter: {},
      },
    };
  },
  methods: {
    onSelectionRows(e) {
      this.itemsSelected = e;

      if (this.itemsSelected.length === 0) this.deleteMode = false;
      else this.deleteMode = true;
    },
    closeDeleteMode() {
      this.deleteMode = false;
    },
    onHandleFilter() {
      this.isFilter = !this.isFilter;
    },
    onDeleteClicked() {
      if (this.itemsSelected.length === 1) {
        this.delete(this.itemsSelected[0]);
      } else {
        this.mutilDelete(this.itemsSelected);
      }
    },
    onUpdateClicked() {
      this.$emit("updateClicked", this.itemsSelected[0]);
    },
    onCreateClicked() {
      this.$emit("createClicked");
    },
    delete(id) {
      this.confirmOption = { ...confirmOption.deleteConfirm() };
      this.confirmVisible = true;
      event.once("confirm-event", (data) => {
        if (data === true) {
          this.$emit("deleteClicked", id);
        }
      });
    },
    mutilDelete(ids) {
      this.confirmOption = { ...confirmOption.deletesConfirm() };
      this.confirmVisible = true;
      event.once("confirm-event", (data) => {
        if (data === true) {
          var id = ids.join("','");
          this.$emit("deleteClicked", id);
          notify("Xóa thành công", "success", 1000);
        }
      });
    },
    onChangePageSize(numberElementsOfPage) {
      this.payload.pageSize = numberElementsOfPage;
      this.onFilter();
    },
    onChangePage(pageNumber) {
      this.payload.offSet = pageNumber;
      this.onFilter();
    },

    onFilter() {
      var filter = [];

      for (let prop in this.payload.filter) {
        if (prop) {
          filter.push({
            ...this.payload.filter[prop],
            name: prop,
          });
        }
      }
      const payload = { ...this.payload };
      payload.filter = filter;
      console.log(payload);
      this.$emit("onFilter", payload);
    },
    onHandleSelection(item) {
      if (item.value == "-1") {
        delete this.payload.filter[item.class];
      } else if (item.value != 0) {
        this.payload.filter[item.class] = {
          type: item.value,
        };
      }

      this.onFilter();
    },
  },
};
</script>

<style scoped>
@import "~@/assets/styles/views/list.css";
</style>

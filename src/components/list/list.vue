<template>
  <div class="list w-full ">
    <div class="w-full list-header" v-if="deleteMode">
      <div class="selected">
        Đã chọn <b>{{ itemsSelected.length }}</b>
      </div>
      <div class="unselected" @click="closeDeleteMode">
        Bỏ chọn
      </div>
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
    </div>
    <div class="w-full list-header" v-if="!deleteMode">
      <div class="list-header-title">{{ title }}</div>
      <div
        class="list-header-selectbox"
        v-for="(item, index) in headerSelecBox"
        :key="index"
      >
        {{ item.title }}:
        <div class="center-text">
          <DxSelectBox
            :items="item.data"
            v-model="item.statusValue"
            placeholder=""
            display-expr="name"
            value-expr="id"
          />
        </div>
      </div>
      <DxTextBox :placeholder="placeholder"></DxTextBox>
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
          v-if="add"
        ></vue-button>
        <vue-button
          class="vue-button-secondary"
          :iconStyle="{
            width: '16px',
            height: '18px',
            maskPosition: '-244px -51px',
          }"
          :buttonStyle="{
            marginTop: ' 4px',
          }"
          @onClick="onHandleFilter"
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
          selectionMode
          :deleteMode="deleteMode"
          paging
        ></vue-grid>
      </div>
      <div class="list-filter" v-if="isFilter">
        <vue-filter :data="header" @onCloseFilter="onHandleFilter"></vue-filter>
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
        this.delete();
      } else {
        this.mutilDelete();
      }
    },
    delete() {
      this.confirmOption = { ...confirmOption.deleteConfirm() };
      this.confirmVisible = true;
      event.once("confirm-event", (data) => {
        if (data === true) {
          notify("Xóa thành công", "success", 1000);
        }
      });
    },
    mutilDelete() {
      this.confirmOption = { ...confirmOption.deletesConfirm() };
      this.confirmVisible = true;
      event.once("confirm-event", (data) => {
        if (data === true) {
          notify("Xóa thành công", "success", 1000);
        }
      });
    },
  },
};
</script>

<style scoped>
@import "~@/assets/styles/views/list.css";
</style>

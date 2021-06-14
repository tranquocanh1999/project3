<template>
  <div
    class="filter-item "
    style="margin:0 10px 10px 10px"
    :class="{ active: selected }"
    v-if="item.isFilter"
  >
    <DxCheckBox
      :text="item.name"
      :value.sync="selected"
      :onValueChanged="onChange"
    ></DxCheckBox>
    <div class="filter-box" v-if="selected">
      <div class="m-10">
        <DxSelectBox
          :items="type"
          v-model="typeValue"
          placeholder=""
          :onValueChanged="onChange"
          display-expr="name"
          value-expr="id"
        />
      </div>

      <div class="m-10">
        <DxTextBox
          :show-clear-button="true"
          :value.sync="params"
          :onValueChanged="onChange"
          v-if="item.type === 'text' && typeValue > 9"
        />
      </div>
      <div class="mx-10" v-if="item.type === 'number' && typeValue > 19">
        Từ
      </div>
      <div class="m-10">
        <DxNumberBox
          :show-clear-button="true"
          :value.sync="params"
          :max="params1"
          :onValueChanged="onChange"
          v-if="item.type === 'number' && typeValue > 9"
        />
      </div>
      <div class="mx-10" v-if="item.type === 'number' && typeValue > 19">
        Đến
      </div>
      <div class="m-10">
        <DxNumberBox
          :show-clear-button="true"
          :value.sync="params1"
          :min="params"
          :onValueChanged="onChange"
          v-if="item.type === 'number' && typeValue > 19"
        />
      </div>
      <div class="mx-10" v-if="item.type === 'date' && typeValue > 19">
        Từ ngày:
      </div>
      <div class="m-10">
        <DxDateBox
          :use-mask-behavior="true"
          :show-clear-button="true"
          :value.sync="params"
          :onValueChanged="onChange"
          v-if="item.type === 'date' && typeValue > 9 && typeValue < 20"
          display-format="dd/MM/yy"
          dateSerializationFormat="yyyy-MM-dd"
          type="date"
        />
        <DxDateBox
          :use-mask-behavior="true"
          :show-clear-button="true"
          :value.sync="params"
          :max="params1"
          :onValueChanged="onChange"
          v-if="item.type === 'date' && typeValue > 19"
          display-format="dd/MM/yy"
          dateSerializationFormat="yyyy-MM-dd"
          type="date"
        />
      </div>
      <div class="mx-10" v-if="item.type === 'date' && typeValue > 19">
        Đến Ngày:
      </div>
      <div class="m-10">
        <DxDateBox
          :use-mask-behavior="true"
          type="date"
          :show-clear-button="true"
          :value.sync="params1"
          :min="params"
          :onValueChanged="onChange"
          v-if="item.type === 'date' && typeValue > 19"
          display-format="dd/MM/yy"
          dateSerializationFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import filter from "@/assets/json/filter.json";
export default {
  name: "vue-filter-item",
  props: {
    item: {
      type: Object,
      default: null,
    },
    payload: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      typeValue: "",
      selected: false,
      params: "",
      params1: "",
      test: {},
      filter,
      type: [],
    };
  },
  methods: {
    checkType() {
      if (this.typeValue === "") return false;
      if (this.typeValue === "Trống") return false;
      if (this.typeValue === "Không trống") return false;
      return true;
    },

    onChange() {
      if (
        (this.selected && this.typeValue !== "") ||
        (this.selected && this.typeValue !== -1)
      ) {
        this.payload[this.item.class] = {
          type: this.item.type === "gender" ? "1" : this.typeValue,
          value1:
            this.item.type === "gender"
              ? this.typeValue
              : this.params.toString(),
          value2: this.params1.toString(),
        };
      } else {
        delete this.payload[this.item.class];
      }
      this.$emit("update:payload", this.payload);
    },
  },
  created() {
    if (this.item.type === "date") this.type = this.filter.date;
    else if (this.item.type === "number") this.type = this.filter.number;
    else if (this.item.type === "text") this.type = this.filter.text;
    else if (this.item.type === "gender") {
      this.type = this.filter.gender;
      this.typeValue = "-1";
    }
  },
};
</script>

<style></style>

<template>
  <div class="filter">
    <div class="filter-title">
      <div class="title">Bộ lọc</div>
      <div class="icon-cancel" @click="onHandleClick"></div>
    </div>

    <dxTextBox :value.sync="searchParam"></dxTextBox>

    <div class="filter-content">
      <vue-filter-item
        v-for="item in data"
        :item="item"
        :key="item.id"
        v-show="
          item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
            removeAccents(item.name.toLowerCase()).includes(
              searchParam.toLowerCase()
            )
        "
        :payload.sync="payload"
      ></vue-filter-item>
    </div>
    <div class="event">
      <vue-button
        class="vue-button-secondary"
        text="Bỏ lọc"
        :buttonStyle="{
          marginLeft: '20px',
          marginRight: '20px',
        }"
        @onClick="onHandleClick"
      ></vue-button>

      <vue-button
        class="vue-button-primary"
        @onClick="onSubmit"
        text="Áp dụng"
      ></vue-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "vue-filter",
  props: {
    data: {
      type: [Object, Array],
      default: null,
    },
    payload: {
      type: Object,
      default: null,
    },
  },
  data() {
    return { searchParam: "" };
  },
  methods: {
    onHandleClick() {
      this.$emit("onCloseFilter");
      this.$emit("update:payload", []);
      this.$emit("onSubmit");
    },
    onSubmit() {
      this.payload;
      this.$emit("onSubmit");
    },
    removeAccents(str) {
      var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
      ];
      for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
      }
      return str;
    },
  },
};
</script>

<style scoped></style>

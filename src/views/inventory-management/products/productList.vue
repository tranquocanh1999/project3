<template>
  <div>
    <vue-list
      :data="listData"
      :header="product.header"
      totalElements="3"
      title="Danh Sách Sản Phẩm"
      @createClicked="onCreateClicked()"
      @deleteClicked="onDeleteClicked($event)"
      @updateClicked="onCreateClicked($event)"
      :headerSelecBox="headerSelecBox"
      name="product"
      placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
      @onFilter="onHandleFilter()"
      add
    ></vue-list>
    <product-detail
      v-if="detailVisible"
      @success="onHandleCreateSuccess()"
      :id="updateId"
      :popupVisible.sync="detailVisible"
    ></product-detail>
  </div>
</template>

<script>
import notify from "devextreme/ui/notify";
import category from "@/assets/json/category.json";
import status from "@/assets/json/status.json";
import product from "@/assets/json/product.json";
import productAPI from "@/api/components/Product/ProductAPI.js";
export default {
  data() {
    return {
      status,
      product,
      detailVisible: false,
      updateId: 0,
      listData: [],
      headerSelecBox: [
        {
          class: "category",
          title: "Loại",
          data: category.category,
          value: "0",
        },
      ],
    };
  },
  methods: {
    async onHandleFilter() {
      const response = await productAPI.getById(1);
      this.listData = response.data;
    },
    // lấy dữ liệu từ serve
    async getAll() {
      const response = await productAPI.getAll();

      this.listData = response.data;
    },
    async onHandleCreateSuccess() {
      await this.getAll();
    },
    onCreateClicked(id) {
      this.updateId = 0;
      if (id) {
        this.updateId = id;
      }
      this.detailVisible = true;
    },
    async onDeleteClicked(id) {
      await productAPI.delete(id);
      this.getAll();
      notify("Xóa thành công", "success", 1000);
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

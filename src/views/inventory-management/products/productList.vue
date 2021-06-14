<template>
  <div>
    <vue-list
      :data="listData"
      :header="product.header"
      :totalElements="totalElements"
      title="Danh Sách Sản Phẩm"
      @createClicked="onCreateClicked()"
      @deleteClicked="onDeleteClicked($event)"
      @updateClicked="onCreateClicked($event)"
      :headerSelecBox="headerSelecBox"
      name="product"
      placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
      @onFilter="onFilter($event)"
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
      totalElements: 0,
      updateId: 0,
      listData: [],
      payload: {
        pageSize: 25,
        offSet: 0,
        param: "",
        filter: [],
      },
      headerSelecBox: [
        {
          class: "category",
          title: "Loại",
          data: category.category,
          value: "-1",
        },
      ],
    };
  },
  methods: {
    onFilter(payload) {
      this.payload = { ...payload };
      this.getAll();
    },
    // lấy dữ liệu từ serve
    async getAll() {
      const response = await productAPI.paging(this.payload);
      this.totalElements = response.totalElement;
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

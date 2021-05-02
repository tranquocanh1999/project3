<template>
  <vue-list
    :data="listData"
    :header="product.header"
    totalElements="3"
    title="Danh Sách Sản Phẩm"
    :headerSelecBox="headerSelecBox"
    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
    @onFilter="onHandleFilter()"
    add
  ></vue-list>
</template>

<script>
import status from "@/assets/json/status.json";
import product from "@/assets/json/product.json";
import productAPI from "@/api/components/Product/ProductAPI.js";
export default {
  data() {
    return {
      status,
      product,
      listData: [],
      headerSelecBox: [
        {
          class: "status",
          title: "Trạng thái",
          data: status.product,
          value: 0,
        },
      ],
    };
  },
  methods: {
    async onHandleFilter() {
      const response = await productAPI.getById(1);
      this.listData= response.data;
    },
    // lấy dữ liệu từ serve
    async getAll() {
      const response = await productAPI.getAll();

      this.listData = response.data;
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

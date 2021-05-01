<template>
  <vue-list
    :data="listData"
    :header="product.header"
    totalElements="3"
    title="Danh Sách Sản Phẩm"
    :headerSelecBox="headerSelecBox"
    placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
    add
  ></vue-list>
</template>

<script>
import status from "@/assets/json/status.json";
import product from "@/assets/json/product.json";
import productAPI from "@/api/components/Product/ProductAPI.js"
export default {
  data() {
    return {
      status,
      product,
      listData:[],
      headerSelecBox: [
        {
          title: "Trạng thái",
          data: status.product,
        },
        
      ],
    };
  },
    methods: {
    // lấy dữ liệu từ serve
    async getAll() {
      console.log(this.payload);

      const response = await productAPI.getAll();

      this.listData = response.data.data;
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

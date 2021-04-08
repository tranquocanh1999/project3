<template>
  <vue-list
    :data="product"
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
export default {
  data() {
    return {
      status,
      product,
      headerSelecBox: [
        {
          title: "Trạng thái",
          data: status.product,
        },
        
      ],
    };
  },
};
</script>

<style></style>

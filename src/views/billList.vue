<template>
  <vue-list
    :data="billList"
    totalElements=3
    title="Danh Sách Đơn Hàng Bán"
    placeholder="Tìm kiếm theo tên hoặc mã đơn hàng "
    add
  ></vue-list>
</template>

<script>
import billList from "@/assets/json/receipt-sale.json";
export default {
  data() {
    return {
      billList,
    };
  },
};
</script>

<style></style>

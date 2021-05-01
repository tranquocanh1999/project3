<template>
  <vue-list
    :header="billList.header"
    :data="listData"
    totalElements="3"
    title="Danh Sách Đơn Hàng Bán"
    placeholder="Tìm kiếm theo tên hoặc mã đơn hàng "
    add
  ></vue-list>
</template>

<script>
import billList from "@/assets/json/receipt-sale.json";
import receiptSaleAPI from "@/api/components/Receipt-sales/ReceiptSaleAPI.js";
export default {
  data() {
    return {
      billList,
      listData: [],
    };
  },
  methods: {
    // lấy dữ liệu từ serve
    async getAll() {
      console.log(this.payload);
      const response = await receiptSaleAPI.getAll();

      this.listData = response.data.data;
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

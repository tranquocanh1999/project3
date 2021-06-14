<template>
  <vue-list
    :header="billList.header"
    :data="listData"
    :totalElements="totalElements"
    title="Danh Sách Đơn Hàng Bán"
    placeholder="Tìm kiếm theo tên hoặc mã đơn hàng "
    @onFilter="onFilter($event)"
  ></vue-list>
</template>

<script>
import billAPI from "@/api/components/Bill/BillAPI.js";
import billList from "@/assets/json/receipt-sale.json";
export default {
  data() {
    return {
      billList,
      listData: [],
      totalElements: 0,
      payload: {
        pageSize: 25,
        offSet: 0,
        param: "",
        filter: [],
      },
    };
  },
  methods: {
    // lấy dữ liệu từ serve
    async getAll() {
      const response = await billAPI.paging(this.payload);
      this.totalElements = response.totalElement;
      this.listData = response.data;
    },
    onFilter(payload) {
      this.payload = { ...payload };
      this.getAll();
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

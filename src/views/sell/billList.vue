<template>
  <div>
    <vue-list
      :header="billList.header"
      :data="listData"
      :totalElements="totalElements"
      title="Danh Sách Đơn Hàng Bán"
      placeholder="Tìm kiếm theo mã đơn hàng "
      @onFilter="onFilter($event)"
      @updateClicked="onCreateClicked($event)"
      :headerSelecBox="headerSelecBox"
      name="bill"
    ></vue-list>
    <bill-detail
      v-if="detailVisible"
      @success="onHandleCreateSuccess()"
      :id="updateId"
      :popupVisible.sync="detailVisible"
    ></bill-detail>
  </div>
</template>

<script>
import billAPI from "@/api/components/Bill/BillAPI.js";
import billList from "@/assets/json/receipt-sale.json";
import status from "@/assets/json/status.json";
export default {
  data() {
    return {
      billList,
      listData: [],
      detailVisible: false,
      totalElements: 0,
      updateId: 0,
      payload: {
        pageSize: 25,
        offSet: 0,
        param: "",
        filter: [],
      },
      headerSelecBox: {
        status: {
          class: "status",
          title: "Trạng thái",
          data: status.bill,
          value: "-1",
        },
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
    onCreateClicked(id) {
      this.updateId = 0;
      if (id) {
        this.updateId = id;
      }
      this.detailVisible = true;
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

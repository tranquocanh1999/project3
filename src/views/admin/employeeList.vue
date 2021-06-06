<template>
  <div>
    <vue-list
      :data="listData"
      :header="employee.header"
      totalElements="3"
      @createClicked="onCreateClicked()"
      @deleteClicked="onDeleteClicked($event)"
      @updateClicked="onCreateClicked($event)"
      @onFilter="onFilter($event)"
      placeholder="Tìm kiếm theo tên hoặc mã nhân viên"
      title="Danh Sách Nhân Viên"
      name="employee"
      :headerSelecBox="headerSelecBox"
      :selecBox="selecBox"
      add
    ></vue-list>
    <employee-detail
      v-if="detailVisible"
      @success="onHandleCreateSuccess()"
      :id="updateId"
      :popupVisible.sync="detailVisible"
    ></employee-detail>
  </div>
</template>

<script>
import notify from "devextreme/ui/notify";
import employee from "@/assets/json/employee.json";
import status from "@/assets/json/status.json";
import employeeAPI from "@/api/components/Employee/EmployeeAPI.js";

export default {
  data() {
    return {
      employee,
      listData: [],
      detailVisible: false,
      updateId: 0,
      headerSelecBox: {
        status: {
          class: "status",
          title: "Trạng thái",
          data: status.employee,
          value: 0,
        },
        position: {
          class: "position",
          title: "Vị trí",
          data: status.employeePosition,
          value: 0,
        },
      },
      payload: {
        pageSize: 20,
        offSet: 0,
        param: "",
        filter: [],
      },
    };
  },
  methods: {
    // lấy dữ liệu từ serve
    async getAll() {
      const response = await employeeAPI.paging(this.payload);

      this.listData = response.data.data;
    },
    async onHandleCreateSuccess() {
      await this.getAll();
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
    async onDeleteClicked(id) {
      await employeeAPI.delete(id);
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

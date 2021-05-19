<template>
  <div>
    <vue-list
      :data="listData"
      :header="employee.header"
      totalElements="3"
      @createClicked="onCreateClicked()"
      placeholder="Tìm kiếm theo tên hoặc mã nhân viên"
      title="Danh Sách Nhân Viên"
      :headerSelecBox="headerSelecBox"
      add
    ></vue-list>
    <employee-detail :popupVisible.sync="detailVisible"></employee-detail>
  </div>
</template>

<script>
import employee from "@/assets/json/employee.json";
import status from "@/assets/json/status.json";
import employeeAPI from "@/api/components/Employee/EmployeeAPI.js";
export default {
  data() {
    return {
      employee,
      listData: [],
      detailVisible: false,
      headerSelecBox: [
        {
          class: "status",
          title: "Trạng thái",
          data: status.employee,
          value: 0,
        },
        {
          class: "position",
          title: "Vị trí",
          data: status.employeePosition,
          value: 0,
        },
      ],
    };
  },
  methods: {
    // lấy dữ liệu từ serve
    async getAll() {
      console.log(this.payload);

      const response = await employeeAPI.getAll();

      this.listData = response.data;
    },
    onCreateClicked() {
      this.detailVisible = true;
    },
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

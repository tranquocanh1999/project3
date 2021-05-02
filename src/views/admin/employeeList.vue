<template>
  <vue-list
    :data="listData"
    :header="employee.header"
    totalElements="3"
    title="Danh Sách Nhân Viên"
    placeholder="Tìm kiếm theo tên hoặc mã nhân viên"
    :headerSelecBox="headerSelecBox"
    add
  ></vue-list>
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
  },
  async created() {
    await this.getAll();
  },
};
</script>

<style></style>

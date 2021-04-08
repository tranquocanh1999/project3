<template>
  <vue-list
    :data="employee"
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
export default {
  data() {
    return {
      employee,
      headerSelecBox: [
        {
          title: "Trạng thái",
          data: status.employee,
          statusValue: 0,
        },
        {
          title: "Vị trí",
          data: status.employeePosition,
          statusValue: 0,
        },
      ],
    };
  },
};
</script>

<style></style>

<template>
  <DxPopup
    :visible="popupVisible"
    :drag-enabled="false"
    :show-title="true"
    :width="1200"
    :height="700"
    :showCloseButton="false"
  >
    <DxToolbarItem
      :text="!isUpdate ? 'Thêm mới nhân viên' : 'Chỉnh sửa thông tin nhân viên'"
      location="before"
    >
    </DxToolbarItem>
    <DxToolbarItem widget="dxButton" :options="closeButton" location="after">
    </DxToolbarItem>
    <div class="h-100 d-flex flex-column p-0 ">
      <div class="popup-text d-flex px-100 px-24">
        <div class="image ">
          <image-input
            :value.sync="employee.image"
            :fileUpload.sync="fileImage"
            :isChange.sync="imgChange"
            text="Ảnh đại diện"
          ></image-input>
        </div>
        <div class="infor h-100 pl-50 ml-30 mb-30" style="width: 800px;  ">
          <DxScrollView
            id="scrollview"
            ref="scrollViewWidget"
            reach-bottom-text="Updating..."
          >
            <div class="text-bold text-large">A.Thông tin chung</div>
            <div class="d-flex ">
              <div class="w-50 d-block">
                <field
                  label="Mã nhân viên"
                  v-if="employee.employeeCode"
                  targetID="id"
                >
                  <DxTextBox
                    :value.sync="employee.employeeCode"
                    :read-only="true"
                  />
                </field>
                <field
                  label="Số điện thoại"
                  :messageErr="errMsg.phoneNumber"
                  targetID="phoneNumber"
                  required
                >
                  <DxTextBox
                    :value.sync="employee.phoneNumber"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field
                  label="Giới tính"
                  :messageErr="errMsg.gender"
                  targetID="gender"
                  required
                >
                  <DxSelectBox
                    :items="gender"
                    display-expr="name"
                    value-expr="id"
                    placeholder="Chọn giới tính"
                    :value.sync="employee.gender"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field
                  label="Số CMND/Thẻ căn cước"
                  :messageErr="errMsg.identityCardNumber"
                  targetID="identityCardNumber"
                  required
                >
                  <DxTextBox
                    :value.sync="employee.identityCardNumber"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field label="Nơi cấp">
                  <DxTextBox
                    :value.sync="employee.issuePlace"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field v-if="!employee.id" label="Ngày sinh">
                  <DxDateBox
                    :value.sync="employee.dateOfBirth"
                    dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
                    type="date"
                    :onValueChanged="onChangeValue"
                  />
                </field>
              </div>
              <div class="w-50 d-block ml-30">
                <field
                  label="Tên nhân viên"
                  :messageErr="errMsg.fullName"
                  targetID="fullName"
                  required
                >
                  <DxTextBox
                    :value.sync="employee.fullName"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field
                  label="Email"
                  :messageErr="errMsg.email"
                  targetID="email"
                  required
                >
                  <DxTextBox
                    :value.sync="employee.email"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field label="Ngày cấp">
                  <DxDateBox
                    display-format="dd/MM/yyyy"
                    :value.sync="employee.issueDate"
                    dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
                    type="date"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field label="Địa chỉ">
                  <DxTextBox
                    :value.sync="employee.address"
                    :onValueChanged="onChangeValue"
                  />
                </field>
                <field v-if="employee.id" label="Ngày sinh">
                  <DxDateBox
                    display-format="dd/MM/yyyy"
                    :value.sync="employee.dateOfBirth"
                    dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
                    type="date"
                    :onValueChanged="onChangeValue"
                  />
                </field>
              </div>
            </div>
            <div class="text-bold text-large mt-20">B.Thông công việc</div>
            <div>
              <div class="d-flex ">
                <div class="w-50 d-block">
                  <field label="Vị trí">
                    <DxSelectBox
                      :items="position"
                      display-expr="name"
                      value-expr="id"
                      :value.sync="employee.position"
                      :onValueChanged="onChangeValue"
                    />
                  </field>
                  <field
                    label="Mã số thuế cá nhân"
                    :messageErr="errMsg.taxcode"
                    targetID="taxcode"
                    required
                  >
                    <DxTextBox
                      :value.sync="employee.taxcode"
                      :onValueChanged="onChangeValue"
                    />
                  </field>
                  <field label="Ngày bắt đầu làm việc">
                    <DxDateBox
                      display-format="dd/MM/yyyy"
                      :value.sync="employee.joinDate"
                      dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
                      type="date"
                      :onValueChanged="onChangeValue"
                    />
                  </field>
                </div>
                <div class="w-50 d-block">
                  <field label="Lương cơ bản">
                    <DxNumberBox
                      :value.sync="employee.basicSalary"
                      format="#,###"
                      :min="0"
                      :onValueChanged="onChangeValue"
                    />
                  </field>
                  <field label="Tình trạng làm việc">
                    <DxSelectBox
                      :items="status"
                      display-expr="name"
                      value-expr="id"
                      :value.sync="employee.status"
                      :onValueChanged="onChangeValue"
                    />
                  </field>
                </div>
              </div>
            </div>
          </DxScrollView>
        </div>
      </div>
      <div class="popup-event d-flex mt-auto pt-30  ">
        <button
          type="button"
          class="btn vue-button-secondary mr-20 ml-auto"
          style="margin-left: 15px ;width:98px"
          @click="onCancelClicked()"
        >
          Thoát
        </button>
        <button
          type="button"
          class="btn vue-button-primary mr-20 mr-100"
          @click="onConfirmClicked()"
        >
          {{ !isUpdate ? "Thêm mới" : "Chỉnh sửa" }}
        </button>
      </div>
    </div>
  </DxPopup>
</template>

<script>
import notify from "devextreme/ui/notify";
import uploadImg from "@/js/uploadImg.js";
import validator from "@/js/validator/employee.js";
import status from "@/assets/json/status.json";
import { event } from "@/js/event.js";
import confirm from "@/js/confirm.js";
import employeeAPI from "@/api/components/Employee/EmployeeAPI.js";
export default {
  name: "employee-detail",
  props: {
    popupVisible: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      status: [],
      position: [],
      fileImage: null,
      imgChange: false,
      isUpdate: false,
      isChange: false,
      closeButton: {
        type: "close",
        icon: "close",
        onClick: () => {
          this.onCancelClicked();
        },
      },
      errMsg: {
        fullName: "",
        taxcode: "",
        email: "",
        identityCardNumber: "",
        phoneNumber: "",
        gender: "",
      },
      employee: {
        dateOfBirth: "",
        gender: "",
        email: "",
        employeeCode: "",
        fullName: "",
        position: "1",
        status: "1",
        address: "",
        phoneNumber: "",
        image:
          "https://firebasestorage.googleapis.com/v0/b/project3-9450a.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9a1c847b-fc0c-4594-8c7f-54ac21115c37",
        identityCardNumber: "",
        issuePlace: "",
        issueDate: "",
        taxcode: "",
        joinDate: new Date(),
        basicSalary: 0,
      },
      gender: [
        { id: "0", name: "Nam" },
        { id: "1", name: "Nữ" },
      ],

      employeeDefault: {
        dateOfBirth: "",
        gender: "",
        email: "",
        employeeCode: "",
        fullName: "",
        position: "1",
        status: "1",
        address: "",
        phoneNumber: "",
        image: "",
        identityCardNumber: "",
        issuePlace: "",
        issueDate: "",
        taxcode: "",
        joinDate: new Date(),
        basicSalary: 0,
      },
    };
  },
  methods: {
    onCancelClicked() {
      if (this.isChange) {
        this.confirmOption = { ...confirm.discardConfirm() };
        confirm.openConfirm(this.confirmOption);
        event.once("confirm-event", (data) => {
          if (data === true) {
            this.$emit("update:popupVisible", false);
            this.$emit("success");
            this.employee = { ...this.employeeDefault };
          }
        });
      } else {
        this.$emit("update:popupVisible", false);
        this.$emit("success");
        this.employee = { ...this.employeeDefault };
      }
    },
    async onConfirmClicked() {
      const validate = validator(this.employee);
      this.errMsg = validate.errMsg;
      if (validate.isValid) {
        if (this.imgChange) {
          this.employee.image = await uploadImg(this.fileImage);
          console.log(this.employee.image);
        }

        if (this.isUpdate) {
          this.confirmOption = confirm.editConfirm();
          confirm.openConfirm(this.confirmOption);
          event.once("confirm-event", async (data) => {
            if (data === true) {
              await employeeAPI.update(this.employee.id, this.employee);
              this.isChange = false;
              notify("Sửa thành công", "success", 2000);
              this.onCancelClicked();
            }
          });
        } else {
          this.confirmOption = confirm.createConfirm();
          confirm.openConfirm(this.confirmOption);
          event.once("confirm-event", async (data) => {
            if (data === true) {
              await employeeAPI.insert(this.employee);
              notify("Thêm thành công", "success", 2000);
              this.isChange = false;

              this.onCancelClicked();
            }
          });
        }
      } else notify("Vui lòng nhập đủ trường bắt buộc", "warning", 2000);
    },

    onChangeValue() {
      this.isChange = true;
    },
  },
  async created() {
    this.status = status.employee.slice(1, 4);
    this.isUpdate = false;
    this.position = status.employeePosition.slice(1, 3);
    if (this.id != 0) {
      const response = await employeeAPI.getById(this.id);
      this.employee = response;
      this.isUpdate = true;
    }
  },
};
</script>

<style scoped></style>

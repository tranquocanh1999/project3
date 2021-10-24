<template>
  <div>
    <h2 class="content-block">Thông tin cá nhân</h2>

    <div class="content-block dx-card responsive-paddings">
      <div class="form-avatar">
        <img :src="imageSrc" />
      </div>
      <div>
        <div class="text-large">{{ formData.fullName }}</div>
        <div class="text-normal">{{ formData.address }}</div>
      </div>
    </div>

    <div class="content-block dx-card responsive-paddings">
      <dx-form
        id="form"
        label-location="top"
        :form-data="formData"
        :colCountByScreen="colCountByScreen"
      >
        <DxItem :label="{ text: 'Mã nhân viên' }" dataField="employeeCode" />
        <DxItem
          :label="{ text: 'Ngày sinh' }"
          dataField="dateOfBirth"
          editor-type="dxDateBox"
        />
        <DxItem
          :label="{ text: 'Giới tính' }"
          dataField="gender"
          :editor-options="{ value: !this.formData.gender ? 'Nam' : 'Nữ' }"
        />
        <DxItem :label="{ text: 'Email' }" dataField="email" />
        <DxItem :label="{ text: 'Số điện thoại' }" dataField="phoneNumber" />
        <DxItem :label="{ text: 'Số CMND' }" dataField="identityCardNumber" />
        <DxItem
          :label="{ text: 'Ngày cấp' }"
          dataField="issueDate"
          editor-type="dxDateBox"
        />
        <DxItem :label="{ text: 'Nơi cấp' }" dataField="issuePlace" />
        <DxItem :label="{ text: 'Mã số thuế cá nhân' }" dataField="taxcode" />
        <DxItem :label="{ text: 'Lương cơ bản' }" dataField="basicSalary" />
        <DxItem
          :label="{ text: 'Ngày bắt đầu vào làm' }"
          dataField="joinDate"
          editor-type="dxDateBox"
        />
        <DxItem
          :label="{ text: 'Vị trí' }"
          dataField="position"
          :editor-options="{
            value: filter(this.formData.position),
          }"
        />
      </dx-form>
      <div class="d-flex">
        <button
          type="button"
          class="btn vue-button-primary mt-20 ml-auto"
          @click="onUpdateInforClicked()"
        >
          Sửa thông tin cá nhân
        </button>
        <button
          type="button"
          class="btn vue-button-primary mt-20 mr-20 ml-20"
          @click="onChangePassClicked()"
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
    <employee-detail
      v-if="detailVisible"
      @success="onHandleUpdateSuccess()"
      :id="formData.id"
      :popupVisible.sync="detailVisible"
      isProfile
    ></employee-detail>

    <DxPopup
      :visible="popupVisible"
      :drag-enabled="false"
      :show-title="true"
      :width="450"
      :height="550"
      :showCloseButton="false"
    >
      <DxToolbarItem text="Đổi mật khẩu" location="before"> </DxToolbarItem>
      <DxToolbarItem
        widget="dxButton"
        :options="closeButton"
        location="after"
      ></DxToolbarItem>
      <ChangePassWordForm />
    </DxPopup>
  </div>
</template>

<script>
import Vue from "vue";
import ChangePassWordForm from "./change-password-form";
import DxForm from "devextreme-vue/form";
import auth from "../auth";

export default {
  props: {
    picture: String,
  },

  data() {
    return {
      popupVisible: false,
      detailVisible: false,
      imageSrc: ``,
      formData: {},
      closeButton: {
        type: "close",
        icon: "close",
        onClick: () => {
          this.popupVisible = false;
        },
      },
      colCountByScreen: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
      },
    };
  },
  components: {
    DxForm,
    ChangePassWordForm,
  },
  methods: {
    filter(value) {
      return Vue.filter("employeePosition")(value);
    },
    onUpdateInforClicked() {
      this.detailVisible = true;
    },
    onChangePassClicked() {
      this.popupVisible = true;
    },
    onHandleUpdateSuccess() {
      auth.find(this.formData.id).then((e) => {
        this.imageSrc = e.data.image;
        this.formData = e.data;
      });
    },
  },
  created() {
    auth.getUser().then((e) => {
      this.imageSrc = e.data.image;
      this.formData = e.data;
    });
  },
};
</script>

<style lang="scss">
.form-avatar {
  float: left;
  height: 120px;
  width: 120px;
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  overflow: hidden;

  img {
    height: 120px;
    display: block;
    margin: 0 auto;
  }
}
</style>

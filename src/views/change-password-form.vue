<template>
  <form @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="oldPassword"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Mật khẩu cũ',
          mode: 'password',
        }"
      >
        <dx-required-rule message="Mật khẩu không được để trống" />
        <dx-async-rule
          message="Mật khẩu không chính xác"
          :validation-callback="onSubmit"
        />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="newPassword"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Mật khẩu mới',
          mode: 'password',
        }"
      >
        <dx-required-rule message="Mật khẩu không được để trống" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="confirmedPassword"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Nhập lại mật khẩu',
          mode: 'password',
        }"
      >
        <dx-required-rule message="Mật khẩu không được để trống" />
        <dx-custom-rule
          message="Mật khẩu nhập lại không khớp"
          :validation-callback="confirmPassword"
        />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="changePassword"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>

      <template #changePassword>
        <div>
          <span class="dx-button-text">
            <dx-loadIndicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Đổi mật khẩu</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxCustomRule,
  DxRequiredRule,
  DxAsyncRule,
} from "devextreme-vue/form";
import DxLoadIndicator from "devextreme-vue/load-indicator";
import notify from "devextreme/ui/notify";

import auth from "../auth";

export default {
  components: {
    DxForm,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
    DxRequiredRule,
    DxCustomRule,
    DxLoadIndicator,
    DxAsyncRule,
  },
  created() {
    this.recoveryCode = this.$route.params.recoveryCode;
  },
  data() {
    return {
      formData: {},
      loading: false,
      recoveryCode: "",
    };
  },
  /* eslint-disable  no-debugger */
  methods: {
    onSubmit: async function() {
      if (
        this.formData.newPassword != undefined &&
        this.formData.newPassword !== "" &&
        this.formData.newPassword == this.formData.confirmedPassword
      ) {
        this.loading = true;

        const result = await auth.changePassword(
          this.formData.oldPassword,
          this.formData.newPassword
        );
        this.loading = false;

        if (result.isOk) {
          this.$router.push("/login-form");
        } else {
          notify("Có lỗi xảy ra!", "error", 2000);
          return false;
        }
      }
      return true;
    },
    confirmPassword(e) {
      return e.value === this.formData.newPassword;
    },
  },
};
</script>

<style></style>

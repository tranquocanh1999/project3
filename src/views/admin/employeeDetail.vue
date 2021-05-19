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
    <div class="popup-text">
      <div class="image">
        <image-input></image-input>
      </div>
    </div>
    <div class="popup-event"></div>
  </DxPopup>
</template>

<script>
export default {
  name: "employee-detail",
  props: {
    popupVisible: {
      type: Boolean,
      default: false,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeButton: {
        type: "close",
        icon: "close",
        onClick: () => {
          this.onCancelClicked();
        },
      },
    };
  },
  methods: {
    onCancelClicked() {
      this.$emit("update:popupVisible", false);
    },
    onConfirmClicked() {
      this.$emit("update:popupVisible", false);
    },
  },
};
</script>

<style></style>

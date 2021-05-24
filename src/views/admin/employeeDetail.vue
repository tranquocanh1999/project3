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
    <div class="h-100 d-flex flex-column">
      <div class="popup-text d-flex px-100">
        <div class="image ">
          <image-input></image-input>
        </div>
        <div class="infor">
        <div class="text-bold text-large ml-50">A.Thông tin chung</div>
        </div>
      </div>
      <div class="popup-event d-flex mt-auto"> 
        <button
          type="button"
          class="btn vue-button-secondary mr-20 ml-auto"
          style="margin-left: 15px ;width:98px"
         
        >
           Thoát 
        </button>
        <button
          type="button"
          class="btn vue-button-primary mr-20"
     
        >
          {{!isUpdate ?"Thêm mới":"Chỉnh sửa"}}
        </button>
        </div>
    </div>
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

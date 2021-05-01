<template>
  <div class="confirm-popup">
    <DxPopup
      :visible="popupVisible"
      :drag-enabled="false"
      :show-title="true"
      :width="500"
      :height="200"
      :title="option.title === '' ? 'Thông báo' : option.title"
    >
      <div class="popup-text">
        {{ option.text }}
      </div>
      <div class="popup-event">
        <button
          type="button"
          class="btn vue-button-primary-danger"
          @click="onConfirmClicked()"
          v-if="option.buttonConfirm === 'delete'"
        >
          Xóa
        </button>
        <button
          type="button"
          class="btn vue-button-primary"
          @click="onConfirmClicked()"
          v-if="option.buttonConfirm !== 'delete'"
        >
          Đồng ý
        </button>
        <button
          type="button"
          class="btn vue-button-secondary"
          style="
            margin-left: 15px;
          "
          @click="onCancelClicked()"
        >
          {{ option.buttonCancel === "cancel" ? "Hủy" : "Thoát" }}
        </button>
      </div>
    </DxPopup>
  </div>
</template>

<script>
import { event } from "@/js/event.js";
export default {
  name: "confirm",
  props: {
    popupVisible: {
      type: Boolean,
      default: false,
    },
    option: {
      type: [Array, Object],
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    onCancelClicked() {
     
      this.$emit("update:popupVisible", false);
      event.emit("confirm-event");
    },
    onConfirmClicked() {
      event.emit("confirm-event",true);
      this.$emit("update:popupVisible", false);
    },
  },
};
</script>

<style></style>

<template>
  <DxPopup
    :visible="popupVisible"
    :drag-enabled="false"
    :show-title="true"
    :width="1200"
    :height="700"
    :showCloseButton="false"
  >
    <DxToolbarItem text="Thông tin đơn hàng" location="before"> </DxToolbarItem>
    <DxToolbarItem widget="dxButton" :options="closeButton" location="after">
    </DxToolbarItem>
    <div class="h-100 d-flex flex-column p-0 ">
      <div class="popup-text d-flex px-100 px-24">
        <div class="infor h-100  mb-30" style="width: 800px;  ">
          <DxScrollView id="scrollview" ref="scrollViewWidget">
            <div class="text-bold text-large">Thông tin chung</div>
            <field label="Mã đơn hàng" flex>
              <div>{{ bill.billCode }}</div>
            </field>
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
        <!-- <button
          type="button"
          class="btn vue-button-primary mr-20 mr-100"
          @click="onConfirmClicked()"
        >
          {{ !isUpdate ? "Thêm mới" : "Chỉnh sửa" }}
        </button> -->
      </div>
    </div>
  </DxPopup>
</template>

<script>
import billAPI from "@/api/components/Bill/BillAPI.js";
export default {
  name: "bill-detail",
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
      closeButton: {
        type: "close",
        icon: "close",
        onClick: () => {
          this.onCancelClicked();
        },
      },
      bill: null,
    };
  },
  methods: {
    onCancelClicked() {
      this.$emit("update:popupVisible", false);
    },
  },
  async created() {
    if (this.id != 0) {
      const response = await billAPI.getById(this.id);
      this.bill = response;
    }
  },
};
</script>

<style></style>

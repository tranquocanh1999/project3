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
      :text="!isUpdate ? 'Thêm mới sản phẩm' : 'Chỉnh sửa thông tin sản phẩm'"
      location="before"
    >
    </DxToolbarItem>
    <DxToolbarItem widget="dxButton" :options="closeButton" location="after">
    </DxToolbarItem>
    <div class="h-100 d-flex flex-column p-0 ">
      <div class="popup-text d-flex px-100 px-24">
        <div class="image ">
          <image-input
            :value.sync="product.image"
            :fileUpload.sync="fileImage"
            :isChange.sync="imgChange"
            text="Ảnh minh họa sản phẩm "
          ></image-input>
        </div>
        <div class="infor h-100 pl-50 ml-30 mb-30" style="width: 800px;  ">
          <DxScrollView
            id="scrollview"
            ref="scrollViewWidget"
            reach-bottom-text="Updating..."
          >
            <div class="text-bold text-large">Thông tin sản phẩm</div>
            <div class="d-flex ">
              <div class="w-50 d-block">
                <field label="Mã sản phẩm" v-if="product.productCode">
                  <DxTextBox
                    :value.sync="product.productCode"
                    :read-only="true"
                  />
                </field>
                <field
                  label="Tên sản phẩm"
                  :messageErr="errMsg.productName"
                  targetID="productName"
                  required
                >
                  <DxTextBox
                    :onValueChanged="onChangeValue"
                    :value.sync="product.productName"
                  />
                </field>
                <field
                  label="Giá nhập"
                  :messageErr="errMsg.priceIn"
                  targetID="priceIn"
                  required
                >
                  <DxNumberBox
                    :onValueChanged="onChangeValue"
                    :value.sync="product.priceIn"
                    :format="product.priceIn ? '#,### VNĐ' : '#,### '"
                    :min="0"
                  />
                </field>
                <field
                  label="Giá bán"
                  :messageErr="errMsg.priceOut"
                  targetID="priceOut"
                  required
                  v-if="!product.productCode"
                >
                  <DxNumberBox
                    :onValueChanged="onChangeValue"
                    :value.sync="product.priceOut"
                    :format="product.priceOut ? '#,### VNĐ' : '#,###'"
                    :min="0"
                  />
                </field>
              </div>
              <div class="w-50 d-block">
                <field
                  label="Loại sản phẩm"
                  :messageErr="errMsg.category"
                  targetID="category"
                  required
                >
                  <DxSelectBox
                    :onValueChanged="onChangeValue"
                    :items="category"
                    display-expr="name"
                    value-expr="id"
                    placeholder="Chọn loại sản phẩm"
                    :value.sync="product.category"
                  />
                </field>
                <field label="Số lượng" required>
                  <DxNumberBox
                    :onValueChanged="onChangeValue"
                    :value.sync="product.quantity"
                    :min="0"
                  />
                </field>
                <field
                  label="Giá bán"
                  :messageErr="errMsg.priceOut"
                  targetID="priceOut"
                  v-if="product.productCode"
                  required
                >
                  <DxNumberBox
                    :onValueChanged="onChangeValue"
                    :value.sync="product.priceOut"
                    :format="product.priceOut ? '#,### VNĐ' : '#,###'"
                    :min="0"
                  />
                </field>
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
import category from "@/assets/json/category.json";
import uploadImg from "@/js/uploadImg.js";
import validator from "@/js/validator/product.js";
import { event } from "@/js/event.js";
import confirm from "@/js/confirm.js";
import productAPI from "@/api/components/Product/ProductAPI.js";
export default {
  name: "product-detail",
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
      category: category.category.slice(1, 5),
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
        productName: "",
        priceOut: "",
        category: "",
        priceIn: "",
      },
      product: {
        productName: "",
        priceOut: 0,
        category: "",
        priceIn: 0,
        quantity: 0,
        image:
          "https://firebasestorage.googleapis.com/v0/b/project3-9450a.appspot.com/o/default.jpg?alt=media&token=07b6997c-7186-45d3-923b-84211832140a",
      },
      gender: [
        { id: "0", name: "Nam" },
        { id: "1", name: "Nữ" },
      ],

      productDefault: {
        productName: "",
        category: "",
        priceOut: 0,
        priceIn: 0,
        quantity: 0,
        image:
          "https://firebasestorage.googleapis.com/v0/b/project3-9450a.appspot.com/o/default.jpg?alt=media&token=07b6997c-7186-45d3-923b-84211832140a",
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
            this.product = { ...this.productDefault };
          }
        });
      } else {
        this.$emit("update:popupVisible", false);
        this.$emit("success");
        this.employee = { ...this.employeeDefault };
      }
    },

    async onConfirmClicked() {
      const validate = validator(this.product);
      this.errMsg = validate.errMsg;
      console.log(this.errMsg);
      if (validate.isValid) {
        if (this.imgChange) {
          this.product.image = await uploadImg(this.fileImage);
          console.log(this.product.image);
        }
        if (this.isUpdate) {
          this.confirmOption = confirm.editConfirm();
          confirm.openConfirm(this.confirmOption);
          event.once("confirm-event", async (data) => {
            if (data === true) {
              await productAPI.update(this.product.id, this.product);
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
              await productAPI.insert(this.product);
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
    if (this.id != 0) {
      const response = await productAPI.getById(this.id);
      this.product = response;
      this.isUpdate = true;
    }
  },
};
</script>

<style scoped></style>

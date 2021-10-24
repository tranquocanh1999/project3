<template>
  <DxPopup
    :visible="popupVisible"
    :drag-enabled="false"
    :show-title="true"
    :width="1000"
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
            <div class="text-bold text-medium">Thông tin chung</div>
            <div class="d-flex ">
              <div class="w-50 d-block">
                <field label="Mã đơn hàng" flex>
                  <div>{{ bill && bill.billCode }}</div>
                </field>
                <field label="Người mua" flex>
                  <div>{{ bill && bill.customerName }}</div>
                </field>
                <field label="Số lượng sản phẩm" flex>
                  <div>{{ bill && bill.numberOfProducts }}</div>
                </field>
                <field label="Người bán" flex>
                  <div>{{ bill && bill.createBy }}</div>
                </field>
                <field v-if="bill && bill.status == 2" label="Mô tả" flex>
                  <div>{{ bill && bill.description }}</div>
                </field>
              </div>
              <div class="w-50 d-block">
                <field label="Trạng thái đơn hàng" flex>
                  <div>{{ bill && bill.status | billStatus }}</div>
                </field>
                <field label="Khuyến mãi" flex>
                  <div>{{ bill && bill.promotion }}</div>
                </field>
                <field label="Tổng tiền" flex>
                  <div>{{ bill && bill.amount }}</div>
                </field>
                <field label="Ngày bán" flex>
                  <div>{{ bill && bill.createDate | date }}</div>
                </field>
              </div>
            </div>
            <div class="text-bold mt-20 text-medium">Chi tiết sản phẩm</div>
            <DxDataGrid
              id="gridContainer"
              noDataText="Không có dữ liệu"
              :data-source="products"
            >
              <DxColumn
                caption="Mã sản phẩm"
                data-field="productCode"
                data-type="text"
                width="150"
              />
              <DxColumn
                caption="Hình ảnh"
                data-field="image"
                data-type="text"
                width="150"
                cell-template="image"
              />
              <DxColumn
                caption="Tên sản phẩm"
                data-field="productName"
                width="200"
                data-type="text"
              />
              <DxColumn
                caption="Số lượng"
                width="200"
                data-field=""
                data-type="text"
                cell-template="quantityBuy"
              />
              <DxColumn
                caption="Giá bán"
                width="200"
                data-field=""
                data-type="text"
                cell-template="price"
              />
              <template #image="{ data }">
                <img class="bill-search-image" :src="data.value" />
              </template>
              <template #quantityBuy="{ data }">
                <div>{{ productList[data.key.id].quantity }}</div>
              </template>

              <template #price="{ data }">
                <div>{{ productList[data.key.id].price }}</div>
              </template>
            </DxDataGrid>
          </DxScrollView>
        </div>
      </div>
      <div class="popup-event d-flex mt-auto pt-30  ">
        <button
          v-if="bill && bill.status == 1"
          type="button"
          class="btn vue-button-primary-danger mr-20 ml-auto"
          @click="onConfirmClicked()"
        >
          {{ "Hủy đơn" }}
        </button>
        <button
          type="button"
          class="btn vue-button-secondary mr-20 "
          style="margin-left: 15px ;width:98px"
          @click="onCancelClicked()"
        >
          Thoát
        </button>
      </div>
    </div>
  </DxPopup>
</template>

<script>
import billAPI from "@/api/components/Bill/BillAPI.js";
import productAPI from "@/api/components/Product/ProductAPI.js";
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
      products: null,
      productList: null,
    };
  },
  methods: {
    onCancelClicked() {
      this.$emit("update:popupVisible", false);
    },
    onConfirmClicked() {
      this.products.forEach((e) => {
        e.quantity += this.productList[e.id].quantity;
      });
      billAPI.updateQuantity(this.products);
      this.bill.status = "2";
      billAPI.update(this.bill.id, this.bill);
      this.$emit("update:popupVisible", false);
    },
  },
  async created() {
    if (this.id != 0) {
      const response = await billAPI.getById(this.id);
      this.bill = response;
    }
    this.productList = JSON.parse(this.bill.product);
    var ids = "";
    for (var item in this.productList) {
      ids += ",'" + item + "'";
    }
    const res = await productAPI.getByIds(ids.substr(1));
    this.products = res;
    console.log(this.products);
  },
};
</script>

<style></style>

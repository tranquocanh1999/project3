<template>
  <div class="bill">
    <div class="bill-infor">
      <div class="bill-search">
        <div>
          <DxTextBox
            placeholder="Tìm kiếm theo mã sản phẩm hoặc tên"
            id="bill-search"
          />
        </div>
        <DxPopover
          :width="1050"
          show-event="dxclick"
          :hide-event="billSearchVisible"
          target="#bill-search"
          position="top"
          :onHide="toggleBillSearch"
        >
          <div
            @click="onSelectProduct(product)"
            v-for="(product, index) in products.data"
            :key="index"
            class="bill-search-list"
          >
            <img class="bill-search-image" :src="product.image" />
            <div class="bill-search-name">{{ product.name }}</div>
          </div>
        </DxPopover>
      </div>
      <div class="bill-content">
        <DxDataGrid
          id="gridContainer"
          noDataText="Không có dữ liệu"
          :data-source="bill.billProducts"
          :show-borders="true"
          :allow-column-reordering="true"
          ref="dataGrid"
          key-expr="id"
          :hoverStateEnabled="true"
        >
          <DxLoadPanel :enabled="true" />

          <DxColumn
            width="200"
            data-field="productCode"
            caption="Mã Sản Phẩm"
          />
          <DxColumn
            width="200"
            data-field="image"
            cell-template="image"
            caption="Hình ảnh"
          />
          <DxColumn width="300" data-field="name" caption="Tên Sản Phẩm" />
          <DxColumn
            width="200"
            data-field="quantityBuy"
            cell-template="quantityBuy"
            caption="Số lượng"
          />
          <DxColumn width="250" data-field="priceOut" caption="Giá tiền" />
          <template #quantityBuy="{ data }">
            <DxNumberBox
              :value.sync="data.value"
              :min="1"
              :max="data.data.quantity"
              @valueChanged="onHandleQuantityBuy(data)"
              :show-spin-buttons="true"
            />
          </template>
          <template #image="{ data }">
            <img class="bill-search-image" :src="data.value" />
          </template>
        </DxDataGrid>
      </div>
    </div>
    <div class="bill-pay">
      <div class="bill-customer-infor ">
        <h6>Thông tin khách hàng</h6>
        <div>
          <DxTextBox
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            id="bill-customer-search"
          />
        </div>
        <DxPopover
          :width="250"
          show-event="dxclick"
          :hide-event="billCustomerSearchVisible"
          target="#bill-customer-search"
          position="bottom"
          :onHide="toggleBillCustomerSearch"
        >
          <div
            @click="onSelectCustomer(customer)"
            v-for="(customer, index) in customers.data"
            :key="index"
            class="bill-customer-search-list"
          >
            <div class="bill-customer-search-name">
              {{ customer.customerName }}
            </div>
            <div class="bill-customer-search-phone">
              {{ customer.phoneNumber }}
            </div>
          </div>
        </DxPopover>
        <div class="infor mt-20">
          Tên khách hàng : {{ bill.customer.customerName }}
        </div>
        <div class="infor mt-20">
          Số điện thoại: {{ bill.customer.phoneNumber }}
        </div>
      </div>
      <div class="bill-pay-infor ">
        <h6>Thông tin hóa đơn</h6>
        <div>Tổng tiền: {{ bill.details.amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import customers from "@/assets/json/customer.json";
import products from "@/assets/json/product.json";
import billProduct from "@/assets/json/bill-product.json";

export default {
  data() {
    return {
      products,
      customers,
      billProductHeader: billProduct.header,

      bill: {
        billProducts: [],
        customer: {
          id: 0,
          customerCode: "",
          customerName: "",
          phoneNumber: "",
        },
        details: {
          amount: 0,
        },
      },

      billSearchVisible: false,
      billCustomerSearchVisible: false,
    };
  },
  methods: {
    toggleBillSearch() {
      this.billSearchVisible = !this.billSearchVisible;
    },
    toggleBillCustomerSearch() {
      this.billCustomerSearchVisible = !this.billCustomerSearchVisible;
    },
    onSelectProduct(e) {
      var product = { ...e };
      product.quantityBuy = 1;

      var index = this.bill.billProducts.findIndex(
        (element) => element.productCode == e.productCode
      );
      if (index == -1) {
        this.bill.billProducts.push(product);
        this.bill.details.amount = this.bill.details.amount + product.priceOut;
      } else if (
        this.bill.billProducts[index].quantityBuy <
        this.bill.billProducts[index].quantity
      ) {
        this.bill.billProducts[index].quantityBuy =
          this.bill.billProducts[index].quantityBuy + 1;
        this.bill.details.amount =
          this.bill.details.amount + this.bill.billProducts[index].priceOut;
      } else alert("ERROR: trong kho chỉ còn " + e.quantity + " sản phẩm");
      this.billSearchVisible = !this.billSearchVisible;
    },
    onHandleQuantityBuy(data) {
      this.bill.details.amount =
        this.bill.details.amount -
        this.bill.billProducts[data.rowIndex].priceOut *
          this.bill.billProducts[data.rowIndex].quantityBuy;
      this.bill.billProducts[data.rowIndex].quantityBuy = data.value;
      this.bill.details.amount =
        this.bill.details.amount +
        this.bill.billProducts[data.rowIndex].priceOut *
          this.bill.billProducts[data.rowIndex].quantityBuy;
    },
    onSelectCustomer(e) {
      this.bill.customer = { ...e };
      this.billCustomerSearchVisible = !this.billCustomerSearchVisible;
    },
  },
};
</script>

<style scoped>
@import "~@/assets/styles/views/bill.css";
</style>

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
        <vue-grid
          :header="billProductHeader"
          :data="bill.billProducts"
          
        ></vue-grid>
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
            <div class="bill-customer-search-phone">{{ customer.phoneNumber  }}</div>
          </div>
        </DxPopover>
        <div class="infor">Tên khách hàng : {{ bill.customer.customerName }}</div>
        <div class="infor">Số điện thoại: {{ bill.customer.phoneNumber }}</div>
      </div>
      <div class="bill-pay-infor ">
        <h6>Thông tin hóa đơn</h6>
        <div>Tổng tiền: {{bill.details.amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import customers from "@/assets/json/customer.json";
import products from "@/assets/json/product.json";
import billProduct from "@/assets/json/bill-product.json";
import VueGrid from "../../components/grid/VueGrid.vue";
export default {
  components: { VueGrid },
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
      } else alert("ERROR: trong kho chỉ còn "+e.quantity+" sản phẩm");
      this.billSearchVisible = !this.billSearchVisible;
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

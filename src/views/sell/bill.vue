<template>
  <div class="bill">
    <div class="bill-infor">
      <div class="bill-search">
        <div>
          <DxTextBox
            placeholder="Tìm kiếm theo mã sản phẩm hoặc tên"
            id="bill-search"
            :onValueChanged="getAllProduct"
            :value.sync="payloadProduct.param"
          />
        </div>
        <DxPopover
          :width="1050"
          show-event="dxclick"
          :hide-event="billSearchVisible"
          target="#bill-search"
          position="top"
          :onHiding="toggleBillSearch"
          v-if="products"
        >
          <div style="max-height:350px ; overflow-y:auto ">
            <div
              class="d-flex justify-content-center"
              v-if="products[0] == null"
            >
              Sản phẩm không tồn tại
            </div>
            <div
              @click="onSelectProduct(product)"
              v-for="(product, index) in products"
              :key="index"
              class="bill-search-list"
            >
              <img class="bill-search-image" :src="product.image" />
              <div class="bill-search-name mr-10">
                {{ product.productCode }}
              </div>
              <div class="bill-search-name">{{ product.productName }}</div>
            </div>
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
          <DxColumn
            width="300"
            data-field="productName"
            caption="Tên Sản Phẩm"
          />
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
    <div class="bill-pay d-flex flex-column">
      <div class="bill-customer-infor ">
        <h6>Thông tin khách hàng</h6>
        <div>
          <DxTextBox
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            id="bill-customer-search"
            :onValueChanged="searchCustomer"
            :value.sync="customerSearchParam"
          />
        </div>
        <DxPopover
          :width="250"
          show-event="dxclick"
          :hide-event="billCustomerSearchVisible"
          target="#bill-customer-search"
          position="bottom"
          :onHide="toggleBillCustomerSearch"
          v-if="customers"
        >
          <div style="max-height:350px ; overflow-y:auto ">
            <div
              @click="onSelectCustomer(customer)"
              v-for="(customer, index) in customers"
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
            <vue-button
              class="vue-button-secondary"
              :iconStyle="{
                width: '16px',
                height: '16px',
                maskPosition: '-292px -76px',
                backgroundColor: 'black',
              }"
              :buttonStyle="{
                marginRight: '5px',
                marginLeft: '-15px',
                marginTop: ' 4px',
                color: 'black',
                backgroundColor: 'white',
                border: 'none',
                paddingLeft: '20px',
              }"
              text="Thêm khách hàng"
              @onClick="onCreateCustomerClicked()"
            ></vue-button>
          </div>
        </DxPopover>
        <div class="infor mt-10">
          Tên khách hàng : {{ bill.customer.customerName }}
        </div>
        <div class="infor mt-10">
          Số điện thoại: {{ bill.customer.phoneNumber }}
        </div>
      </div>
      <div class="bill-pay-infor ">
        <h6>Thông tin hóa đơn</h6>
        <div class="infor mt-10">
          Tổng tiền: {{ bill.amount | currency_vnd }}
        </div>
        <div class="infor mt-10">
          Khuyến mãi:
        </div>
        <DxNumberBox
          :value.sync="bill.promotion"
          :format="bill.promotion ? '#,### VNĐ' : '#,###'"
          :min="0"
        />
      </div>
      <div class="bill-pay-infor ">
        <h6>Thông tin thanh toán</h6>
        <div class="infor mt-10">
          Số tiền phải trả: {{ (bill.amount - bill.promotion) | currency_vnd }}
        </div>
        <div class="infor d-flex">
          <div>Thanh toán bằng momo</div>
          <div class="dx-field-value">
            <DxCheckBox :value.sync="momoPay" />
          </div>
        </div>
        <div v-if="!momoPay">
          <div class="infor mt-10">
            Khách hàng đưa:
          </div>
          <DxNumberBox
            :value.sync="customerPay"
            :format="customerPay ? '#,### VNĐ' : '#,###'"
            :min="0"
          />
          <div class="infor mt-10">
            Số tiền trả lại:
            {{
              0 >= customerPay - bill.amount + bill.promotion
                ? 0
                : (customerPay - bill.amount + bill.promotion) | currency_vnd
            }}
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn vue-button-primary mt-auto"
        @click="onConfirmClicked()"
      >
        Thanh toán
      </button>
    </div>
    <div v-if="customerAdd">
      <DxPopup
        :visible="customerAdd"
        :drag-enabled="false"
        :show-title="true"
        :width="500"
        :height="310"
        :showCloseButton="false"
      >
        <DxToolbarItem text="Thêm khách hàng" location="before">
        </DxToolbarItem>
        <DxToolbarItem
          widget="dxButton"
          :options="closeButton"
          location="after"
        >
        </DxToolbarItem>
        <div class="popup-text w-100">
          <field label="Số điện thoại" required>
            <DxTextBox :value.sync="customer.phoneNumber" />
          </field>
          <field label="Tên khách hàng" required>
            <DxTextBox :value.sync="customer.customerName" />
          </field>
        </div>
        <div class="popup-event mt-20 pr-30">
          <button
            type="button"
            class="btn vue-button-secondary"
            style="margin-left: 15px"
            @click="onCreateCustomerClicked()"
          >
            Thoát
          </button>
          <button
            type="button"
            class="btn vue-button-primary"
            style="margin-left: 15px"
            @click="onCreateCustomer()"
          >
            Thêm
          </button>
        </div>
      </DxPopup>
    </div>
  </div>
</template>

<script>
import billProduct from "@/assets/json/bill-product.json";
import productAPI from "@/api/components/Product/ProductAPI.js";
import customerAPI from "@/api/components/Customer/CustomerAPI.js";
import billAPI from "@/api/components/Bill/BillAPI.js";
import notify from "devextreme/ui/notify";

export default {
  data() {
    return {
      customer: {
        customerName: "",
        phoneNumber: "",
      },
      products: null,
      customers: null,
      customerPay: 0,
      momoPay: false,
      customerAdd: false,
      billProductHeader: billProduct.header,
      customerSearchParam: "",
      payloadProduct: {
        pageSize: 5,
        offSet: 0,
        param: "",
        filter: [],
      },
      payloadCustomer: {
        pageSize: 5,
        offSet: 0,
        param: "",
        filter: [],
      },
      closeButton: {
        type: "close",
        icon: "close",
        onClick: () => {
          this.onCreateCustomerClicked();
        },
      },
      bill: {
        billProducts: [],
        customer: {
          id: 0,
          customerName: "",
          phoneNumber: "",
        },
        amount: 0,
        promotion: 0,
      },

      billSearchVisible: false,
      billCustomerSearchVisible: false,
    };
  },
  methods: {
    // lấy dữ liệu từ serve
    async getAllProduct() {
      const response = await productAPI.paging(this.payloadProduct);

      this.products = { ...response?.data };
    },
    async onCreateCustomer() {
      await customerAPI.insert(this.customer);
      this.getAllCustomer();
      this.onCreateCustomerClicked();
      this.onSelectCustomer(this.customer);
    },
    onCreateCustomerClicked() {
      this.customerAdd = !this.customerAdd;
    },
    async getAllCustomer() {
      const response = await customerAPI.paging(this.payloadCustomer);
      this.customers = { ...response?.data };
    },
    toggleBillSearch() {
      this.billSearchVisible = !this.billSearchVisible;
    },
    toggleBillCustomerSearch() {
      this.billCustomerSearchVisible = !this.billCustomerSearchVisible;
    },

    onSelectProduct(e) {
      this.payloadProduct.param = "";
      var product = { ...e };
      product.quantityBuy = 1;

      var index = this.bill.billProducts.findIndex(
        (element) => element.productCode == e.productCode
      );
      if (index == -1) {
        this.bill.billProducts.push(product);
        this.bill.amount = this.bill.amount + product.priceOut;
      } else if (
        this.bill.billProducts[index].quantityBuy <
        this.bill.billProducts[index].quantity
      ) {
        this.bill.billProducts[index].quantityBuy =
          this.bill.billProducts[index].quantityBuy + 1;
        this.bill.amount =
          this.bill.amount + this.bill.billProducts[index].priceOut;
      } else alert("ERROR: trong kho chỉ còn " + e.quantity + " sản phẩm");
      this.billSearchVisible = !this.billSearchVisible;
    },
    onHandleQuantityBuy(data) {
      this.bill.amount =
        this.bill.amount -
        this.bill.billProducts[data.rowIndex].priceOut *
          this.bill.billProducts[data.rowIndex].quantityBuy;
      this.bill.billProducts[data.rowIndex].quantityBuy = data.value;
      this.bill.amount =
        this.bill.amount +
        this.bill.billProducts[data.rowIndex].priceOut *
          this.bill.billProducts[data.rowIndex].quantityBuy;
    },
    onSelectCustomer(e) {
      this.payloadCustomer.filter = [];
      this.customerSearchParam = "";

      this.bill.customer = { ...e };
      this.billCustomerSearchVisible = !this.billCustomerSearchVisible;
    },
    searchCustomer() {
      if (this.customerSearchParam == "") this.payloadCustomer.filter = [];
      else if (isNaN(this.customerSearchParam)) {
        this.payloadCustomer.filter.push({
          type: "10",
          value1: this.customerSearchParam,
          value2: "",
          name: "customerName",
        });
      } else {
        this.payloadCustomer.filter.push({
          type: "10",
          value1: this.customerSearchParam,
          value2: "",
          name: "phoneNumber",
        });
      }

      this.getAllCustomer();
    },
    async onConfirmClicked() {
      if (!this.bill.customer.id) {
        notify("Mục khách hàng không được để trống", "error", 2000);
      } else if (!this.bill.billProducts[0]) {
        notify("Mục sản phẩm không được để trống", "error", 2000);
      } else {
        var product = {};
        this.bill.billProducts.forEach((e) => {
          product[e.id] = {
            price: e.priceOut,
            quantity: e.quantityBuy,
          };
        });

        var bill = {
          customerId: this.bill.customer.id,
          customerName: this.bill.customer.customerName,
          amount: this.bill.amount,
          promotion: this.bill.promotion,
          product: JSON.stringify(product),
        };
        if (!this.momoPay) {
          billAPI.insert(bill);
          window.location.replace(
            "http://localhost:8080/success?errorCode=0&message=Success"
          );
        } else {
          var res = await billAPI.payMomo(bill);
          window.location.replace(res.payUrl);
          console.log(res);
        }
      }
    },
  },
  async created() {
    this.products = null;
    await this.getAllCustomer();
    await this.getAllProduct();
  },
};
</script>

<style scoped>
@import "~@/assets/styles/views/bill.css";
</style>

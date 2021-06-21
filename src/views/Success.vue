<template>
  <div>
    <div
      style="height:500px;text-align:center"
      class="d-flex justify-content-center align-items-center pt-100"
    >
      <div
        class="justify-content-center align-items-center "
        v-if="errorCode != 0"
      >
        <div class="icon-error ml-50 mb-20"></div>
        <div>{{ message }}</div>
        <div>Vui lòng ấn trở về để quay lại trang thanh toán</div>
      </div>

      <div
        class=" justify-content-center align-items-center"
        v-if="errorCode == 0"
      >
        <div class="icon-success ml-50 mb-20"></div>
        <div>{{ message }}</div>
        <div>Vui lòng ấn trở về để quay lại trang thanh toán</div>
      </div>
    </div>
    <router-link
      class="btn vue-button-secondary ml-auto mt-50 mr-100 "
      to="/bill"
      tag="button"
    >
      Trở về
    </router-link>
  </div>
</template>

<script>
import billAPI from "@/api/components/Bill/BillAPI.js";
export default {
  data() {
    return {
      errorCode: 0,
      message: "",
    };
  },
  created() {
    this.errorCode = this.$route.query.errorCode;
    this.message = this.$route.query.localMessage;
    if (this.errorCode != 0) {
      var products = JSON.parse(localStorage.getItem("products"));
      billAPI.updateQuantity(products);
      var bill = {
        id: this.$route.query.orderId,
        status: "2",
        description: this.$route.query.localMessage,
      };
      billAPI.update(this.$route.query.orderId, bill);
      localStorage.removeItem("products");
    }
  },
};
</script>

<style scoped>
.icon-error {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-image: url("../assets/icons/error.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.icon-success {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-image: url("../assets/icons/success.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>

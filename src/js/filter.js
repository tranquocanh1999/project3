import moment from "moment";
import Vue from "vue";
import VueCurrencyFilter from "vue-currency-filter";

Vue.filter("date", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

Vue.filter("employeePosition", function(value) {
  if (value == 1) {
    return "Nhân viên bán hàng";
  }
  if (value == 2) {
    return "Nhân viên kho";
  }
});

Vue.filter("employeeStatus", function(value) {
  if (value == 1) {
    return "Đang làm việc";
  }
  if (value == 2) {
    return "Thử việc";
  }
  if (value == 3) {
    return "Nghỉ làm";
  }
});

Vue.filter("billStatus", function(value) {
  if (value == 1) {
    return "Đơn đã được giao";
  }
  if (value == 2) {
    return "Đã hủy đơn";
  }
});
Vue.filter("productCategory", function(value) {
  if (value == 1) {
    return "Quần";
  }
  if (value == 2) {
    return "Áo";
  }
  if (value == 3) {
    return "Mũ";
  }
});
Vue.use(VueCurrencyFilter, [
  {
    // default name 'currency'
    symbol: "$",
    thousandsSeparator: ",",
    fractionCount: 2,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
    avoidEmptyDecimals: "",
  },
  {
    // default name 'currency_2'
    name: "currency_vnd",
    symbol: "VND",
    thousandsSeparator: " ",
    fractionCount: 2,
    fractionSeparator: " ",
    symbolPosition: "back",
    symbolSpacing: false,
    avoidEmptyDecimals: " ",
  },
]);

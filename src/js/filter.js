import moment from 'moment';
import Vue from "vue";

Vue.filter('date', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
})

Vue.filter('employeePosition', function(value) {
    if (value == 1) {
        return "Nhân viên bán hàng"
    }
    if (value == 2) {
        return "Nhân viên kho"
    }
})
Vue.filter('employeeStatus', function(value) {
    if (value == 1) {
        return "Đang làm việc"
    }
    if (value == 2) {
        return "Thử việc"
    }
    if (value == 3) {
        return "Nghỉ làm"
    }
})
Vue.filter('productCategory', function(value) {
    if (value == 1) {
        return "Quần"
    }
    if (value == 2) {
        return "Áo"
    }
    if (value == 3) {
        return "Mũ"
    }
})
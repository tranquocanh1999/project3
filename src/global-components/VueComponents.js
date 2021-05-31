import Vue from 'vue'

import VueButton from '@/components/button/VueButton.vue';
Vue.component(VueButton.name, VueButton)
import VueGrid from '@/components/grid/VueGrid.vue';
Vue.component(VueGrid.name, VueGrid)
import List from '@/components/list/list.vue';
Vue.component(List.name, List)
import VueFilter from '@/components/filter/VueFilter';
Vue.component(VueFilter.name, VueFilter)
import VueFilterItem from '@/components/filter/VueFilterItem';
Vue.component(VueFilterItem.name, VueFilterItem)
import ConfirmPopup from '@/components/confirm/confirm-popup.vue';
Vue.component(ConfirmPopup.name, ConfirmPopup)
import EmployeeDetail from '@/views/admin/employeeDetail';
Vue.component(EmployeeDetail.name, EmployeeDetail)
import ProductDetail from '@/views/inventory-management/products/productDetail.vue';
Vue.component(ProductDetail.name, ProductDetail)
import ImageInput from '@/components/image-input/image-input';
Vue.component(ImageInput.name, ImageInput)
import Field from '@/components/field/field';
Vue.component(Field.name, Field)
import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)
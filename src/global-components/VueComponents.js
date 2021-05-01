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
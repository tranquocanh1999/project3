import Vue from 'vue'


import VueButton from '@/components/button/VueButton.vue';
Vue.component(VueButton.name, VueButton)

import VueGrid from '@/components/grid/VueGrid.vue';
Vue.component(VueGrid.name, VueGrid)

import List from '@/views/list';
Vue.component(List.name, List)

import VueFilter from '@/components/filter/VueFilter';
Vue.component(VueFilter.name, VueFilter)
import VueFilterItem from '@/components/filter/VueFilterItem';
Vue.component(VueFilterItem.name, VueFilterItem)
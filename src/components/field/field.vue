<template>
  <div class="dx-field d-block mt-10" :class="{ 'd-flex': flex }">
    <div class="dx-field-label" :class="{ 'd-flex w-50': flex }">
      {{ label }} <span v-if="required" style="color:red">*</span>
      <div v-if="flex">:</div>
    </div>
    <div class="dx-field-value" :class="[messageErr === '' ? '' : 'error']">
      <slot></slot>
      <div
        class="validate-icon"
        :id="targetID"
        v-if="targetID !== ''"
        v-show="messageErr !== ''"
        @mouseenter="toggleDefault"
        @mouseleave="toggleDefault"
      ></div>
      <DxTooltip
        v-if="targetID !== ''"
        :visible="visible"
        :close-on-outside-click="false"
        :position="'top'"
        :target="'#'.concat(targetID)"
      >
        <div class="messageErr">{{ messageErr }}</div>
      </DxTooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "field",
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    targetID: {
      type: String,
      default: "",
    },
    test: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    messageErr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toggleDefault() {
      this.visible = !this.visible;
    },
  },
  computed: {},
};
</script>

<style scoped>
.dx-field-value-static,
.dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
  width: 90%;
}</style
>>

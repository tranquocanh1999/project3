<template>
  <div>
    <h2 class="content-block">Home</h2>
    <div class="content-block">
      Đây là trang chủ của cừa hàng
      <button @click="click">click</button>
      <div v-if="url !== ''"><qr-code :text="url"></qr-code></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  methods: {
    click() {
      console.log(this.url);
    },
  },
};
</script>

<style lang="scss">
.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
</style>

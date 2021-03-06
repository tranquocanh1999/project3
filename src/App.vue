<template>
  <div id="root">
    <div :class="cssClasses">
      <router-view
        name="layout"
        :title="title"
        :is-x-small="screen.isXSmall"
        :is-large="screen.isLarge"
      >
        <div class="content">
          <router-view name="content" />
        </div>
      </router-view>
    </div>
    <confirm></confirm>
  </div>
</template>

<script>
import { sizes, subscribe, unsubscribe } from "./utils/media-query";

function getScreenSizeInfo() {
  const screenSizes = sizes();

  return {
    isXSmall: screenSizes["screen-x-small"],
    isLarge: screenSizes["screen-large"],
    cssClasses: Object.keys(screenSizes).filter((cl) => screenSizes[cl]),
  };
}

export default {
  name: "app",
  data() {
    return {
      title: this.$appInfo.title,
      screen: getScreenSizeInfo(),
    };
  },
  computed: {
    cssClasses() {
      return ["app"].concat(this.screen.cssClasses);
    },
  },
  methods: {
    screenSizeChanged() {
      this.screen = getScreenSizeInfo();
    },
  },

  mounted() {
    subscribe(this.screenSizeChanged);
  },

  beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
  },

  components: {},
};
</script>

<style lang="scss">
@import "./assets/styles/root.css";
@import "./assets/scss/root.scss";
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
}

#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  @import "./themes/generated/variables.base.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
</style>

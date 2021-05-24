<template>
  <div class="image-input">
    <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>
    <input ref="fileInput" type="file" @input="pickFile" accept="image/*" />
    <div class="mt-20" style="font-weight:500">Nhấp để đổi ảnh đại diện</div>
  </div>
</template>
<script>
export default {
  name: "image-input",
  data() {
    return {
      previewImage: require("@/assets/img/blank-profile-picture-973460_640.png"),
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
};
</script>

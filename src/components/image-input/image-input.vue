<template>
  <div class="image-input">
    <div
      class="imagePreviewWrapper"
      :style="{
        'background-image': `url(${previewImage ? previewImage : value})`,
      }"
      @click="selectImage"
    ></div>
    <input ref="fileInput" type="file" @input="pickFile" accept="image/*" />
    <div
      class="mt-20 text-center d-flex justify-content-center "
      style="font-weight:500"
    >
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: "image-input",
  props: {
    value: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    fileUpload: {
      type: File,
      default: null,
    },
  },
  data() {
    return {
      previewImage: "",
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
        this.$emit("update:fileUpload", file[0]);
        this.$emit("update:isChange", true);
      }
    },
  },
};
</script>

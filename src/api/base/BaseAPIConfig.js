import APIConfig from "@/api/config/APIConfig.js";
import axios from "axios";
import confirm from "@/js/confirm.js";

var BaseAPIConfig = axios.create({
  baseURL: APIConfig,
  headers: { "Content-type": "application/json" },
});

BaseAPIConfig.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function(error) {
    console.log(error.response?.status);
    if (error.response?.status == 400) {
      return error.response;
    }

    confirm.openConfirm({
      type: "alert",
      title: "Thông báo",
      text:
        error.response?.data.userMsg[0] || "Có lỗi xảy ra vui lòng liên hệ TQA",
      buttonConfirm: "",
      buttonCancel: "cancel",
    });
  }
);

export default BaseAPIConfig;

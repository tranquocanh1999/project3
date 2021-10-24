import BaseAPI from "@/api/base/BaseAPI.js";
import BaseAPIConfig from "@/api/base/BaseAPIConfig.js";

class BillAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "Bill";
  }

  /**
   *
   * @param {*} body
   * @returns
   */
  payMomo(body) {
    this.user = JSON.parse(localStorage.getItem("user"));
    return BaseAPIConfig.post(`${this.controler}/pay-momo`, {
      ...body,
      CreateBy: this.user.fullName,
    });
  }

  /**
   *
   * @param {*} body
   * @returns
   */
  updateQuantity(body) {
    return BaseAPIConfig.post(`${this.controler}/update-quantity`, body);
  }
}

export default new BillAPI();

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
    return BaseAPIConfig.post(`${this.controler}/pay-momo`, body);
  }
}

export default new BillAPI();

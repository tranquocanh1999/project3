import BaseAPI from "@/api/base/BaseAPI.js";

class CustomerAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "Customer";
  }
}

export default new CustomerAPI();

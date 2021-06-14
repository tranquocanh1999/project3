import BaseAPI from "@/api/base/BaseAPI.js";
import BaseAPIConfig from "@/api/base/BaseAPIConfig.js";

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "Employees";
  }

  /**
   * Phương thức lấy tất cả dữ liệu
   */
  login(email, password) {
    return BaseAPIConfig.get(
      `${this.controler}/login?email=${email}&password=${password}`
    );
  }
}

export default new EmployeeAPI();

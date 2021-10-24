import BaseAPI from "@/api/base/BaseAPI.js";
import BaseAPIConfig from "@/api/base/BaseAPIConfig.js";

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "Employees";
  }

  login(email, password) {
    return BaseAPIConfig.get(
      `${this.controler}/login?email=${email}&password=${password}`
    );
  }

  /**
   * Phương thức lấy tất cả dữ liệu
   */
  resetPassword(email) {
    return BaseAPIConfig.get(`${this.controler}/forgotPassword?email=${email}`);
  }

  /**
   * Phương thức lấy tất cả dữ liệu
   */
  changePassword(email, oldPass, newPass) {
    return BaseAPIConfig.get(
      `${this.controler}/changePass?email=${email}&oldPass=${oldPass}&newPass=${newPass}`
    );
  }
}

export default new EmployeeAPI();

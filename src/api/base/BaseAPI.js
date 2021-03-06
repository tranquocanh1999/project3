import BaseAPIConfig from "@/api/base/BaseAPIConfig.js";

export default class BaseAPI {
  user = "";

  constructor() {
    this.controler = null;
  }
  /**
   * Phương thức lấy tất cả dữ liệu
   */
  getAll() {
    return BaseAPIConfig.get(`${this.controler}`);
  }
  /**
   * Phương thức lấy dữ liệu theo id
   */
  getById(id) {
    return BaseAPIConfig.get(`${this.controler}/${id}`);
  }
  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  paging(payload) {
    return BaseAPIConfig.post(`${this.controler}/paging`, payload);
  }

  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  filter(payload) {
    return BaseAPIConfig.post(`${this.controler}/filter`, payload);
  }

  /**
   *
   * @param {*} body
   * @returns
   */
  insert(body) {
    this.user = JSON.parse(localStorage.getItem("user"));
    return BaseAPIConfig.post(`${this.controler}`, {
      ...body,
      CreateBy: this.user.fullName,
    });
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   */
  update(id, body) {
    return BaseAPIConfig.put(`${this.controler}/${id}`, body);
  }
  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    return BaseAPIConfig.delete(`${this.controler}/${id}`);
  }
  deletes(id) {
    return BaseAPIConfig.post(`${this.controler}/multiple-delete`, id);
  }
  /**
   * Phương thức lấy dữ liệu theo ids
   */
  getByIds(id) {
    return BaseAPIConfig.get(`${this.controler}/ids/${id}`);
  }
}

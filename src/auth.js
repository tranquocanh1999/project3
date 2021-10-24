import EmployeeAPI from "./api/components/Employee/EmployeeAPI";

export default {
  _user: null,
  loggedIn() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) this._user = user;
    return !!this._user;
  },

  async logIn(email, password) {
    // try {
    // Send request
    var response = await EmployeeAPI.login(email, password);
    this._user = response;
    if (response.status == 400) {
      return {
        isOk: false,
        message: response.data.userMsg[0],
      };
    }
    localStorage.setItem("user", JSON.stringify(this._user));
    return {
      isOk: true,
      data: this._user,
    };
  },

  async find(id) {
    // try {
    // Send request
    var response = await EmployeeAPI.getById(id);
    this._user = response;
    if (response.status == 400) {
      return {
        isOk: false,
        message: response.data.userMsg[0],
      };
    }
    localStorage.setItem("user", JSON.stringify(this._user));
    return {
      isOk: true,
      data: this._user,
    };
  },

  async logOut() {
    localStorage.removeItem("user");
    this._user = null;
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      var response = await EmployeeAPI.resetPassword(email);
      if (response.status === 400) {
        return {
          isOk: false,
          message: "Email không tồn tại.",
        };
      }
      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Cài lại mật khẩu thất bại",
      };
    }
  },

  async changePassword(oldPass, newPass) {
    try {
      var response = await EmployeeAPI.changePassword(
        this._user.email,
        oldPass,
        newPass
      );
      if (response.status === 400) {
        return {
          isOk: false,
          // message: "Email không tồn tại.",
        };
      }

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to change password",
      };
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to create account",
      };
    }
  },
};

const defaultUser = {
  email: "sandra@example.com",
  avatarUrl:
    "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
};
import EmployeeAPI from "./api/components/Employee/EmployeeAPI";

export default {
  _user: defaultUser,
  loggedIn() {
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
    return {
      isOk: true,
      data: this._user,
    };
  },

  async logOut() {
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
      console.log(email);

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password",
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

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

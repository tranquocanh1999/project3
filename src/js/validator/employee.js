/* eslint-disable no-useless-escape */
export default function validator(employee) {
    var errMsg = {
        fullName: "",
        taxcode: "",
        email: "",
        identityCardNumber: "",
        phoneNumber: ""
    };
    var isValid = true
    if (employee.phoneNumber === '') {
        isValid = false
        errMsg.phoneNumber = "Số điện thoại không được để trống";
    } else if (validatePhoneNumber(employee.phoneNumber)) {
        isValid = false;
        errMsg.phoneNumber = "Số điện thoại không đúng định dạng"
    }
    if (employee.gender === '') {
        isValid = false
        errMsg.gender = "Giới tính không được để trống";
    }
    if (employee.fullName === '') {
        isValid = false
        errMsg.fullName = "Tên nhân viên không được để trống";
    }
    if (employee.taxcode === '') {
        isValid = false
        errMsg.taxcode = "Mã số thuế không được để trống";
    }
    if (employee.email === '') {
        isValid = false;
        errMsg.email = "Email không được để trống";
    } else if (validateEmail(employee.email)) {
        isValid = false;
        errMsg.email = "Email không đúng định dạng"
    }
    if (employee.identityCardNumber === '') {
        isValid = false;
        errMsg.identityCardNumber = "số CMND/Thẻ căn cước được để trống";
    }

    return { errMsg: errMsg, isValid: isValid };
}

function validateEmail(email) {
    var isValid = true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        isValid = false;
    }
    return isValid;
}

function validatePhoneNumber(number) {
    var isValid = true;
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(number)) {
        isValid = false;
    }
    return isValid;
}
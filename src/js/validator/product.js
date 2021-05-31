/* eslint-disable no-useless-escape */
export default function validator(product) {
    var errMsg = {
        productName: "",
        priceOut: "",
        category: "",
        priceIn: "",
    };
    var isValid = true
    if (product.productName === '') {
        isValid = false
        errMsg.productName = "Tên sản phẩm không được để trống";
    }
    if (product.priceOut === '' | product.priceOut === 0) {
        isValid = false
        errMsg.priceOut = "Giá nhập không được để trống";
    }

    if (product.priceIn === '' | product.priceIn === 0) {
        isValid = false
        errMsg.priceIn = "Giá bán không được để trống";
    }

    if (product.category === '') {
        isValid = false
        errMsg.category = "Loại sản phẩm không được để trống";
    }


    return { errMsg: errMsg, isValid: isValid };
}
import BaseAPI from '@/api/base/BaseAPI.js';

class ReceiptSaleAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = "Receipt-sales";
    }
}

export default new ReceiptSaleAPI();
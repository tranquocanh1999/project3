import BaseAPI from '@/api/base/BaseAPI.js';

class ProductAPI extends BaseAPI {
    constructor(){
        super();
        this.controler = "Product";
    }
}

export default new ProductAPI();
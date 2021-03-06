import { event } from "@/js/event.js";
class confirm {
  options = {
    type: "",
    title: "",
    text: "",
    buttonConfirm: "",
    buttonCancel: "",
  };

  openConfirm(options){
    
    event.emit("open-confirm",options);
  }

  closeConfirm(options){
    event.emit("close-confirm",options);
  }

  deleteConfirm() {
    this.options.type = "confirm";
    this.options.text = "Bạn có muốn xóa bản ghi này không?";
    this.options.buttonConfirm = "delete";
    this.options.buttonCancel = "cancel";
    return this.options;
  }

  deletesConfirm() {
    this.options.type = "confirm";
    this.options.text = "Bạn có muốn xóa những bản ghi này không?";
    this.options.buttonConfirm = "delete";
    this.options.buttonCancel = "cancel";
    return this.options;
  }
  
  createConfirm() {
    this.options.type = "confirm";
    this.options.text = "Bạn có muốn thêm mới bản ghi này không?";
    this.options.buttonConfirm = "create";
    this.options.buttonCancel = "cancel";
    return this.options;
  }

  discardConfirm(){
    this.options.type = "confirm";
    this.options.text = "Một số thay đổi chưa được lưu. Bạn có muốn thoát không?";
    this.options.buttonConfirm = "apply";
    this.options.buttonCancel = "cancel";
    return this.options; 
  }

  editConfirm() {
    this.options.type = "confirm";
    this.options.text = "Bạn có muốn lưu chỉnh sửa bản ghi này không?";
    this.options.buttonConfirm = "create";
    this.options.buttonCancel = "cancel";
    return this.options;
  }

}

export default new confirm();

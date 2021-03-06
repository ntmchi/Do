var File = require("fs")

// MongoDB
var DbConnection = require('./XL_KET_NOI_MONGODB');

class XL_LUU_TRU {
  Doc_Thong_tin_Dich_vu() {
    var Chuoi_HTML = ""
    var Duong_dan = "index.html"
    if (File.existsSync(Duong_dan))
      Chuoi_HTML = File.readFileSync(Duong_dan)
    return Chuoi_HTML
  }

  async Doc_Thong_tin_Cua_hang() {
    try {
      var db = await DbConnection.Get()
      var Cua_hang = await db.collection("Cua_hang").find({}).toArray()
      return Cua_hang
    } catch (Loi) {
      console.log(Loi)
    }
  }


  async Doc_Thong_tin_Nguoi_dung() {
    try {
      var db = await DbConnection.Get();
      var Nguoi_dung = await db.collection("Nguoi_dung").find({}).toArray()
      return Nguoi_dung
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Doc_Danh_sach() {
    try {
      var db = await DbConnection.Get()
      var Dien_thoai = await db.collection("Quan_ao").find({}).toArray()
      return Dien_thoai
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Doc_Thong_tin_Don_hang() {
    try {
      var db = await DbConnection.Get()
      var Dien_thoai = await db.collection("Don_hang").find({}).toArray()
      return Dien_thoai
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Ghi_moi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {

    try {
      var db = await DbConnection.Get()
      var Kq = await db.collection(Loai_Doi_tuong).insert(Doi_tuong)
      return Kq

    } catch (Loi) {
      console.log(Loi)
    }
  }


  async Cap_nhat_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat) {
    try {
      var db = await DbConnection.Get()

      var Kq = await db.collection(Loai_Doi_tuong).update(Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat)

      return Kq

    } catch (Loi) {
      console.log(Loi);
    }
  }

  async  Xoa_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien) {
    try {
      var db = await DbConnection.Get()
      var Kq = await db.collection(Loai_Doi_tuong).remove(Bieu_thuc_dieu_kien);
      return Kq
    } catch (Loi) {
      console.log(Loi);
    }
  }
}

var Xu_ly = new XL_LUU_TRU()
module.exports = Xu_ly



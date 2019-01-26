// var Dia_chi_Dich_vu = "http://localhost:1000"
// var Dia_chi_Media = "http://localhost:1001"
var Dia_chi_Dich_vu = "https://chintm-quanao-dulieu.herokuapp.com"
var Dia_chi_Media = "https://chintm-quanao-media.herokuapp.com"

function Doc_Danh_sach_Don_hang() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Don_hang`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Danh_sach_Cua_hang() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Cua_hang`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Danh_sach_San_pham() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_San_pham`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_San_pham(San_pham)
{
    var Chuoi_goi = JSON.stringify(San_pham)    
    var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Ghi_Quan_ao_Moi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)    
    Xu_ly_HTTP.send(Chuoi_goi)
    
    Kq = Xu_ly_HTTP.responseText
    
	return Kq
}

function Sua_San_pham(San_pham)
{
    var Chuoi_goi = JSON.stringify(San_pham)    
    var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Cap_nhat_Quan_ao`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)    
    Xu_ly_HTTP.send(Chuoi_goi)
    
    Kq = Xu_ly_HTTP.responseText
    
	return Kq
}

function Kiem_tra_Dang_nhap()
{
    if (sessionStorage.getItem('DangNhap') == null) {
        document.location.href = 'dang_nhap.html';
    } else {
        dang_nhap = sessionStorage.getItem('DangNhap');
        dang_nhap = JSON.parse(dang_nhap);

        if (dang_nhap.username != 'admin' || dang_nhap.password != 'admin') {
            document.location.href = 'dang_nhap.html';
        }
    }    
}

function Xoa_San_pham(Ma_so)
{
    var Chuoi_goi = JSON.stringify(Ma_so)    
    var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Xoa_Quan_ao`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)    
    Xu_ly_HTTP.send(Chuoi_goi)
    
    Kq = Xu_ly_HTTP.responseText
    
	return Kq
}
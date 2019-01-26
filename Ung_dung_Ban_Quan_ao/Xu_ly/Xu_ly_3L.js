//var Dia_chi_Dich_vu = "http://localhost:1000"
// var Dia_chi_Media = "http://localhost:1001"
var Dia_chi_Dich_vu = "https://chintm-quanao-dulieu.herokuapp.com"
var Dia_chi_Media = "https://chintm-quanao-media.herokuapp.com"

//************** Xử lý Lưu trữ ***********
//var Thu_muc_PDF = "../Tap_tin_PDF"

//=======================================
//Cach 3
// async function Doc_Danh_sach_San_pham() {
//     var Doi_tuong_json = await new Promise((Ket_qua, Loi) => {
//         var Xu_ly_HTTP = new XMLHttpRequest()
//         var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_San_pham`
// 		var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//         Xu_ly_HTTP.onload = () => {
// 			if(Xu_ly_HTTP.responseText!=""){
// 				var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
//             	Ket_qua(Doi_tuong_Kq)
// 			}      
// 		}
// 		Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
// 		Xu_ly_HTTP.send("")
// 	})
//     return Doi_tuong_json
// }

//Cach 2
// function Doc_Danh_sach_San_pham() {
// 	return new Promise((Ket_qua, Loi) => {
// 		var Xu_ly_HTTP = new XMLHttpRequest()
// 		var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_San_pham`
// 		var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//         Xu_ly_HTTP.onload = () => {
// 			if(Xu_ly_HTTP.responseText!=""){
// 				var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
//             	Ket_qua(Doi_tuong_Kq)
// 			}

// 		}
// 		Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
// 		Xu_ly_HTTP.send("")
// 	})
// }

//Cach1
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

function Ghi_Phieu_Dat_hang(Phieu_dat) {
	var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Ghi_Phieu_Dat_hang`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
	var Chuoi_goi = JSON.stringify(Phieu_dat)
	Xu_ly_HTTP.send(Chuoi_goi)
	Kq = Xu_ly_HTTP.responseText
	return Kq
}

function Goi_mail_Khach_hang(noi_dung) {
	var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Goi_thu_Don_hang`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
	var Chuoi_goi = JSON.stringify(noi_dung)
	Xu_ly_HTTP.send(Chuoi_goi)
	Kq = Xu_ly_HTTP.responseText
	return Kq
}

function Khach_hang_Lien_he(noi_dung) {
	var Kq = ""
	var Xu_ly_HTTP = new XMLHttpRequest()
	var Tham_so = `Ma_so_Xu_ly=Goi_thu_Lien_he`
	var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
	Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
	var Chuoi_goi = JSON.stringify(noi_dung)
	Xu_ly_HTTP.send(Chuoi_goi)
	Kq = Xu_ly_HTTP.responseText
	return Kq
}

function Sap_Tang() {
	// Là chuỗi
	Danh_sach_San_pham.sort((a, b) => a.Ten.localeCompare(b.Ten))
	Xuat_Danh_sach(Danh_sach_San_pham, Th_Danh_sach_San_pham)
}
function Sap_Giam() {
	// Là chuỗi
	Danh_sach_San_pham.sort((a, b) => b.Ten.localeCompare(a.Ten))
	Xuat_Danh_sach(Danh_sach_San_pham, Th_Danh_sach_San_pham)
}
function Sap_Tang_Gia() {
	// Là số
	Danh_sach_San_pham.sort((a, b) => {
		return parseInt(a.Don_gia_Ban) - parseInt(b.Don_gia_Ban)
	})
	Xuat_Danh_sach(Danh_sach_San_pham, Th_Danh_sach_San_pham)

}
function Sap_Giam_Gia() {
	// Là số
	Danh_sach_San_pham.sort((a, b) => {
		return parseInt(b.Don_gia_Ban) - parseInt(a.Don_gia_Ban)
	})
	Xuat_Danh_sach(Danh_sach_San_pham, Th_Danh_sach_San_pham)
}

function Loc_gia(range) {	
	var ds = [];	
	if (range == '0') {
		ds = Danh_sach_San_pham;
	} else {
		var thanh_phan_con = range.split("-")		
		ds = Danh_sach_San_pham.filter(x => parseFloat(x.Don_gia_Ban) >= parseFloat(thanh_phan_con[0]) && parseFloat(x.Don_gia_Ban) <= parseFloat(thanh_phan_con[1]))
	}

	Xuat_Danh_sach(ds, Th_Danh_sach_San_pham)
}

function remove_unicode(unicode_string) {
	var str = unicode_string;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
	str = str.replace(/ + /g, " ");
	str = str.trim();
	return str;
}

function KeyCode(event) {
	if (event.keyCode == 13) {
		var noi_dung = Th_gtTim.value.trim()
		noi_dung = remove_unicode(noi_dung)
		console.log(noi_dung)
		//window.location = `Tim_kiem.html?search=${event.target.value}`
		window.location = `Tim_kiem.html?search=${noi_dung}`
	}
}


function Xuat_Thong_tin_San_pham_Chon(Danh_sach_San_pham_Chon) {
	var the_hien = document.createElement("div")
	the_hien.setAttribute("class", `header-cart flex-col-l p-l-65 p-r-25`)
	Th_Gio_hang_Slide.appendChild(the_hien)
	var Chuoi_HTML = `
	<div class="header-cart-title flex-w flex-sb-m p-b-8">
	<span class="mtext-103 cl2">
		Giỏ Hàng Của Bạn
	</span>

	<div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
		<i class="zmdi zmdi-close"></i>
	</div>
</div>

<div class="header-cart-content flex-w js-pscroll">
	<ul class="header-cart-wrapitem w-full">`
	Thanh_tien = 0
	if (Danh_sach_San_pham_Chon !== null && Danh_sach_San_pham_Chon.length > 0) {
		Danh_sach_San_pham_Chon.forEach(San_pham => {
			Thanh_tien += San_pham.So_luong * San_pham.Don_gia
			Chuoi_HTML += `<li class="header-cart-item flex-w flex-t m-b-12">
		<div class="header-cart-item-img">
			<img src="${San_pham.Hinh}" alt="IMG">
		</div>

		<div class="header-cart-item-txt p-t-8">
			<a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
				${San_pham.Ten_san_pham}<br><small>${San_pham.Mau_sac} / ${San_pham.Size}</small>
			</a>

			<span class="header-cart-item-info">
			${San_pham.So_luong} x ${Tao_Chuoi_The_hien_So_nguyen_duong(San_pham.Don_gia)} 
			</span>
		</div>
	</li>`
		})
	}
	Chuoi_HTML += `</ul>

			<div class="w-full">
				<div class="header-cart-total w-full p-tb-40">
					Tổng cộng: ${Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_tien)}đ
				</div>

				<div class="header-cart-buttons flex-w w-full">
					<a href="Gio_hang.html" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
						Xem giỏ hàng
					</a>

					<a href="Gio_hang.html" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10">
						Thanh toán
					</a>
				</div>
			</div>
		</div>
	`
	the_hien.innerHTML = Chuoi_HTML
	return the_hien
}


function Xuat_Danh_sach(Danh_sach_San_pham, Th_Cha) {
	$('#Th_Danh_sach_San_pham').html('');
	$('#Th_Danh_sach_San_pham').css('height', 'auto');

	Danh_sach_San_pham.forEach(Quan_ao => {
		Tao_The_hien_San_pham(Quan_ao, Th_Cha)
		Tao_modal(Quan_ao, Th_Modal_Noi_dung)
	});
}

function Tao_chuoi_HTML_Hinh_San_pham_Chi_tiet(San_pham) {
	Chuoi_HTML = ""
	Danh_sach_Hinh_chi_tiet = San_pham.Danh_sach_Hinh_anh
	Danh_sach_Hinh_chi_tiet.forEach(hinh => {
		Chuoi_HTML += `
        <div class="item-slick3" data-thumb="${Dia_chi_Media}/images/${hinh.Hinh_anh}">
        	<div class="wrap-pic-w pos-relative">
        		<img src="${Dia_chi_Media}/images/${hinh.Hinh_anh}" alt="IMG-PRODUCT">
        		<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${Dia_chi_Media}/images/${hinh.Hinh_anh}">
					<i class="fa fa-expand">
					</i>
				</a>
			</div>
		</div>
        `
	})
	return Chuoi_HTML
}

function Tao_chuoi_Thong_tin_San_pham_Chi_tiet(San_pham) {
	Chuoi_HTML = `
        <h4 class="mtext-105 cl2 js-name-detail p-b-14">
            ${San_pham.Ten}
        </h4>
        <span class="mtext-106 cl2" id="Th_Don_gia">
            ${Tao_Chuoi_The_hien_So_nguyen_duong(San_pham.Don_gia_Ban)}₫
        </span>
        <p class="stext-102 cl3 p-t-23">
            Miêu tả: ${San_pham.Mo_ta}
        </p>
        <p class="stext-102 cl3 p-t-23">
            Chất liệu: ${San_pham.Chat_lieu}
		</p>`
	return Chuoi_HTML
}

function Tao_chuoi_Mau_sac_San_pham(San_pham) {
	var Mau_sac = [];

	$.map(San_pham.Danh_sach_Chi_tiet, function (val, i) {
		if ($.inArray(val.Mau_sac, Mau_sac) == -1) {
			Mau_sac.push(val.Mau_sac);
		}
	})

	Chuoi_HTML = ""

	Mau_sac.forEach(chi_tiet => {
		Chuoi_HTML += `<option value="${chi_tiet}">${chi_tiet}</option>`
	})
	return Chuoi_HTML
}

function Tao_modal(San_pham, Th_Cha) {
	var the_hien = document.createElement("div")
	the_hien.setAttribute("class", `wrap-modal1 js-modal1 p-t-60 p-b-20`)
	the_hien.setAttribute("id", `${San_pham.Ma_so}`)
	Th_Cha.appendChild(the_hien)
	var Chuoi_HTML = `
    	<div class="overlay-modal1 js-hide-modal1"></div>
		<div class="container">
			<div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
				<button class="how-pos3 hov3 trans-04 js-hide-modal1">
					<img src="${Dia_chi_Media}/images/icons/icon-close.png" alt="CLOSE">
				</button>
				<div class="row">
				<div class="col-md-6 col-lg-7 p-b-30">
				<div class="p-l-25 p-r-30 p-lr-0-lg">
					<div class="wrap-slick3 flex-sb flex-w">
						<div class="wrap-slick3-dots"></div>
						<div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
						<div class="slick3 gallery-lb">`
	Chuoi_HTML_Hinh_anh = Tao_chuoi_HTML_Hinh_San_pham_Chi_tiet(San_pham)
	Chuoi_HTML += Chuoi_HTML_Hinh_anh
	Chuoi_HTML += `             </div>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-lg-5 p-b-30">
				<div class="p-r-50 p-t-5 p-lr-0-lg">`
	Chuoi_HTML_San_pham_Info = Tao_chuoi_Thong_tin_San_pham_Chi_tiet(San_pham)
	Chuoi_HTML += Chuoi_HTML_San_pham_Info
	Chuoi_HTML += `			<div class="p-t-33">
						<div class="flex-w flex-r-m p-b-10">
							<div class="size-203 flex-c-m respon6">
								Size
							</div>
							<div class="size-204 respon6-next">
								<div class="rs1-select2 bor8 bg0">
									<select class="js-select2 ma-size" name="time">
										<option>S</option>
										<option>M</option>
										<option>L</option>
									</select>
									<div class="dropDownSelect2"></div>
								</div>
							</div>
						</div>
						<div class="flex-w flex-r-m p-b-10">
							<div class="size-203 flex-c-m respon6">
								Màu sắc
							</div>
							<div class="size-204 respon6-next">
								<div class="rs1-select2 bor8 bg0">
									<select class="js-select2 mau-sac" name="time">`
	Chuoi_HTML_Mau_sac = Tao_chuoi_Mau_sac_San_pham(San_pham)
	Chuoi_HTML += Chuoi_HTML_Mau_sac
	Chuoi_HTML += `						</select>
									<div class="dropDownSelect2"></div>
								</div>
							</div>
						</div>
						<div class="flex-w flex-r-m p-b-10">
							<div class="size-204 flex-w flex-m respon6-next">
								<div class="wrap-num-product flex-w m-r-20 m-tb-10">
									<div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
										<i class="fs-16 zmdi zmdi-minus"></i>
									</div>
									<input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1">
									<div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
										<i class="fs-16 zmdi zmdi-plus"></i>
									</div>
								</div>
								<button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
									Thêm vào giỏ hàng
								</button>
								<input type="hidden" value="${San_pham.Ma_so}" name="Th_Ma_so" />
								<input type="hidden" value="${San_pham.Don_gia_Ban}" name="Th_Don_gia" />
							</div>
						</div>
					</div>
					<div class="flex-w flex-m p-l-100 p-t-40 respon7">
						<div class="flex-m bor9 p-r-10 m-r-11">
							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
								<i class="zmdi zmdi-favorite"></i>
							</a>
						</div>
						<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
							<i class="fa fa-facebook"></i>
						</a>
						<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
							<i class="fa fa-twitter"></i>
						</a>
						<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
							<i class="fa fa-google-plus"></i>
						</a>
					</div>
				</div>
			</div>	
				</div>
			</div>
		</div>
	`
	the_hien.innerHTML = Chuoi_HTML;
	return the_hien
}

function Tao_chuoi_HTML_Thong_tin_Cua_hang(Cua_hang, Th_Cha) {
	var the_hien = document.createElement("div")
	the_hien.setAttribute("class", `size-100 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md thong-tin-cua-hang`)
	the_hien.setAttribute("id", `CH_${Cua_hang.Ma_cua_hang}`)
	the_hien.setAttribute("style", `display:none`)
	Th_Cha.appendChild(the_hien)
	var Chuoi_HTML = `
		<div class="flex-w w-full p-b-42">
			<h4 class="ltext-108">${Cua_hang.Ten}
			</h4>
		</div>
		<div class="flex-w w-full p-b-42">
			<span class="fs-18 cl5 txt-center size-211">
				<span class="lnr lnr-map-marker"></span>
			</span>
			<div class="size-212 p-t-2">
				<span class="mtext-110 cl2">
					Địa Chỉ
				</span>
				<p class="stext-115 cl6 size-213 p-t-18">
					${Cua_hang.Dia_chi}
				</p>
			</div>
		</div>
		<div class="flex-w w-full p-b-42">
			<span class="fs-18 cl5 txt-center size-211">
				<span class="lnr lnr-phone-handset"></span>
			</span>
			<div class="size-212 p-t-2">
				<span class="mtext-110 cl2">
					Số Điện Thoại
				</span>
				<p class="stext-115 cl1 size-213 p-t-18">
					${Cua_hang.Dien_thoai}
				</p>
			</div>
		</div>
		<div class="flex-w w-full">
			<span class="fs-18 cl5 txt-center size-211">
				<span class="lnr lnr-envelope"></span>
			</span>
			<div class="size-212 p-t-2">
				<span class="mtext-110 cl2">
					Email
				</span>
				<p class="stext-115 cl1 size-213 p-t-18">
					contact@example.com
				</p>
			</div>
		</div>
    `
	the_hien.innerHTML = Chuoi_HTML;
	return the_hien
}

function Tao_The_hien_San_pham(San_pham, Th_Cha) {
	var the_hien = document.createElement("div")
	the_hien.setAttribute("class", `col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item DanhMuc_${San_pham.Nhom_Danh_muc.Ma_so}`)
	Th_Cha.appendChild(the_hien)
	data = JSON.stringify(San_pham)
	var Chuoi_HTML = `
    <div class="block2">
        <div class="block2-pic hov-img0">
            <img src="${Dia_chi_Media}/images/${San_pham.Danh_sach_Hinh_anh[0].Hinh_anh}" alt="IMG-PRODUCT">

            <a href="" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" data-target="#${San_pham.Ma_so}" data-id='${San_pham.Ma_so}'>
                Xem nhanh
            </a>
        </div>

        <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l ">
                <a href="San_pham_chi_tiet.html?Ma_so=${San_pham.Ma_so}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${San_pham.Ten.toUpperCase()}
                </a>

                <span class="stext-105 cl3">
                ${Tao_Chuoi_The_hien_So_nguyen_duong(San_pham.Don_gia_Ban)}₫
                </span>
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
                <a href="" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                    <img class="icon-heart1 dis-block trans-04" src="${Dia_chi_Media}/images/icons/icon-heart-01.png" alt="ICON">
                    <img class="icon-heart2 dis-block trans-04 ab-t-l" src="${Dia_chi_Media}/images/icons/icon-heart-02.png" alt="ICON">
                </a>
            </div>
        </div>
    </div>`

	the_hien.innerHTML = Chuoi_HTML;
	return the_hien
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
	var Chuoi_The_hien = ""
	var Chuoi_So_nguyen = So_nguyen.toString()
	var So_Ky_so = Chuoi_So_nguyen.length
	if (So_Ky_so % 3 == 0) {
		for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
			Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
			if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
				Chuoi_The_hien += "."
		}
	} else if (So_Ky_so % 3 == 1) {
		Chuoi_The_hien = Chuoi_So_nguyen[0]
		if (So_Ky_so > 1)
			Chuoi_The_hien += "."
		Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
		for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
			Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
			if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
				Chuoi_The_hien += "."

		}
	} else if (So_Ky_so % 3 == 2) {
		Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
		if (So_Ky_so > 2)
			Chuoi_The_hien += "."
		Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
		for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
			Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
			if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
				Chuoi_The_hien += "."
		}
	}
	return Chuoi_The_hien
}

function Tao_Gio_Hang(gio_hang) {
	Chuoi_HTML = `
    <tr class="table_head">
        <th class="column-1">Sản phẩm</th>
        <th class="column-2"></th>
        <th class="column-3 text-center">Giá tiền</th>
        <th class="column-4 text-center">Số lượng</th>
        <th class="column-5 text-center">Tổng</th>
    </tr>`;

	gio_hang.forEach(item => {
		var thanh_tien = item.Don_gia * item.So_luong;

		Chuoi_HTML +=
			`<tr class="table_row">
            <td class="column-1">
                <div class="how-itemcart1">
                    <img src="${item.Hinh}" alt="IMG">
                </div>
            </td>
            <td class="column-2">${item.Ten_san_pham}<br><small>${item.Mau_sac} / ${item.Size}</small></td>
            <td class="column-3 text-center">${Tao_Chuoi_The_hien_So_nguyen_duong(item.Don_gia)}</td>
            <td class="column-4 text-center">${item.So_luong}</td>
            <td class="column-5 text-center">${Tao_Chuoi_The_hien_So_nguyen_duong(thanh_tien)}đ</td>
        </tr>`;
	});

	return Chuoi_HTML;
}
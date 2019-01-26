var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU")

var Xu_ly_Tham_so = require('querystring')
var Port = normalizePort(process.env.PORT || 1000)
var Du_lieu = {}

var Goi_thu = require("../Xu_ly/XL_GOI_THU_DIEN_TU");
var Goi_SMS = require("../Xu_ly/XL_GOI_TIN_NHAN")
var facebook = require("../Xu_ly/XL_FACEBOOK")

var Danh_sach_Quan_ao = Luu_tru.Doc_Danh_sach()
var Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()
var Nguoi_dung = Luu_tru.Doc_Thong_tin_Nguoi_dung()
var Don_hang = Luu_tru.Doc_Thong_tin_Don_hang()

Danh_sach_Quan_ao.then(Kq => {
    Du_lieu.Danh_sach_Quan_ao = Kq
})
Cua_hang.then(Kq => {
    Du_lieu.Cua_hang = Kq
})
Nguoi_dung.then(Kq => {
    Du_lieu.Nguoi_dung = Kq
})
Don_hang.then(Kq => {
    Du_lieu.Don_hang = Kq
})


var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = "{}"
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "Doc_Danh_sach_San_pham") {
                var Doi_tuong_Kq = {}
                // Cach 1: Clone data
                /*
                // JSON.stringIy doi ra chuoi, sau do parse lai doi tuong json de gan cho Doi_tuong_Kq => go bo tham chieu, khi do delete gia tri o Doi_tuong_Kq ko anh huong den gia tri goc
                Doi_tuong_Kq.Danh_sach_Quan_ao = JSON.parse(JSON.stringify(Du_lieu.Danh_sach_Quan_ao))
                Doi_tuong_Kq.Danh_sach_Quan_ao.forEach(Quan_ao=>{
                    delete Quan_ao.Danh_sach_Phieu_Nhap
                    delete Quan_ao.Danh_sach_Phieu_Ban
                }
                */
                // Cach 2: Clone bang js
                Doi_tuong_Kq.Danh_sach_Quan_ao = []
                Du_lieu.Danh_sach_Quan_ao.forEach(Quan_ao_Goc => {
                    var Quan_ao = Object.assign({}, Quan_ao_Goc)
                    Doi_tuong_Kq.Danh_sach_Quan_ao.push(Quan_ao)
                    delete Quan_ao.Danh_sach_Phieu_Nhap
                    delete Quan_ao.Danh_sach_Phieu_Ban
                })
                //Gan nhau voi tham chieu (=), khi xoa du lieu Doi_tuong_Kq se anh huong den Du_lieu.Cua_hang
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);

            }else if (Ma_so_Xu_ly == "Doc_Danh_sach_Cua_hang") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Cua_hang = Du_lieu.Cua_hang
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);
            }else if (Ma_so_Xu_ly == "Doc_Danh_sach_Don_hang") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Don_hang = Du_lieu.Don_hang
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);
            }else if (Ma_so_Xu_ly == "Goi_tin_Facebook") {
                var Noi_dung = 'Lop JS khai kkkk'
                var kqPromise = facebook.Goi_Thong_bao_Facebook(Noi_dung)
                kqPromise.then(result => {
                    // Truyen cai id nay sang cho client de vao ngay tin da post vi facebook.com/id
                    console.log(result)
                    var id_bai = JSON.parse(result).id
                    console.log(id_bai)

                    Chuoi_Kq = 'OK'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                }).catch(error => {
                    console.log(error)
                    Chuoi_Kq = 'Lỗi'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                })

            } else if (Ma_so_Xu_ly == "Goi_hinh_Facebook") {
                var Tieu_de = `Lop JS`
                var Url_Hinh = `https://i-ngoisao.vnecdn.net/2019/01/08/my-tam-mai-tai-phen-chi-tro-ly-9176-8039-1546936134.jpg`
                var kqPromise = facebook.Goi_hinh_Facebook(Tieu_de, Url_Hinh)
                kqPromise.then(result => {
                    // Truyen cai post id nay sang cho client de vao ngay hinh anh da post vi facebook.com/id
                    console.log(result)
                    post_id_hinh = JSON.parse(result).post_id
                    console.log(post_id_hinh)

                    Chuoi_Kq = 'OK'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                }).catch(error => {
                    console.log(error)
                    Chuoi_Kq = 'Lỗi'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                })

            }else if (Ma_so_Xu_ly == "Goi_Video_Facebook") {
                var Tieu_de = `Lop JS`
                var Url_Hinh = `https://r2---sn-8qj-nboez.googlevideo.com/videoplayback?id=o-ABnwq46mAlFMOzjNq0BtK-xHxNKkSv2Ofyrq4wdwXa8T&dur=202.895&source=youtube&ip=38.126.112.68&key=cms1&requiressl=yes&lmt=1540124515112690&itag=22&ratebypass=yes&ipbits=0&fvip=3&pl=18&expire=1547146407&c=WEB&sparams=dur,ei,expire,id,ip,ipbits,itag,lmt,mime,mip,mm,mn,ms,mv,pl,ratebypass,requiressl,source&ei=R0A3XNK-IovakgaC3ZiYDA&mime=video%2Fmp4&txp=5431432&signature=73486BF8ADD2BFEA2791AD68AC9EA78519B1151F.3A8CCB21A5BA707BD91CC5B904EBF0DA20DC58B9&title=You%27re%20Beautiful%20-%20James%20Blunt%20-%20VietSub%20-%20EngSub&cms_redirect=yes&mip=123.20.53.100&mm=31&mn=sn-8qj-nboez&ms=au&mt=1547124696&mv=m`
                var kqPromise = facebook.Goi_phim_Facebook(Tieu_de, Url_Hinh)
                kqPromise.then(result => {
                    // Truyen cai id nay sang cho client de vao ngay video da post vi facebook.com/id
                    console.log(result)
                    post_id_video = JSON.parse(result).id
                    console.log(post_id_video)

                    Chuoi_Kq = 'OK'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                }).catch(error => {
                    console.log(error)
                    Chuoi_Kq = 'Lỗi'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                })

            } else if (Ma_so_Xu_ly == "Goi_SMS") {
                var so_dien_thoai = "+84909159985"
                var noi_dung = Chuoi_Nhan
                var kqPromise = Goi_SMS.Goi_Tin_nhan(so_dien_thoai, noi_dung)
                kqPromise.then(result => {
                    console.log(result)
                    Chuoi_Kq = 'OK'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                }).catch(error => {
                    console.log(error)
                    Chuoi_Kq = 'Lỗi'
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq)
                })

            } else if (Ma_so_Xu_ly == "Goi_thu_Don_hang") {
                var Kq = ""
                var Phieu_Dat_hang = JSON.parse(Chuoi_Nhan)
                var So_Phieu_Dat = Du_lieu.Don_hang.length + 1
                var from = "python244t7cn@gmail.com"
                var to = Phieu_Dat_hang.Khach_hang.Email
                var subject = `[Kiehl] Thông báo xác nhận đơn hàng ${So_Phieu_Dat}`
                var body = `<p><h1>Kiehl</h1> - ${Phieu_Dat_hang.Ngay_Dat_hang} - Đơn hàng ${So_Phieu_Dat}</p>
                <br><strong> Cảm ơn bạn đã mua hàng!</strong>
                <br><p> Xin chào ${Phieu_Dat_hang.Khach_hang.Ho_ten}, <br> Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển.
                <br> Thời gian giao hàng dự định vào ngày ${Phieu_Dat_hang.Ngay_Giao_hang}.
                <br> Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p>
                <br><p> Thân,<br>KIEHL</p>`
                //cần bật google.com/accounts/DisplayUnlockCaptcha  Cái này dùng để cho phép ứng dụng khác truy cập vào tài khoản gmail).
                //cần bật myaccount.google.com/lesssecureapps (Cái này dùng để bật ứng dụng kém an toàn, cho phép các ứng dụng khác truy cập vào tài khoản của bạn)
                // vào http://localhost:1000/Ma_so_Xu_ly=Goi_thu_Lien_he để gởi thư
                // [[PromiseStatus]]:"resolved" --> thành công
                var kqPromise = Goi_thu.Goi_Thu_Lien_he(from, to, subject, body)
                //console.log(kqPromise)
                kqPromise.then(result => {
                    console.log(result)
                    Chuoi_Kq = "OK"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                }).catch(err => {
                    Chuoi_Kq = "ERROR"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            } else if (Ma_so_Xu_ly == "Goi_thu_Lien_he") {
                var Kq = ""
                var Khach_hang = JSON.parse(Chuoi_Nhan)
                var from = "python244t7cn@gmail.com"
                var to = Khach_hang.Email
                var subject = `[Kiehl] Thông báo xác nhận mail`
                var body = `<p>Kiehl - ${Khach_hang.Ngay}</p>
                <br><p> Xin chào ${Khach_hang.Ho_ten}, <br> Cảm ơn quý khách đã dành thời gian cho chúng tôi.
                </br> Chúng tôi muốn thông tin lại nội dung quý khách đã gởi như sau: </br>
                </br><p style="margin-left:15px"> Khách hàng: ${Khach_hang.Ho_ten}
                <br/> Số điện thoại: ${Khach_hang.Dien_thoai}
                <br/> Email: ${Khach_hang.Email}
                <br/> Tiêu đề: ${Khach_hang.Tieu_de}
                <br/> Nội dung câu hỏi: ${Khach_hang.Noi_dung}</p>
                </br><br/> Chúng tôi sẽ phản hồi lại bạn trong thời gian sớm nhất!!!
                <br><p> Thân,<br>KIEHL</p>`
                var kqPromise = Goi_thu.Goi_Thu_Lien_he(from, to, subject, body)
                //console.log(kqPromise)
                kqPromise.then(result => {
                    console.log(result)
                    Chuoi_Kq = "OK"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                }).catch(err => {
                    Chuoi_Kq = "ERROR"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            }else if (Ma_so_Xu_ly == "Dang_nhap") {
                var Doi_tuong_Kq = {}
                var Thong_tin = JSON.parse(Chuoi_Nhan)
                var Nguoi_dung = Du_lieu.Nguoi_dung.find(x => x.Ten_Dang_nhap.toLowerCase() == Thong_tin.Ten_Dang_nhap.toLowerCase() && x.Mat_khau.toLowerCase() == Thong_tin.Mat_khau.toLowerCase())
                if (Nguoi_dung) {
                    Doi_tuong_Kq.Ten = Nguoi_dung.Ten
                    Doi_tuong_Kq.Ma_so = Nguoi_dung.Ma_so
                    Doi_tuong_Kq.Nhom_Nguoi_dung = Nguoi_dung.Nhom_Nguoi_dung

                }
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);


            } else if (Ma_so_Xu_ly == "Ghi_Quan_ao_Moi") {
                var Kq
                var Quan_ao = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Quan_ao", Quan_ao)
                Kq.then(result => {
                    Du_lieu.Danh_sach_Quan_ao.push(Quan_ao)
                    Chuoi_Kq = JSON.stringify(Quan_ao)
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })
            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Dat_hang") {
                var Kq = ""
                var Phieu_Dat_hang = JSON.parse(Chuoi_Nhan)
                var So_Phieu_Dat = Du_lieu.Don_hang.length + 1
                Phieu_Dat_hang.So_Phieu_Dat = So_Phieu_Dat
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Don_hang", Phieu_Dat_hang)

                Kq.then(result => {
                    console.log(result)
                    Chuoi_Kq = "OK"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })

            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Nhap_hang") {
                var Kq = ""
                var Danh_sach_Phieu_Nhap_hang = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phieu_Nhap_hang.forEach(Quan_ao_Nhap => {
                    var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Quan_ao_Nhap.Ma_so)
                    var So_Phieu_Nhap = Quan_ao.Danh_sach_Phieu_Nhap.length + 1
                    Quan_ao_Nhap.Phieu_Nhap_hang.So_Phieu_Nhap = So_Phieu_Nhap
                    Quan_ao.Danh_sach_Phieu_Nhap.push(Quan_ao_Nhap.Phieu_Nhap_hang)
                    var Dieu_kien = { "Ma_so": Quan_ao.Ma_so }
                    var Gia_tri_Cap_nhat = {
                        $set: { Danh_sach_Phieu_Nhap: Quan_ao.Danh_sach_Phieu_Nhap }
                    }
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Quan_ao", Dieu_kien, Gia_tri_Cap_nhat)

                    Kq.then(result => {
                        console.log(result)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    })


                })
            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Ban_hang") {
                var Kq = ""
                var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Tham_so.Ma_so_Quan_ao)
                var Phieu_Ban_hang = JSON.parse(Chuoi_Nhan)
                var So_Phieu_Ban = Quan_ao.Danh_sach_Phieu_Ban.length + 1
                Phieu_Ban_hang.So_Phieu_Ban = So_Phieu_Ban
                Quan_ao.Danh_sach_Phieu_Ban.push(Phieu_Ban_hang)
                var Dieu_kien = { "Ma_so": Quan_ao.Ma_so }
                var Gia_tri_Cap_nhat = {
                    $set: { Danh_sach_Phieu_Ban: Quan_ao.Danh_sach_Phieu_Ban }
                }
                Kq = Luu_tru.Cap_nhat_Doi_tuong("Quan_ao", Dieu_kien, Gia_tri_Cap_nhat)

                Kq.then(result => {
                    console.log(result)
                    Chuoi_Kq = "OK"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })

            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Giao_hang") {
                var Kq = ""
                var Phieu_Giao_hang = JSON.parse(Chuoi_Nhan)
                var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Phieu_Giao_hang.Ma_so)
                Quan_ao.Danh_sach_Phieu_Dat.forEach(Phieu => {
                    if (Phieu.So_Phieu_Dat == Phieu_Giao_hang.So_Phieu_Dat) {
                        Phieu.Nhan_vien = Phieu_Giao_hang.Nhan_vien
                        Phieu.Trang_thai = "DA_GIAO_HANG"
                    }
                })
                var Dieu_kien = { "Ma_so": Quan_ao.Ma_so }
                var Gia_tri_Cap_nhat = {
                    $set: { Danh_sach_Phieu_Dat: Quan_ao.Danh_sach_Phieu_Dat }
                }
                Kq = Luu_tru.Cap_nhat_Doi_tuong("Quan_ao", Dieu_kien, Gia_tri_Cap_nhat)
                Kq.then(result => {
                    console.log(result)
                    Chuoi_Kq = "OK"
                    Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                    Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                    Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    Dap_ung.end(Chuoi_Kq);
                })

            } else if (Ma_so_Xu_ly == "Cap_nhat_Quan_ao") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Quan_ao_Cap_nhat => {
                    var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Quan_ao_Cap_nhat.Ma_so)
                    Quan_ao.Ten = Quan_ao_Cap_nhat.Ten
                    Quan_ao.Don_gia_Ban = Quan_ao_Cap_nhat.Don_gia_Ban
                    Quan_ao.Don_gia_Nhap = Quan_ao_Cap_nhat.Don_gia_Nhap
                    Quan_ao.Nhom_Danh_muc.Ten = Quan_ao_Cap_nhat.Nhom_Danh_muc.Ten
                    Quan_ao.Nhom_Danh_muc.Ma_so = Quan_ao_Cap_nhat.Nhom_Danh_muc.Ma_so
                    Quan_ao.Mo_ta = Quan_ao_Cap_nhat.Mo_ta
                    Quan_ao.Chat_lieu = Quan_ao.Chat_lieu
                    var Dieu_kien = { "Ma_so": Quan_ao.Ma_so }
                    var Gia_tri_Cap_nhat = {
                        $set: {
                            "Ten": Quan_ao.Ten,
                            "Don_gia_Ban": Quan_ao.Don_gia_Ban,
                            "Don_gia_Nhap": Quan_ao.Don_gia_Nhap,
                            "Mo_ta": Quan_ao.Mo_ta,
                            "Chat_lieu": Quan_ao.Chat_lieu,
                            "Nhom_Danh_muc.Ten": Quan_ao.Nhom_Danh_muc.Ten,
                            "Nhom_Danh_muc.Ma_so": Quan_ao.Nhom_Danh_muc.Ma_so
                        }
                    }

                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Quan_ao", Dieu_kien, Gia_tri_Cap_nhat)

                    Kq.then(result => {
                        console.log(result)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    })

                })
            } else if (Ma_so_Xu_ly == "Xoa_Quan_ao") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Quan_ao_Xoa => {
                    var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Quan_ao_Xoa.Ma_so)
                    var Dieu_kien = { "Ma_so": Quan_ao.Ma_so }
                    Kq = Luu_tru.Xoa_Doi_tuong("Quan_ao", Dieu_kien)
                    Kq.then(result => {
                        Du_lieu.Danh_sach_Quan_ao = Du_lieu.Danh_sach_Quan_ao.filter(x => x.Ma_so != Quan_ao_Xoa.Ma_so)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    }).catch(err => {
                        Chuoi_Kq = "Error"
                    })

                })
                //console.log(Du_lieu.Danh_sach_Quan_ao)
            } else if (Ma_so_Xu_ly == "Thanh_ly_Quan_ao") {
                var Kq = ""
                var Danh_sach_Thanh_ly = JSON.parse(Chuoi_Nhan)
                Danh_sach_Thanh_ly.forEach(Quan_ao_Thanh_ly => {
                    var Quan_ao = Du_lieu.Danh_sach_Quan_ao.find(x => x.Ma_so == Quan_ao_Thanh_ly.Ma_so)
                    Kq = Luu_tru.Thanh_ly_Doi_tuong("Quan_ao", Quan_ao)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Quan_ao = Du_lieu.Danh_sach_Quan_ao.filter(x => x.Ma_so != Quan_ao_Thanh_ly.Ma_so)
                        Du_lieu.Danh_sach_Thanh_ly.push(Quan_ao)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                //console.log(Du_lieu.Danh_sach_Quan_ao)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_Quan_ao") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(Quan_ao_Phuc_Hoi => {
                    var Quan_ao = Du_lieu.Danh_sach_Thanh_ly.find(x => x.Ma_so == Quan_ao_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong("Quan_ao", Quan_ao)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Quan_ao.push(Quan_ao)
                        Du_lieu.Danh_sach_Thanh_ly = Du_lieu.Danh_sach_Thanh_ly.filter(x => x.Ma_so != Quan_ao_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                        Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                        Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                        Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                        Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                        Dap_ung.end(Chuoi_Kq);
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                //console.log(Du_lieu.Danh_sach_Quan_ao)
            } else {
                Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
                //Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                Dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
                Dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                Dap_ung.end(Chuoi_Kq);
            }
        })

    })
Dich_vu.listen(Port,
    console.log("Dịch vụ Dữ liệu đang thực thi ...: " + Port)
);

Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string'
        ? 'Pipe ' + Port
        : 'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}


cap_nhat_so_luong_gio_hang();

var location_href = document.location.hash;

if (location_href != '') {
    location_href = location_href.substr(1);
    var filterValue = $('#' + location_href).data('filter');
    $('.isotope-grid').isotope({ filter: filterValue });
}

$('.sub-menu:eq(0) li a').on('click', function (e) {
    var sub_href = $(this).data('id');
    var sub_filterValue = $('#' + sub_href).data('filter');
    $('.isotope-grid').isotope({ filter: sub_filterValue });
});

$('.bread-crumb a:eq(1)').on('click', function (e) {
    var sub1_filterValue = $(this).data('filter');
    $('.isotope-grid').isotope({ filter: sub1_filterValue });
});

$('.thong-tin-cua-hang:eq(0)').show();

$(function () {
    $("#myList div").slice(0, 1).show();
    $("#Th_Load_more").on('click', function (e) {
        e.preventDefault();
        $("#myList div:hidden").slice(0, 4).slideDown();
        if ($("#myList div:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});

$('.js-addcart-detail').on('click', function (e) {
    var san_pham = {
        Ten_san_pham: $(this).parent().parent().parent().parent().find('h4').text(),
        Ma_so: $(this).parent().find('input[name=Th_Ma_so]').val(),
        So_luong: $(this).parent().find('.num-product').val(),
        Mau_sac: $(this).parent().parent().parent().find('.mau-sac').val(),
        Size: $(this).parent().parent().parent().find('.ma-size').val(),
        Hinh: $(this).parent().parent().parent().parent().parent().parent().find('.slick-active img:eq(0)').attr('src'),
        Don_gia: $(this).parent().find('input[name=Th_Don_gia]').val(),
    };

    if ($(this).parent().find('input[name=Th_Don_gia_Ban]').length > 0) {
        san_pham.Don_gia = $(this).parent().find('input[name=Th_Don_gia_Ban]').val();
    }

    var gio_hang = []
    if (sessionStorage.getItem("gio_hang") != undefined) {
        gio_hang = JSON.parse(sessionStorage.getItem("gio_hang"))
        flag = false
        gio_hang.forEach(sp => {
            if (sp.Ma_so == san_pham.Ma_so && sp.Size == san_pham.Size && sp.Mau_sac == san_pham.Mau_sac) {
                sp.So_luong = parseInt(sp.So_luong) + parseInt(san_pham.So_luong)
                flag=true
                return
            }

        })
        if(flag==false){
            gio_hang.push(san_pham)
        }
    }
    else {
        gio_hang.push(san_pham)
    }

    if (gio_hang.length > 0) {
        sessionStorage.setItem("gio_hang", JSON.stringify(gio_hang))
        Xuat_Thong_tin_San_pham_Chon(gio_hang)
    } else {
        sessionStorage.removeItem("gio_hang")
    }
    cap_nhat_so_luong_gio_hang();
});

$('.js-addwish-b2').on('click', function (e) {
    var san_pham = {
        Ten_san_pham: $(this).parent().parent().parent().parent().find('h4').text(),
        Ma_so: $(this).parent().find('input[name=Th_Ma_so]').val(),
        Hinh: $(this).parent().parent().parent().parent().parent().parent().find('.slick-active img:eq(0)').attr('src'),
        Don_gia: $(this).parent().find('input[name=Th_Don_gia]').val(),
    };

    var wishList = []
    if (localStorage.getItem("Wishlist") != undefined) {
        wishList = JSON.parse(localStorage.getItem("Wishlist"))
    }

    var vt = wishList.indexOf(san_pham.Ma_so)
    if (vt == -1) {
        wishList.push(san_pham.Ma_so)
    } else {
        wishList.splice(vt, 1)
    }

    if (wishList.length > 0) {
        localStorage.setItem("Wishlist", JSON.stringify(wishList))
    } else {
        localStorage.removeItem("Wishlist")
    }
    cap_nhat_so_luong_wish_list();
});

$(document).on('click', '.js-hide-cart', function () {
    $('.js-panel-cart').removeClass('show-header-cart');
});

$('#dang-nhap').on('click', function (e) {
    e.preventDefault();
    $('#modal-dang-nhap').addClass('show-modal1');
});

$('.btn-dang-nhap').on('click', function (e) {
    var data = {
        email: $('#email').val(),
        password: $('#password').val(),
    };
    $.ajax({
        url: "/nguoi-dung/dang-nhap",
        method: "POST",
        data: {
            item: JSON.stringify(data)
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            if (result.status) {
                location.reload()
            } else {

            }
        }
    });
});

function cap_nhat_so_luong_gio_hang() {
    var so_luong_gio_hang = 0;

    if (sessionStorage.getItem('gio_hang') !== null) {
        gio_hang = JSON.parse(sessionStorage.getItem('gio_hang'));
        so_luong_gio_hang = gio_hang.length;
    }
    $('.js-show-cart').each(function () {
        $(this).attr('data-notify', so_luong_gio_hang);
    })
}


function cap_nhat_so_luong_wish_list() {
    var so_luong = 0;

    if (localStorage.getItem('Wishlist') !== null) {
        wishList = JSON.parse(localStorage.getItem('Wishlist'));
        so_luong = wishList.length;
    }
    $('.icon-header-noti').each(function () {
        $(this).attr('data-notify', so_luong);
    })
}
$('.filter-link').click(function() {    
    $('.filter-link').removeClass('filter-link-active');    
    $(this).addClass('filter-link-active');
})

$('#sap_tang').click(function() {    
    Sap_Tang();
})
$('#sap_giam').click(function() {        
    Sap_Giam();
})
$('#sap_tang_gia').click(function() {        
    Sap_Tang_Gia();
})
$('#sap_giam_gia').click(function() {        
    Sap_Giam_Gia();
})

$('.filter-gia').click(function() {    
    var range = $(this).data('price');
    
    Loc_gia(range);
})
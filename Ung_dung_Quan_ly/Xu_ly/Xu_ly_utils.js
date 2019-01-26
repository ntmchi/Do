Kiem_tra_Dang_nhap();

$('#btn-dang-xuat').click(function() {
    sessionStorage.removeItem('DangNhap');
    document.location.href = 'dang_nhap.html';
})
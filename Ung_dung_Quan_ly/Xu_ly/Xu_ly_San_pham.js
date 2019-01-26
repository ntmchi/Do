var San_pham = function () {    
    var handleProducts = function(dataSet, columnSet) {
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_products"),
            onSuccess: function (grid) {
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                //"dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

                "lengthMenu": [
                    [10, 20, 50, 100, 150],
                    [10, 20, 50, 100, 150] // change per page values here 
                ],
                "pageLength": 10, // default record count per page                
                "ajax": false,
                "order": [
                    [0, "asc"]
                ], // set first column as a default sort by asc                
                "data": dataSet,
                "columns": columnSet,
                "serverSide": false,
                // "idSrc":  'Ma_so',
            }
        });

         // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("customActionType", "group_action");
                grid.setAjaxParam("customActionName", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'Please select an action',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            } else if (grid.getSelectedRowsCount() === 0) {
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'No record selected',
                    container: grid.getTableWrapper(),
                    place: 'prepend'
                });
            }
        });
        grid.getTableWrapper().on('click', '.filter-san-pham', function (e) {
            e.preventDefault();            
            var Nhom_Danh_muc = $('#product_category option:selected').text();
            var Ten_San_pham = $('#product_name').val();

            if (Nhom_Danh_muc != 'Chọn danh mục' && Ten_San_pham != '') {
                grid.getDataTable().columns(2).search('').columns(1).search('').draw();
                grid.getDataTable().columns(2).search(Nhom_Danh_muc).columns(1).search(Ten_San_pham).draw();
            } else if (Nhom_Danh_muc != 'Chọn danh mục') {
                grid.getDataTable().columns(2).search('').columns(1).search('').draw();
                console.log(234);
                grid.getDataTable().columns(2).search(Nhom_Danh_muc).draw();
            } else if (Ten_San_pham != '') {
                grid.getDataTable().columns(2).search('').columns(1).search('').draw();
                grid.getDataTable().columns(1).search(Ten_San_pham).draw();
            } else {
                console.log(456);                
                grid.getDataTable().columns(2).search('').columns(1).search('').draw();
            }                
        }),
        grid.getTableWrapper().on('click', '.edit_san_pham', function (e) {
            e.preventDefault();            
            var Ma_so = grid.getDataTable().row( $(this).parents('tr') ).data().Ma_so;
            document.location.href = 'sua_san_pham.html?Ma_so=' + Ma_so;
        })        

        grid.getTableWrapper().on('click', '.delete_san_pham', function (e) {
            e.preventDefault();            
            var San_pham = grid.getDataTable().row( $(this).parents('tr') ).data();
            var Danh_sach_Xoa = [San_pham];

            var Kq = Xoa_San_pham(Danh_sach_Xoa);

            if (Kq == 'OK') {
                alert('Xoa1 thành công');
                document.location.href = 'danh_sach_san_pham.html';
            }
        })        
    }

    return {
        //main function to initiate the module
        init: function (dataSet, columnSet) {
            handleProducts(dataSet, columnSet);                        
        }

    };

}();
var Du_lieu = [];
var Nhom_Danh_muc = [];
var Nhom_Danh_muc_Ma_so = [];
var San_pham_Ma_so = [];
var San_pham_Chi_tiet;

if (window.Promise) {
    var promise = new Promise(function (resolve, reject) {
        Du_lieu = Doc_Danh_sach_San_pham();                    
        Nhom_Danh_muc = [];
        Nhom_Danh_muc_Ma_so = [];

        if (typeof window.location.search.split("=")[1] != 'undefined') {
            San_pham_Chi_tiet = Du_lieu.Danh_sach_Quan_ao.filter(x => x.Ma_so == window.location.search.split("=")[1])[0];
            Th_Gia_ban.value = San_pham_Chi_tiet.Don_gia_Ban;
            Th_Gia_nhap.value = San_pham_Chi_tiet.Don_gia_Nhap;
            Th_Chat_lieu.value = San_pham_Chi_tiet.Chat_lieu;
            Th_Ten.value = San_pham_Chi_tiet.Ten;
            Th_Mo_ta.value = San_pham_Chi_tiet.Mo_ta;

            span_ten.innerText = San_pham_Chi_tiet.Ten;
        }
        $.map(Du_lieu.Danh_sach_Quan_ao, function(val, i) {        
            if ($.inArray(val.Nhom_Danh_muc.Ma_so, Nhom_Danh_muc_Ma_so) == -1) {
                Nhom_Danh_muc_Ma_so.push(val.Nhom_Danh_muc.Ma_so);
                Nhom_Danh_muc.push(val.Nhom_Danh_muc);
            }

            San_pham_Ma_so.push(parseInt(val.Ma_so.match(/\d+/),10))
        })        

        if (Nhom_Danh_muc.length > 0) {
            var Nhom_Danh_muc_Html = '';
            var selected = '';
            Nhom_Danh_muc.forEach(function(item) {
                selected = '';
                if (typeof San_pham_Chi_tiet != 'undefined' && San_pham_Chi_tiet.Nhom_Danh_muc.Ma_so == item.Ma_so) {
                    selected = 'selected="selected"';
                }
                Nhom_Danh_muc_Html += `<option value="${item.Ma_so}" ${selected}>${item.Ten}</option>`
            });

            $('#product_category').append(Nhom_Danh_muc_Html);
        }
        
        San_pham.init(Du_lieu.Danh_sach_Quan_ao, [
            { "data": "Ma_so" },            
            { "data": "Ten" },
            { "data": "Nhom_Danh_muc.Ten" },
            // { "data": "Don_gia_Ban" },
            {
                "render": function ( data, type, row ) {
                    var gia = row.Don_gia_Ban;                    
                    return gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },
            {
                "render": function ( data, type, row ) {
                    var gia = row.Don_gia_Nhap;                    
                    return gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },            
            { "defaultContent": '<button class="btn btn-sm btn-info edit_san_pham">Sửa</button><button class="btn btn-sm btn-danger delete_san_pham">Xóa</button>'}            
        ]);
        return resolve('OK');
    })

    promise.then(Kq => {        
    })
} else {
    console.log('Promise not available');
}
$('#add_san_pham').submit(function() {
    return false;
})

$('#btn-add').click(function() {
    var San_pham = {
        Ma_so: 'SP_' + (Math.max.apply(null, San_pham_Ma_so) + 1),
        Don_gia_Ban: Th_Gia_ban.value,
        Don_gia_Nhap: Th_Gia_nhap.value,
        Chat_lieu: Th_Chat_lieu.value,
        Ten: Th_Ten.value,
        Mo_ta: Th_Mo_ta.value,
        Nhom_Danh_muc: {
            Ten: $('#product_category option:selected').text(),
            Ma_so: $('#product_category').val()
        },
        Danh_sach_Chi_tiet: [
            {
                "Mau_sac": "Cam",
                "Size": "S",
                "So_luong": 30
            },
            {
                "Mau_sac": "Cam",
                "Size": "M",
                "So_luong": 14
            },
            {
                "Mau_sac": "Cam",
                "Size": "L",
                "So_luong": 12
            }
        ],
        Danh_sach_Hinh_anh:  [
            {
                "Hinh_anh": "SP8_2.jpg"
            },
            {
                "Hinh_anh": "SP8_1.jpg"
            },
            {
                "Hinh_anh": "SP8_3.jpg"
            },
            {
                "Hinh_anh": "SP8_4.jpg"
            }
        ]
    };
    
    var Kq = Ghi_San_pham(San_pham);  

    alert('Thêm mới thành công');
    document.location.href = 'danh_sach_san_pham.html';
})

$('#btn-edit').click(function() {
    San_pham_Chi_tiet.Ten = Th_Ten.value;
    San_pham_Chi_tiet.Don_gia_Ban = Th_Gia_ban.value;
    San_pham_Chi_tiet.Don_gia_Nhap = Th_Gia_nhap.value;
    San_pham_Chi_tiet.Nhom_Danh_muc.Ten = $('#product_category option:selected').text();
    San_pham_Chi_tiet.Nhom_Danh_muc.Ma_so = $('#product_category').val();
    var Danh_sach_Sua = [San_pham_Chi_tiet];
    
    var Kq = Sua_San_pham(Danh_sach_Sua);  
    
    if (Kq == 'OK') {
        alert('Sửa thành công');
        document.location.href = 'danh_sach_san_pham.html';
    }
})
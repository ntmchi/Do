var Don_hang = function () {    
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
            var Nhom_Danh_muc = $('#product_category').val();
            var Ten_San_pham = $('#product_name').val();

            if (Nhom_Danh_muc != 0) {
                grid.getDataTable().columns(3).search(Nhom_Danh_muc).columns(2).search(Ten_San_pham).draw();
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

if (window.Promise) {
    var promise = new Promise(function (resolve, reject) {
        var Du_lieu = Doc_Danh_sach_Don_hang();console.log(Du_lieu)
        var Nhom_Danh_muc = [];
        var Nhom_Danh_muc_Ma_so = [];

        // $.map(Du_lieu.Danh_sach_Quan_ao, function(val, i) {        
        //     if ($.inArray(val.Nhom_Danh_muc.Ma_so, Nhom_Danh_muc_Ma_so) == -1) {
        //         Nhom_Danh_muc_Ma_so.push(val.Nhom_Danh_muc.Ma_so);
        //         Nhom_Danh_muc.push(val.Nhom_Danh_muc);
        //     }            
        // })

        if (Nhom_Danh_muc.length > 0) {
            var Nhom_Danh_muc_Html = '';
            Nhom_Danh_muc.forEach(function(item) {
                Nhom_Danh_muc_Html += `<option value="${item.Ten}">${item.Ten}</option>`
            });

            $('#product_category').append(Nhom_Danh_muc_Html);
        }
        
        Don_hang.init(Du_lieu.Don_hang, [
            { "data": "So_Phieu_Dat" },            
            { "data": "Khach_hang.Ho_ten" },            
            {
                "render": function ( data, type, row ) {                    
                    var date = new Date(row.Ngay_Dat_hang);
                    return date.getDate() + '/' + date.getMonth() + 1 + '/' +  date.getFullYear();
                },
            },
            {
                "render": function ( data, type, row ) {                    
                    var date = new Date(row.Ngay_Giao_hang);
                    return date.getDate() + '/' + date.getMonth() + 1 + '/' +  date.getFullYear();
                },
            },            
            {
                "render": function ( data, type, row ) {
                    var gia = row.Tong_tien;                    
                    return gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },       
            { "data": "Trang_thai" },            
        ]);
        return resolve('OK');
    })

    promise.then(Kq => {        
    })
} else {
    console.log('Promise not available');
}
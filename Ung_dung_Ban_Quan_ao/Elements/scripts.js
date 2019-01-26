var scripts = [
        // '../CSS_JS/vendor/jquery/jquery-3.2.1.min.js',
        '../CSS_JS/vendor/animsition/js/animsition.min.js',
        '../CSS_JS/vendor/bootstrap/js/popper.js',
        '../CSS_JS/vendor/bootstrap/js/bootstrap.min.js',
        '../CSS_JS/vendor/select2/select2.min.js',
        '../CSS_JS/vendor/daterangepicker/moment.min.js',
        '../CSS_JS/vendor/daterangepicker/daterangepicker.js',
        '../CSS_JS/vendor/slick/slick.min.js',
        '../CSS_JS/js/slick-custom.js',
        '../CSS_JS/vendor/parallax100/parallax100.js',
        '../CSS_JS/vendor/MagnificPopup/jquery.magnific-popup.min.js',
        '../CSS_JS/vendor/isotope/isotope.pkgd.min.js',
        '../CSS_JS/vendor/sweetalert/sweetalert.min.js',
        '../CSS_JS/vendor/perfect-scrollbar/perfect-scrollbar.min.js',
        '../Xu_ly/Xu_ly_3L.js',
    ];
    scripts.forEach(scriptFile =>{
        // Chuoi_HTML += `<option value="${chi_tiet.Mau_sac}">${chi_tiet.Mau_sac}</option>`
        // var script = document.createElement("script");
        // script.setAttribute("type", "text/javascript");
        // script.setAttribute("src", "url to the script file here");
        // document.getElementsByTagName("head")[0].appendChild(script);
        // console.log(scriptFile)
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", scriptFile);
        document.getElementsByTagName("scripts")[0].appendChild(script);
	})

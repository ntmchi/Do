var request = require('request-promise');
var id = '538694533314247';
var access_token = 'EAAC6coCTolUBAIGyi91hZA85FZCP4c60mZB8BzgbXD4AsZCHpEWrs1zzjlpRtBxnR0FatZBfDMFvZBsjyfrh61mSl1XlfCzr5t5p4cJ0xLkVF75m52SZCHvu6NF0FphcCaAOOXDMElvQhZBBHBZCJpmpwWQAFLdQ9i8qkRCEaylux4F4Rb3vhwZARCgdeKA721W3sTwKgn79BpgQZDZD';
// 2 thong so id = page_id va access_token=page_access_token duoc lay trong "view source code" cua page(tao trong trang web)

exports.Goi_Thong_bao_Facebook = async function(Noi_dung_Thong_bao){
    var Cau_hinh = {
        method : 'POST',
        uri: `https://graph.facebook.com/v2.8/${id}/feed`,
        qs : {
            access_token : access_token,
            message : Noi_dung_Thong_bao
        }
    };
    return request(Cau_hinh)
}

exports.Goi_hinh_Facebook = async function(Tieu_de, Url_Hinh){
    var Cau_hinh = {
        method: 'POST',
        uri: `https://graph.facebook.com/v2.8/${id}/photos`,
        qs: {
            access_token : access_token,
            caption: Tieu_de,
            url : Url_Hinh
        }
    };
    return request(Cau_hinh)
}

exports.Goi_phim_Facebook = async function (Tieu_de, Phim_Url){
    var Cau_hinh = {
        method: 'POST',
        uri: `https://graph.facebook.com/v2.8/${id}/videos`,
        qs: {
            access_token : access_token,
            description: Tieu_de,
            file_url : Phim_Url
        }
    };
    return request(Cau_hinh)
}
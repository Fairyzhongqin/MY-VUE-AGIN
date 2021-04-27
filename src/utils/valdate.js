// 过滤特殊字符
export function stripscript(s) {
    var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
    );
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, "");
    }
    return rs;
}
// 验证邮箱
export function validEmail(val) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    !reg.test(val) ? true : false;
}
// 验证密码
export function validPass(val) {
    var reg = /^[A-Za-z].*[0-9]|[0-9].*[A-Za-z]$/;
    !reg.test(val) ? true : false;
}
//验证验证码
export function validCode(val) {
    var reg = /^\d{4}$/;
    !reg.test(val) ? true : false;
}
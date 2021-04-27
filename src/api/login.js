import service from '@/utils/request.js'
// 获取验证码接口
export function getCode() {
    service.request({
        methods: 'post',
        url: '/getSms/',
        data: {}
    })
}
import request from '@/utils/request'

export function getSalaryAll() {
    return request({
        url: '/experienceInformation/getSalaryAll',
        method: "get",
    });
}

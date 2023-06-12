import request from '@/utils/request'

export function getList() {
    return request({
        url: '/user/list',
        method: "get",
    });
}


export function login(data) {
    return request({
        params: data,
        url: '/user/login',
        method: "post",
    });
}


export function getAll() {
    return request({
        url: '/user/all',
        method: "get",
    });
}


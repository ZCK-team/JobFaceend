import request from '@/utils/request'

export function getPositionInformationAll() {
    return request({
        url: '/positionInformation/getPositionInformationAll',
        method: "get",
    });
}

export function getSalary() {
    return request({
        url: '/positionInformation/getSalary',
        method: "get",
    });
}

export function getmapnum() {
    return request({
        url: '/map/mapnum',
        method: "get",
    });
}
export function getCityAndCityCount() {
    return request({
        url: '/positionInformation/getCityAndCityCount',
        method: "get",
    });
}




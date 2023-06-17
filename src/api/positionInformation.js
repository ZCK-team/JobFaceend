import request from '@/utils/request'

export function getPositionInformationAll(page, size) {
    return request({
        params: { page, size },
        url: '/positionInformation/getPositionInformationAll',
        method: "get",
    });
}

export function getCityFromHottestPosition(){
    return request({
        url: '/positionInformation/getCityFromHottestPosition',
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


export function fullTextSearch(inputValue, page, size) {
    return request({
        params: {inputValue, page, size },
        url: '/positionInformation/fullTextSearch',
        method: "get",
    });
}






import request from '@/utils/request'

export function getPositionInformationAll() {
    return request({
        url: '/positionInformation/getPositionInformationAll',
        method: "get",
    });
}

export function getCityFromHottestPosition() {
    return request({
        url: '/positionInformation/getCityFromHottestPosition',
        method: "get",
    });
}

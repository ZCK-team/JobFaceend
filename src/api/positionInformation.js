import request from '@/utils/request'

export function getPositionInformationAll() {
    return request({
        url: '/positionInformation/getPositionInformationAll',
        method: "get",
    });
}



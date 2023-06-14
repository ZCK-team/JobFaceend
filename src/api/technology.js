import request from '@/utils/request'

export function getTechnicalFrequencyStatistics() {
    return request({
        url: '/technologyController/getTechnicalFrequencyStatistics',
        method: "get",
    });
}
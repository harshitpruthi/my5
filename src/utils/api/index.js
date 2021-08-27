import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

const axios = require('axios');


export const axiosInstance = axios.create({
    baseURL: '',

    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: 'comma' })
});


export function submitEmailForLogin(emailId, password) {
    const url = `http://internal-a13f323289b1f47d2b0a2eaaef18c358-554466785.ap-south-1.elb.amazonaws.com:8000/login?email=${emailId}&pwd=${password}`;

    return axiosInstance.post(url, {
        headers: {
            'emailId': emailId,
        }
    });
}


export function createSelection(emailId, payload) {
    const url = `http://internal-a13f323289b1f47d2b0a2eaaef18c358-554466785.ap-south-1.elb.amazonaws.com:8000/create_selection`;

    // const payload1 = {
    //     "selection": payload
    // }
    return axiosInstance.post(url, payload, {
        headers: {
            'emailId': emailId,
        }
    });
}


export function getAllStocks() {
    const url = 'https://next.groww.in/v1/api/stocks_data/v1/company/groww_company_Id/GIDXNIFTY100?fields=CHILD_ASSETS';
    const xReqId = uuidv4();

    return axiosInstance.get(url, {
        headers: {
            'x-request-id': xReqId,
        }
    });
}

export function getPriceforBatch(list, exchange = 'NSE') {
    const data = {
        exchange,
        'symbolList': list
    };
    const url = 'https://next.groww.in/v1/api/stocks_data/v1/accord_points/latest_prices_ohlc_batch';

    const xReqId = uuidv4();

    return axiosInstance.post(url, data, {
        headers: {
            'x-request-id': xReqId,
        }
    });
}
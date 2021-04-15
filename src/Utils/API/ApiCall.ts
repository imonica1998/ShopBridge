import axios from 'axios'
import { TIME_OUT, requestMethod, USER_KEY } from './Constants';
export const apiCall = async (url: string, method: string, data = {}) => new Promise(async (resolve, reject) => {

    var headers = {
        'user-key': USER_KEY
    }

    var timeout = TIME_OUT

    let requestObject = {}

    if (method === requestMethod.GET) {
        requestObject = {
            url, method, timeout, responseType: 'json', headers,
        }
    } else {
        requestObject = {
            url, method, data, timeout, responseType: 'json', headers,
        }
    }

    axios.request(requestObject)
        .then((response) => {
            if (response.status === 200) {
                resolve({ success: true, data: response.data, message: '' })
            }
        })
        .catch(async (error) => {
            console.log("error--", error)
            resolve({ success: false, message: "Error!", error: error })
        })




})

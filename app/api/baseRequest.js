// @flow
import axios from 'axios';

const DEFAULT_TIMEOUT = 60000;

type requesProps = {
    method: string,
    httpMethod?: string,
    headers?: Object,
    timeout?: number,
    params?: Object,
    payload?: Object,
    token?: string,
}

const baseRequest = ({
    method,
    httpMethod = 'get',
    headers,
    timeout = DEFAULT_TIMEOUT,
    params,
    payload,
    token,
}: requesProps): Promise<any> => new Promise((resolve, reject) =>
{
    axios[httpMethod](`https://api.trello.com/1/${method}`, {
        timeout,
        headers,
        params: {
            key: 'ba448235518a8e58003896aecc9c3b57',
            token: token || window.localStorage.getItem('trello_token'),
            ...params,
        },
        data: payload,
    })
        .then(response =>
        {
            if (response.status === 200)
            {
                return resolve(response.data);
            }

            return reject(response);
        })
        .catch(() => reject(new Error('Lost internet connection')));
});

export default baseRequest;


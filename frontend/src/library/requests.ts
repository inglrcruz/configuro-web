import axios from 'axios'

const url: any = process.env.REACT_APP_URL;

/**
 * Request to perform POST
 * @param {string} route 
 * @param {object} params 
 * @returns {Promise<any>}
 */
export const post = (route: string, params: object, token: string = ""): Promise<any> => {
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post(url + route, params);
}

/**
 * Request to perform GET
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const get = (route: string, token: string): Promise<any> => {
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(url + route);
}

/**
 * Request to perform DELETE
 * @param {string} route 
 * @returns {Promise<any>}
 */
export const remove = (route: string, token: string): Promise<any> => {
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.delete(url + route);
}
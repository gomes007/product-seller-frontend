/* eslint-disable no-unused-vars */
import { BASE_API_URL } from '../common/constants';
import { authHeader } from './base.service';
import axios from 'axios'


const API_URL = BASE_API_URL + '/api/purchase'

class PurchaseService {

    savePurchase(purchase) {
        return axios.post(API_URL, purchase, {headers: authHeader()})
    }

    getAllPurchaseItems() {
        return axios.get(API_URL, {headers: authHeader()});
    }

}

export default new PurchaseService()
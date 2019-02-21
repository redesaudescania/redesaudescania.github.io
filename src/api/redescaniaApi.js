import axios from 'axios';

class RedeScaniaApi {

    constructor() {
        this.url = this._api + '?apiKey=' + this._;
    }

    getUF() {
        let url = "https://api.mlab.com/api/1/databases/redescania/collections/uf?"
        url += `apiKey=${this._}&s={"sigla":1}`;
        return axios.get(url).then(res => res.data);
    }

    getCities(uf) {
        const q = { distinct: "rede", key: "CIDADE", query: { "UF": uf } };
        return axios.post(this.url, q).then(res => res.data.values);
    }

    getHospitals(uf, city) {
        const q = {
            distinct: "rede", key: "NOME-REF",
            query: { "UF": uf, "CIDADE": city }
        };
        return axios.post(this.url, q).then(res => res.data.values);
    }

    getSpecialities(uf, city) {
        const q = {
            distinct: "rede", key: "ESPECIALIDADE",
            query: { "UF": uf, "CIDADE": city }
        };
        return axios.post(this.url, q).then(res => res.data.values);
    }

    getByParameters(...params) {

        let url = "https://api.mlab.com/api/1/databases/redescania/collections/rede?"
        url += "apiKey=" + this._;
        url += `&q={ "UF":  "${params[0]}" ,`
        url += `"CIDADE":  "${params[1]}" ,`
        url += ` "ESPECIALIDADE":  "${params[2]}" }`
        url += `&s={"NOME-REF": 1} `
        return axios.get(url).then(res => res.data);
    }

    getByHospital(...params) {

        let url = "https://api.mlab.com/api/1/databases/redescania/collections/rede?"
        url += "apiKey=" + this._;
        url += `&q={ "UF": "${params[0]}" ,`
        url += `"CIDADE": "${params[1]}" ,`
        url += ` "NOME-REF": "${params[2]}" }`
        url += `&s={"ESPECIALIDADE": 1} `;
        return axios.get(url).then(res => res.data);
    }


    _ = process.env.REACT_APP_APIKEY;
    _api = process.env.REACT_APP_API_COMMAND;

}

export default RedeScaniaApi;
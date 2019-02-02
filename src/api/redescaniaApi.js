import axios from 'axios';

class RedeScaniaApi {

    
    _api = "https://api.mlab.com/api/1/databases/redescania/runCommand";


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

    getHospitals() {

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


    _ = process.env.REACT_APP_APIKEY;

}

export default RedeScaniaApi;
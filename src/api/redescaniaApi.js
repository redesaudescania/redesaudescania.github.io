import axios from 'axios';

class RedeScaniaApi {

    _apikey = "RaMXCGwuJgzDb0wApqf8szcbN36SncAL";
    _api = "https://api.mlab.com/api/1/databases/redescania/runCommand";


    constructor() {
        this.url = this._api + '?apiKey=' + this._apikey;
    }


    getUF() {
        const q = { distinct: "rede", key: "UF" };
        return axios.post(this.url, q).then(res => res.data.values);
    }

    getCities(uf) {
        // e.g {"distinct": "rede","key": "CIDADE","query": {"UF":"SP"}} 
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
        url += "apiKey=" + this._apikey;
        url += `&q={ "UF":  "${params[0]}" ,`
        url += `"CIDADE":  "${params[1]}" ,`
        url += ` "ESPECIALIDADE":  "${params[2]}" }`
        console.log(url)
        return axios.get(url).then(res => res.data);

    }



}

export default RedeScaniaApi;
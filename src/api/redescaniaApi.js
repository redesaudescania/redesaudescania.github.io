import axios from 'axios';

class RedeScaniaApi {
    
    _apikey = "RaMXCGwuJgzDb0wApqf8szcbN36SncAL";
    _api = "https://api.mlab.com/api/1/databases/redescania/runCommand";
    url = "";    

    constructor() {
        this.url = this._url + '?apiKey=' + this._apikey;
    }


    getUF() {                
        const q = { distinct : "rede", key: "UF"};                           
        return axios.post(this.url, q).then(res => res.data);
    }

    getCities(uf) {
    // e.g {"distinct": "rede","key": "CIDADE","query": {"UF":"SP"}} 
    }

    getHospitals() {

    }

    getSpecialities() {

    }



}

export default RedeScaniaApi;
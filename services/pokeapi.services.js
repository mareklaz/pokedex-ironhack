const axios = require('axios');

class PokeapiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/'
        });
    }
    getPokemons = () => {
        return this.api.get('/pokemon');
    }
}

module.exports = PokeapiService;
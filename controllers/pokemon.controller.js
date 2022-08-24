const PokeapiService = require('../services/pokeapi.services');
const pokeApi = new PokeapiService();

module.exports.list = (req, res, next) => {
    pokeApi.getPokemons()
        .then((pokemons) => {
            console.log(pokemons.data.results[0])
            const pokemon1 = pokemons.data.results[0]
            res.render('pokemon/list', { pokemon1 })
        })
        .catch((err) => {
            console.log(err)
        });
}
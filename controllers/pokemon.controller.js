const { response } = require('express');
const PokeapiService = require('../services/pokeapi.services');
const pokeApi = new PokeapiService();

module.exports.list = (req, res, next) => {
    pokeApi.getPokemons()
        .then((pokemons) => {
            //console.log(pokemons.data.results)
            res.render('pokemon/list', { pokemons: pokemons.data.results })
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports.detail = (req, res, next) => {

    const { id } = req.params;

    pokeApi
    .getPokemonsDetails(id)
        .then((pokemon) => {
            console.log(pokemon.data)
            res.render('pokemon/details', { pokemon: pokemon.data })
        })
        .catch((err) => {
            console.log(err)
        });
}
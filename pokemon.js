const express = require('express')
const router = express.Router();

const pokemonDb = [
    {
        name: "pikachu",
        color: "yellow",
        health: 100,
    },
    {
        name: "charizard",
        color: "red",
        health: 200,
    },
    {
        name: "squirtle",
        color: "yellow",
        health: 150,
    },
]

// this is the delete request
router.delete('/:name', function(request, response) {
    const pokemonName = request.params.name;
    if (!pokemonName) {
        response.status(422).send("Please enter the pokemon's name.");
    }
    for (let i = 0; i < pokemonDb.length; i++) {
        const pokemon = pokemonDb[i];
        if (pokemonName === pokemon.name) {
            pokemonDb.splice(i, i);
            response.status(200).send("Pokemon " + pokemonName + " has been deleted.");
            return null;
        }
    }
    response.status(404).send("Pokemon " + pokemonName + " is not exist.");
})

// this is the put request
router.put("/", function(request, response) {
    const newPokemon = request.body;
    for (let i = 0; i < pokemonDb.length; i++) {
        if (pokemonDb[i].name === newPokemon.name) {
            pokemonDb[i] = newPokemon;
            response.status(200).send("Pokemon " + newPokemon.name + " has been modified.");
            return null;
        }
    }
    response.status(422).send("The pokemon is not exist.");
})

// request.body should include name, color and health

router.post('/', function(request, response) {
    const newPokemon = request.body;

    if(!newPokemon.color || !newPokemon.name || !newPokemon.health) {
        return response.status(422).send("Missing argument to create new pokemon");
    }

    pokemonDb.push(newPokemon);

    response.status(200).send("Pokemon " + newPokemon.name + " was created successfully");
})

// http://localhost:8000/api/pokemon/pikachu
/*

    request.params = {
        name: pikachu
    }

*/
// router.get('/:name', function(request, response) {
//     const pokemonName = request.params.name;
//
//     for(let i = 0; i < pokemonDb.length; i++) {
//         const pokemon = pokemonDb[i];
//         if (pokemon.name === pokemonName) {
//             return response.send(pokemon);
//         }
//     }
//
//     response.status(404).send("No pokemon with name " + pokemonName + " found.")
//
// })

//http://localhost:8000/api/pokemon/find?color=yellow&size=large
/*
    req.query = {
        color: 'yellow',
        size: 'large',
    }
*/
router.get('/find', function(req, res) {
    const color = req.query.color;

    if(!color) {
        return res.send(pokemonDb);
    }

    const output = [];

    for(let pokemon of pokemonDb) {
        if(pokemon.color === color) {
            output.push(pokemon)
        }
    }

    res.send(output)

})

http://localhost:8000 + /api/pokemon + /
router.get('/pikachu', function(req, res) {
    res.send("This is the pikachu")
})

router.get('/', function(req, res) {
    res.send("This is the the base pokemon route")
})

router.post('/', function(req, res) {
    res.send("This is how you'll create new pokemon")
})

module.exports = router;
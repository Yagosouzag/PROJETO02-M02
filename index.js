require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
    {
        id: 1, 
        Numero: 01,
        Nome: "Bulbasaur",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        Descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
        Tipo: "Grama,Poção",
        Peso: "6,9Kg" ,
        Altura: "0,7m",
        Habilidade: "Superar",
    },
    {
        id: 2, 
        Numero: 02,
        Nome: "Ivysaur",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
        Descricao: "Quando o bulbo nas costas cresce, parece perder a capacidade de ficar em pé nas patas traseiras.",
        Tipo: "Grama,Poção",
        Peso: "13Kg" ,
        Altura: "1m",
        Habilidade: "Superar",
    },
    {
        id: 3, 
        Numero: 03,
        Nome: "Venusaur",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
        Descricao: "Sua planta floresce quando está absorvendo energia solar. Ele permanece em movimento para buscar a luz do sol.",
        Tipo: "Grama,Poção",
        Peso: "100Kg" ,
        Altura: "2m",
        Habilidade: "Superar",
    },
    {
        id: 4, 
        Numero: 04,
        Nome: "Charmander",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        Descricao: "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
        Tipo: "Fogo",
        Peso: "8,5Kg" ,
        Altura: "0,6m",
        Habilidade: "Chama", 
    },
    {
        id: 5, 
        Numero: 05,
        Nome: "Charmeleon",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
        Descricao: "Tem uma natureza bárbara. Na batalha, ele chicoteia sua cauda de fogo e corta com garras afiadas.",
        Tipo: "Fogo",
        Peso: "19Kg" ,
        Altura: "1,1m",
        Habilidade: "Chama", 
    },
    {
        id: 6, 
        Numero: 06,
        Nome: "Charizard",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
        Descricao: "Ele cospe fogo que é quente o suficiente para derreter pedregulhos. Pode causar incêndios florestais soprando chamas.",
        Tipo: "Fogo",
        Peso: "90,5Kg" ,
        Altura: "1,7m",
        Habilidade: "Chama", 
    },
    {
        id: 7, 
        Numero: 07,
        Nome: "Squirtle",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        Descricao: "Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.",
        Tipo: "Água",
        Peso: "9Kg" ,
        Altura: "0,5m",
        Habilidade: "Torrente", 
    },
    {
        id: 8, 
        Numero: 08,
        Nome: "Wartortle",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
        Descricao: "É reconhecido como um símbolo de longevidade. Se a concha tiver algas, esse Wartortle é muito antigo.",
        Tipo: "Água",
        Peso: "22,5Kg" ,
        Altura: "1m",
        Habilidade: "Torrente", 
    },
    {
        id: 9, 
        Numero: 09,
        Nome: "Blastoise",
        Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
        Descricao: "Ele esmaga seu inimigo sob seu corpo pesado para causar desmaios. Em uma pitada, ele se retirará dentro de sua concha.",
        Tipo: "Água",
        Peso: "85,5Kg" ,
        Altura: "1,6m",
        Habilidade: "Torrente", 
    },

];

let pokemon = undefined;

app.get("/", (req, res) => {
    res.render("index", { pokedex, pokemon });
  });
  
  app.post("/criar", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length + 1;
    pokedex.push(pokemon);
    res.redirect("/#cards");
  });
  
app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/#cadastro");
});
  
app.post("/atualizar/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.body;
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
    res.redirect("/#cards");
});
  
app.get("/apagar/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete pokedex[id];
    res.redirect("/#cards");
});

app.get("/detalhespokemon/:id", (req,res)=> {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.render("detalhes",{pokemon});
});


app.listen(3000, ( ) => 
console.log(`Servidor rodando em http://localhost:${port}`)
);
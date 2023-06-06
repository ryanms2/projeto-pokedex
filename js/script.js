const inputPokedex = document.querySelector("#quantidade");
const pokemonBoxes = document.querySelector(".pokemon-boxes")
var quantidade = inputPokedex.addEventListener('keyup',() => {
        return pegaPokemons(inputPokedex.value)
    })
    
pegaPokemons(quantidade)
function pegaPokemons(quantidade) {
    
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=`+ quantidade)
  .then(response => {
    // manipular a resposta da requisição
    // aqui você pode verificar o status da resposta, ler os cabeçalhos, etc.
    return response.json(); // ou response.text(), response.blob(), etc.
  })
  .then(data => {

    var pokemons = [];

    data.results.map((val) => {
        fetch(val.url)
        .then(response => response.json())
        .then(pokemonSo => {
            pokemons.push({
                nome: val.name,
                imagem: pokemonSo.sprites.front_default,
            });
            console.log(pokemonSo);
            if (pokemons.length == quantidade) {

                pokemonBoxes.innerHTML = '';

                pokemons.map((val) => {        
                          
                  pokemonBoxes.innerHTML += `
                  <div class="pokemon-box">
                      <img src="${val.imagem}" />
                      <p style="font-size:30px;">${val.nome}</p>
                  </div>` 

                  })
              }
                
        })
    })
    
    // manipular os dados retornados pela requisição
    // aqui você pode processar e usar os dados recebidos
}).catch(error => {
    // lidar com erros que ocorrerem durante a requisição
    console.log('Erro:', error);
  });
}
  
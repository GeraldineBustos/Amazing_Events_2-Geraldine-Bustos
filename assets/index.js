

let section = document.getElementById("cards-section")

function crearCards(lista, cards){
  let todasLasCards=""
  for (let recorrido of lista){
    let template=
        `<div class="card" style="width: 18rem; height: 25rem;">
        <img src="${recorrido.image}" class="card-img-top " alt="Bootstrap"
                  style="padding: 5px; ">
                <div class="card-body">
                  <h5 class="card-title">${recorrido.name}</h5>
                  <p class="card-text">${recorrido.description}</p>
                  <div class="footerCards">
                    <p>Price: ${recorrido.price}</p>
                    <a href="./details.html" class="btn btn-primary">Ver Mas</a>
                </div>
              </div>
              </div>`
              todasLasCards += template 
  }
  console.log (cards)
  cards.innerHTML = todasLasCards

      }
      crearCards (data.events, section)
  

 
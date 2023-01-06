let cadenaParametroUrl = location.search
let parametros = new URLSearchParams(cadenaParametroUrl)
let idCard = parametros.get("idUrl") //es un nombre del id que usamos para ocupar el get

let contenedor = document.getElementById("detailed-card")

let propiedadEvents = data.events

let cardEncontrada = propiedadEvents.find(propiedadEvents => propiedadEvents._id == idCard)

function pintarCard(propiedadEvents){
    contenedor.innerHTML = ""
    let template = `<figure>
    <img  class="detailed-img" src="${propiedadEvents.image}" alt="${propiedadEvents.name}">
  </figure>
                    <section class="detailed-descrip">
                        <h2>${propiedadEvents.name}</h2>
                        <dl>
                            <dt>Date:</dt>
                            <dd>${propiedadEvents.date}</dd>

                            <dt>Description:</dt>
                            <dd>${propiedadEvents.description}</dd>
                            <dt>Category:</dt>
                            <dd>${propiedadEvents.category}</dd>
                            <dt>Place:</dt>
                            <dd>${propiedadEvents.place}</dd>
                            <dt>Capacity:</dt>
                            <dd>${propiedadEvents.capacity}</dd>
                            <dt>Assistance:</dt>
                            <dd>${propiedadEvents.assistance}</dd>
                            <dt>Price:</dt>
                            <dd>${propiedadEvents.price}</dd>
                        </dl>
                    </section>`

    contenedor.innerHTML = template
}

pintarCard(cardEncontrada)
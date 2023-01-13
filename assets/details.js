const  { createApp } = Vue

createApp( {
    data(){
        return {
            
            eventos : undefined,
            parametros: undefined,
            id: undefined,
            eventoPorId:undefined,
            
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(datos => datos.json())
        
        .then(datos => {
           
                
                 this.eventos = datos.events
                 this.parametros = new URLSearchParams(location.search)
                 this.id = this.parametros.get('idUrl')
                 this.eventoPorId = this.eventos.find(evento => evento._id == this.id)
                 
        } ) 
        .catch( err => console.log(err))
    },
    
}).mount('#app')










/*let cadenaParametroUrl = location.search//traemos el url como string
let parametros = new URLSearchParams(cadenaParametroUrl)//agarra el string y lo convierte a objeto
let idCard = parametros.get("idUrl") //es un nombre del id que usamos para ocupar el get o para filtrar cada carta

let contenedor = document.getElementById("detailed-card")
let dataJson;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(data => data.json())
.then( data => {
    dataJson = data
    pintarCard (dataJson.events.find(evento => evento._id == idCard), contenedor)
})
.catch(error => console.log(error) )


function pintarCard(propiedadEvents, contenedor){
    //let propiedadEvents = dataJson.events
    
    contenedor.innerHTML = ""
    let asistencia =""
    if(propiedadEvents.assistance){
        asistencia= `
        <dt>Assistance:</dt>
                            <dd>${propiedadEvents.assistance}</dd>`
    }else {
        asistencia= `
        <dt>Estimate:</dt>
          <dd>${propiedadEvents.estimate}</dd>`
    }
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
                            <div>
                            <dt>Capacity:</dt>
                            <dd>${propiedadEvents.capacity}</dd>
                            </div>
                            <div>
                            ${asistencia}
                            </div>
                            <dt>Price:</dt>
                            <dd>${propiedadEvents.price}</dd>
                        </dl>
                    </section>`

    contenedor.innerHTML = template
}*/


let homejs = document.getElementById("cards-section")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")

let date;



fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(datos => datos.json())
.then(datos => {
        date = datos
        
        renderTemplate (crearCards(date.events), homejs)
        check.innerHTML = generarCheckbox(date.events)
        search.addEventListener( "input", filtroCruzado)
        check.addEventListener("change", filtroCruzado)

        
    } ) 
    .catch( err => console.log(err))

    //Creacion de los checkbox
    function generarCheckbox (dataEvent){
        let categorias = new Set(dataEvent.map(event => event.category))
        let template = ""
        categorias.forEach(categoria =>{
            template +=
            `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox"  value="${categoria}">
            </label>
            </div>`
        });
        return template
    }

function crearCards(lista){
    let imagenes = ""
    for (let listas of lista){
            let template =  
            `
                <div class="card" style="width: 16rem;" id="cards-section">
                <img src="${listas.image}" class="card-img-top" alt="${listas.name}">
                    <div class="card-body">
                    <h5 class="card-title">${listas.name}</h5>
                    <p class="card-text">${lista.date}</p>
                    <p class="card-text">${listas.category}</p>
                    <p class="card-text">${listas.place}</p>
                    <p class="card-text">${listas.price}</p>
                    <a href="./details.html?idUrl=${listas._id}" class="btn btn-primary">View More</a>
                </div>
                </div> `
     imagenes += template
    
    }
    return imagenes
}
//funcion para el filtro de los check
function checkFilter (touchs, categoriesList){
    let values = [];
    for (let touch of touchs){
        if (touch.checked){
            values.push(touch.value.toLowerCase())
        }
        
    }
    let filters = categoriesList.filter(evento => values.includes(evento.category.toLowerCase()))
    if (values.length === 0){ 
        return categoriesList
    }
    else{
        return filters
    }
}
//funcion para el filtro del search
function searchFilter(inputFind, categoriesList){
    const filterSequis = categoriesList.filter(evento => {
        
        return evento.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterSequis
}

//filtro cruzado
function filtroCruzado(evento){
    let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFilter (search, date.events)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">THERES NO COICIDENCES WITH YOUR SEARCH</h3>`
        renderTemplate(alert, homejs)
    }
    else {
        renderTemplate(crearCards(filterPerCheack), homejs)
    }
}
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

    



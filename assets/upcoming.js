let homejs = document.getElementById("cards-section2")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")
//filtrar los objetos por medio del equis y equis.date filtrando una informacion es un parametro y fechas

let upComingCards;

let coming

fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(data => data.json())
    .then(data =>{
        upComingCards = data
        coming = upComingCards.events.filter( upcom1 => upcom1.date >=  upComingCards.currentDate)
        renderTemplate(craftCards(coming),homejs)
        check.innerHTML = generarCheckbox(upComingCards.events)
        check.addEventListener('change', filtroCruzado)
        search.addEventListener('input', filtroCruzado)
}) 
    .catch(error => console.log(error))

//const upComing = data.events.filter(equis => equis.date >= data.currentDate )
function craftCards(lista){
    let imagenes = ""
    for (let route of lista){
        
        
            let template =  
                `
                <div class="card" style="width: 16rem;">
                <img src="${route.image}" class="card-img-top" alt="${route.name}">
                    <div class="card-body">
                    <h5 class="card-title">${route.name}</h5>
                    <p class="card-text">${route.date}</p>
                    <p class="card-text">${route.category}</p>
                    <p class="card-text">${route.place}</p>
                    <p class="card-text">${route.price}</p>
                    <a href="./details.html?idUrl=${route._id}" class="btn btn-primary">View More</a>
                </div>
                </div> `
    imagenes =  imagenes + template
        
    }
    return imagenes
}

//Creacion de los botones checkbox
    function generarCheckbox (informacion){
        let categorias = new Set(informacion.map(info => info.category))
        let template = ""
        categorias.forEach(categoria =>{
            template += `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template
    }
    
    function checkFilter (touchs, categoriesList){
        let values = [];
        for (let touch of touchs){
            if(touch.checked){
            values.push(touch.value.toLowerCase())}
        }
        let filters = categoriesList.filter(list => values.includes(list.category.toLowerCase()))
        console.log (filters)
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    
//funcion para el filtro del search
function searchFood(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}
// funcion del filtro cruzado
function filtroCruzado(evento){
    let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFood (search, coming)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">THERES NO COICIDENCES WITH YOUR SEARCH</h3>`
        renderTemplate(alert, homejs)
    }
    else {
        renderTemplate(craftCards(filterPerCheack), homejs)
    }
   
}
//funcion del rendertemplate
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

//filtroCruzado()
let homejs = document.getElementById("cards-section")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")

let pastCards;

let past
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
    .then(data => data.json())
    .then(data =>{
        pastCards = data
        past = pastCards.events.filter( past1 => past1.date <= pastCards.currentDate)
        renderTemplate(craftCards(past),homejs)
        check.innerHTML = generarCheckbox(pastCards.events)
        check.addEventListener('change', filtroCruzado)
        search.addEventListener('input', filtroCruzado)
}) 
    .catch(error => console.log(error))

function craftCards(lista){
    let imagenes = ""
    for (let walk of lista){
        //if(walk.date < data.currentDate){
            let template =  
                `
                <div class="card" style="width: 16rem;">
                <img src="${walk.image}" class="card-img-top" alt="${walk.name}">
                    <div class="card-body">
                    <h5 class="card-title">${walk.name}</h5>
                    <p class="card-text">${walk.date}</p>
                    <p class="card-text">${walk.category}</p>
                    <p class="card-text">${walk.place}</p>
                    <p class="card-text">${walk.price}</p>
                    <a href="./details.html?idUrl=${walk._id}" class="btn btn-primary">View More</a>
                </div>
                </div> `
    imagenes =  imagenes + template
        }
        return imagenes
    }
    
//}
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
    let filters = categoriesList.filter(list=> values.includes(list.category.toLowerCase()))
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
    const filterPerFind = searchFood (search, past)
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

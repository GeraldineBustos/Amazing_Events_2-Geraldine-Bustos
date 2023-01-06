let homejs = document.getElementById("cards-section2")
const search = document.getElementById('search1')
const check = document.getElementById("checkbox3")
//filtrar los objetos por medio del equis y equis.date filtrando una informacion es un parametro y fechas
const upComing = data.events.filter(equis => equis.date >= data.currentDate )
function craftCards(lista){
    let imagenes = ""
    for (let walk of lista){
        
        
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
renderTemplate (craftCards(upComing), homejs)
// la funcion que nos trae const up coming
//Funcion para filtrar categorias

const sinRepetir = [] //nos genera un array vacio
const categorias = upComing.map(events => events.category) //map es un metodo del array con la informacion ya filtrada que se crean solo con las categorias


categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){//si no se repite se pushea y se guarda en el array
        sinRepetir.push (categorias)} //se pushea lo No REPETIDO
    })
    
//Creacion de los botones checkbox
    function generarCheckbox (categorias){//creamos los checkbox
        let template = ""//creamos un string vacion para ser llamado
        categorias.forEach(categoria =>{//foreach ejecuta la función indicada una vez por cada elemento del array
            template += `<div class="form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template//nos devuelve el string que estaba vacio se lleno con la funcion categoria
    }
    check.innerHTML = generarCheckbox(sinRepetir)//generamos la funcion con las cards filtradas
    //inner para pasar checks a pantalla
   
    //funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){//funcion con 2 parametros
        let values = [];//array vacio
        for (let touch of touchs){//bucle que nos filtra si esta tildado te lo pushea
            if (touch.checked)
            values.push(touch.value.toLowerCase())//si esta tildado lo pusheamos al array vacio(values)
        }
        let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)
    

search.addEventListener( 'input', filtroCruzado)
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
    const filterPerFind = searchFood (search, upComing)
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

filtroCruzado()
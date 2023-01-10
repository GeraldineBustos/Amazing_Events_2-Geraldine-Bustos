let $stat1 = document.getElementById("tabla1")
let $stat2 = document.getElementById("tabla2")
let $stat3 = document.getElementById("tabla3")

let list;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(datos => {
    list = datos
    generadorPast (list, $stat3)
    generadorUpcoming (list, $stat2)
    mayorCapacity(list.events)
    let filtro = armadoDeNuevaLista(list)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(error => error.message)



// Generar los TR del past

function generadorPast(losDatos, ubicacion){

    let pasEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
    let template2 = ""
  

    for (let past of pasEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }


    ubicacion.innerHTML = template2
}

// Generar los TR del upcoming

function generadorUpcoming(losDatos, ubicacion){

        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
    
        ubicacion.innerHTML = template1
}

// Funcion de multiplicacion
//revenues
function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

/* console.log (multiplicacion (15,10)) */

// Funcion de porcentaje
//dato1 capacidad (siempre es mayor) dato2 asistencia
function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed (2)
}

//Events statistics

function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity)
    document.getElementById ("eventmayor").innerHTML = mayorCapacity[0].name
}

function armadoDeNuevaLista(datos){
let nuevaLista = []

    for (let i = 0; i < datos.events.length; i++) {
        nuevaLista.push(datos.events[i]);
        
        nuevaLista[i].percentage = porcentaje(nuevaLista[i].capacity, (nuevaLista[i].assistance ?? nuevaLista[i].estimate));
    }
    console.log(nuevaLista)
    return nuevaLista.sort((a,b) => b.percentage - a.percentage)
}

function imprimirMayorPorcentaje(nuevoEvento){
    document.getElementById("maporcentaje").innerHTML = `${nuevoEvento[0].name} ${nuevoEvento[0].percentage}`
}

function imprimirMenorPorcentaje(nuevoEvento){
    document.getElementById("meporcentaje").innerHTML = `${nuevoEvento[nuevoEvento.length-1].name} ${nuevoEvento[nuevoEvento.length-1].percentage}`
}
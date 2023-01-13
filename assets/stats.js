const {createApp}= Vue

createApp({
    data(){
        return{
            data: undefined,
            upcomingFiltro: undefined,
            pastFiltro: undefined,
            percentajeMinMax:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then( response => response.json())
            .then(info => {
                this.data= info
                this.upcomingFiltro = this.data.events.filter(evento => evento.date > this.data.currentDate)
                this.pastFiltro = this.data.events.filter(evento => evento.date < this.data.currentDate)
                let porcentajeEventos = this.newPropiedadPorcentaje(this.data)
                this.maxCapacidad(this.data.events)
                this.maxPercentaje(porcentajeEventos)
                this.minPercentaje(porcentajeEventos)
                
                
    })
    .catch(err => console.log (err))
},
methods:{
        ingreso : function (prices, estimateAssistance){
        let ingre = prices * estimateAssistance
        return ingre.toLocaleString()
    },
        porcentajeDeAsistencia : function (capacity, estimateAssistance ){
        let porcentaje = (estimateAssistance / (capacity/100) ).toFixed(2) 
        return porcentaje 

    },
        newPropiedadPorcentaje: function (data){
            
        let list = []
        let filteredAssistance = data.events.filter(event => event.assistance)

        for (let i = 0; i < filteredAssistance.length; i++) {
            list.push(filteredAssistance[i]);
            
        
        
            list[i].percentage = this.porcentajeDeAsistencia(list[i].capacity, list[i].assistance);
           
    }
    
    return [...list.sort((event1, event2) => event2.percentage - event1.percentage)]
    
        },
        maxPercentaje : function (evento2){
            let ordenMax = [...evento2.sort((event1, event2)=> event2.percentaje - event1.percentaje)]
           this.percentajeMinMax[0] = {name:ordenMax[0].name + " with" , percentaje:ordenMax[0].percentaje + "%" }
        },
        minPercentaje : function (evento2){
            let ordenMin = [...evento2.sort((event1, event2) => event1.percentaje - event2.percentaje )]
           this.percentajeMinMax[1] = {name: ordenMin[0].name + "with", percentaje: ordenMin[0].percentaje + "%"}
        },
        maxCapacidad : function (evento){
            let capacidadMinMax = evento.sort((event1, event2)=> event2.capacity - event1.capacity)
            this.percentajeMinMax[2] = {name: capacidadMinMax[0].name + "with", capacity: (capacidadMinMax[0].capacity).toLocaleString() + " of capacity."}
        }


}
}).mount("#app")














/*let $stat1 = document.getElementById("tabla1")
let $stat2 = document.getElementById("tabla2")
let $stat3 = document.getElementById("tabla3")

let list;

fetch("https://mindhub-xj03.onrender.com/api/amazing") 
.then(response => response.json()) 
.then(datos => {
    list = datos
    generadorPast (list, $stat3)
    generadorUpcoming (list, $stat2)
    mayorCapacity(list.eventos)
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

function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}



// Funcion de porcentaje capacidad por asistencia o estimado

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
}*/
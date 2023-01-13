const  { createApp } = Vue

createApp( {
    data(){
        return {
            
            eventos : undefined,
            categorias: undefined,
            valorDeBusqueda:"",
            checked:[],
            eventosFiltrados:[],
            currentDate:[],
            
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(datos => datos.json())
        
        .then(datos => {
           
                
                 this.eventos = datos.events.filter(pastEvent =>pastEvent.date <= datos.currentDate)
                 this.eventosFiltrados = [... this.eventos],
                 this.categorias = [...new Set(this.eventos.map(evento => evento.category) )]
                 
        
        } ) 
        .catch( err => console.log(err))
    },
    methods:{
        filtroCruzado: function(){
            
            let filtroPorSearch = this.eventos.filter( evento => evento.name.toLowerCase().includes( this.valorDeBusqueda.toLowerCase()))
            if( this.checked.length === 0 ){
                this.eventosFiltrados = filtroPorSearch
            }else{
                let filtroPorCheck = filtroPorSearch.filter( evento => this.checked.includes( evento.category ))
                this.eventosFiltrados = filtroPorCheck 
        } 
    }
        }
}).mount('#app')

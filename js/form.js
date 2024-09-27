form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
            )
        textWhatsapp(data)
        cleanForm(form)    
        })

const cleanForm = form => {
    for(let i=0; i < form.length; i++){
        if(form[i].type=='number'){
            form[i].value=null;
        } else {
            form[i].value=''
        }
    }
}

const textWhatsapp = data => {
    let URL = [];
    // let urlWhatsapp = "https://api.whatsapp.com/send?phone=5492915049023&text=";
    let stringNombre = `%2ANombre:%2A ${data.nombre}.`
    stringNombre = stringNombre.split(' ')
    stringNombre = stringNombre.join('%20')
    let stringCantidad = `%2A¿Cuantos son%3F%2A ${data.cantidad}`
    stringCantidad = stringCantidad.split(' ')
    stringCantidad = stringCantidad.join('%20')
    let asistePlural = "Obvio que vamos!"
    let noAsistePlural = "Nos lo perdemos :("
    let asisteSingular = "Obvio que voy!"
    let noAsisteSingular = "Me lo pierdo :("
    
    let stringAsiste = "%2A¿Vas%3F%2A "
    let stringAsisteRespuesta = data.cantidad > 1 
    ? (data.asiste == "Si" ? asistePlural : noAsistePlural) 
    : (data.asiste == "Si" ? asisteSingular : noAsisteSingular)
    stringAsiste = stringAsiste + stringAsisteRespuesta
    stringAsiste = stringAsiste.split(' ')
    stringAsiste = stringAsiste.join('%20')
    URL.push(urlWhatsapp)
    URL.push(stringNombre)
    URL.push(stringCantidad)
    URL.push(stringAsiste)
    
    if(data.menu) {
        let stringMenu = `%2AMenu:%2A ${data.menu}.`
        stringMenu = stringMenu.split(' ')
        stringMenu = stringMenu.join('%20')
        URL.push(stringMenu)
    }
    if(data.cancion){
        let stringCancion = `%2ACancion:%2A ${data.cancion}`
        stringCancion = stringCancion.split(' ')
        stringCancion = stringCancion.join('%20')
        URL.push(stringCancion)
    }
    urlWhatsapp = URL.join("%0A")
    window.open(urlWhatsapp)
}


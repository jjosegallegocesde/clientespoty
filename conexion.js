//Rutinas para hablar con uns ervidor desde el cliente
//RUTINAS PARA CONSUMIR UN API CON JS PURO

//Rutina para hacer una peticion de tipo POST
const URLPOST="https://accounts.spotify.com/api/token";

let llave1="grant_type=client_credentials";
let llave2="client_id=ab4ffa1172314e58a1418e3a2f451375";
let llave3="client_secret=4f35277754b340b6bc58968a06d95d5a";

let peticionPOST={

    method:"POST",
    headers:{"Content-Type": 'application/x-www-form-urlencoded'},
    body:llave1+'&'+llave2+'&'+llave3


}


fetch(URLPOST,peticionPOST)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
       
        let token=`${datos.token_type} ${datos.access_token}`;
        solicitarCanciones(token);
        
    });


function solicitarCanciones(token){

    let URL="https://api.spotify.com/v1/artists/3YcBF2ttyueytpXtEzn1Za/top-tracks?market=US";

    let peticionGET={
        method:"GET",
        headers:{Authorization:token}
    }

    fetch(URL,peticionGET)
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(datos){
       depurarDatos(datos);
    })
}

function depurarDatos(datos){

    let pistas=datos.tracks;
    let datosFiltrados=pistas.map(function(pista){
        return{
            nombre:pista.name,
            audio:pista.preview_url,
            foto:pista.album.images[0].url,
            popularidad:pista.popularity
        }
    })
    console.log(datosFiltrados);
    pintarDatos(datosFiltrados);

}

function pintarDatos(datosFiltrados){

    let contenedorPadre=document.getElementById("contenedorPadre");

    datosFiltrados.map(function(pista){

        //PINTAR UN DIV CON LA CLASE COL
        let contenedorColumna=document.createElement("div");
        contenedorColumna.classList.add("col");

        //PINTAR UN DIV CON LA CLASE CARD
        let tarjeta=document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");

        //PINTAR UNA IMG con la clase card-img-top
        let foto=document.createElement("img");
        foto.classList.add("card-img-top");
        foto.src=pista.foto;

        //pintar un h5

        //pintar audio


        //**************************/
        //NECESITO INDICAR QUE LA FOTO VA DENTRO DE LA TARJETA
        tarjeta.appendChild(foto);
        

        //NECESITO INDICAR QUE LA TARJETA VA DENTRO DEL CONTENEDOR COLUMNA
        contenedorColumna.appendChild(tarjeta);

        //NECESITO INDICAR QUE EL CONTENEDOR COLUMNA VA DENTRO DEL CONTENEDOR PADRE
        contenedorPadre.appendChild(contenedorColumna);



    })


}


     
        
    





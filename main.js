function pAJAX(url, metodo, callback) {
    var peticion_http;
    var datos;
    metodo = metodo.toUpperCase()
    // Obtener la instancia del objeto XMLHttpRequest
    peticion_http = new XMLHttpRequest();
    // Preparar la funcion de respuesta
    peticion_http.onreadystatechange = function () {
        if (peticion_http.readyState == 4) {
            if (peticion_http.status == 200) {
                datos = JSON.parse(peticion_http.responseText);
                callback(datos)
            }
        }
    };
    // Realizar peticion HTTP
    peticion_http.open(metodo, url);
    peticion_http.send(null);
}

function muestraDatos(datos) {
    document.getElementById("cuerpoTabla").innerHTML = "";

    var arrayOrdenado = [];
    datos.forEach(element => {
        var objeto = new Object({
            image: element.image,
            name: element.name,
            corto: element.symbol,
            ath: element.ath,
            ath_change: element.ath_change_percentage,
            market_cap: element.market_cap,
            current_price: element.current_price,
            low_24h: element.low_24h,
            high_24h: element.high_24h,
            price_change_percentage_24h: element.price_change_percentage_24h
        });
        arrayOrdenado.push(objeto);
    });

    crearTabla(arrayOrdenado);


    console.log(arrayOrdenado);


}

function formatearNumeroConSeparador(numero) {
    return numero.toLocaleString('es-ES');
  }

function crearTabla(array) {
    let fila;
    let tbody = document.getElementById("cuerpoTabla");
    for (let i = 0; i < array.length; i++) {
        let td = document.createElement("td");
        
        let div1 = document.createElement("div");
        div1.className="todo";
        let div2 = document.createElement("div");
        div2.className="arribaIzquierda";
        let div3 = document.createElement("div");
        div3.className="arribaDerecha";
        let div4 = document.createElement("div");
        let div5 = document.createElement("div");


        //Arriba izquierda
        let img = document.createElement("img");
        img.src = array[i].image;
        img.className="imagenCripto";
        div2.appendChild(img);

        let nombreCripto = document.createElement("span");
        nombreCripto.innerHTML =  array[i].name;
        nombreCripto.className="nombreCripto";
        div2.appendChild(nombreCripto);

        let abreviacionCripto = document.createElement("span");
        abreviacionCripto.innerHTML = array[i].corto;
        abreviacionCripto.className="abreviacionCripto";
        div2.appendChild(abreviacionCripto);


        //Arriba derecha
        let precioActual = document.createElement("span");
        precioActual.innerHTML = "$"+formatearNumeroConSeparador(array[i].current_price);
        precioActual.className="precioActual";
        div3.appendChild(precioActual);

        let divPrecioBajo = document.createElement("div");
        let colorPrecioBajo = document.createElement("span");
        colorPrecioBajo.innerHTML = "Low 24: ";
        colorPrecioBajo.className="colorPrecioBajo";
        let precioBajo = document.createElement("span");
        precioBajo.innerHTML = "$"+formatearNumeroConSeparador(array[i].low_24h);
        precioBajo.className="precioBajo";
        divPrecioBajo.appendChild(colorPrecioBajo);
        divPrecioBajo.appendChild(precioBajo);
        div3.appendChild(divPrecioBajo);

        let divPrecioAlto = document.createElement("div");
        let colorPrecioAlto = document.createElement("span");
        colorPrecioAlto.innerHTML = "High 24: ";
        colorPrecioAlto.className="colorPrecioAlto";
        let precioAlto = document.createElement("span");
        precioAlto.innerHTML = "$"+formatearNumeroConSeparador(array[i].high_24h);
        precioAlto.className="precioAlto";
        divPrecioAlto.appendChild(colorPrecioAlto);
        divPrecioAlto.appendChild(precioAlto);
        div3.appendChild(divPrecioAlto);
        


        td.appendChild(div1);
        div1.appendChild(div2);
        div1.appendChild(div3);
        div1.appendChild(div4);
        div1.appendChild(div5);
        
        if(i==0 || i%4==0){
            fila = document.createElement("tr");
            tbody.appendChild(fila);
        }
        fila.appendChild(td);

        
    }
}


window.onload = function () {
    let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=120&page=1";
    pAJAX(url, "get", muestraDatos);

};
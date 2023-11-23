function pFetch(url, options, callback) {
    options.method = options.method.toUpperCase()
    fetch(url,options)
        .then(response => response.json())
        .then(data => callback(data))
}

function muestraDatos(datos) {
    document.getElementById("cuerpoTabla").innerHTML = "";
    document.getElementById("imagenCarga").style.display = "none";

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

    document.getElementById("buscador").addEventListener("keyup", function (e) {
        filtrarObjetos(arrayOrdenado);
    })

}

function filtrarObjetos(objetos) {
    document.getElementById("cuerpoTabla").innerHTML = "";
    let buscador = document.getElementById("buscador");
    var busquedaTexto = buscador.value.toLowerCase();

    var objetosFiltrados = objetos.filter(function(objeto) {
        return objeto.name.toLowerCase().includes(busquedaTexto);
    });

    
    crearTabla(objetosFiltrados);
}

function formatearNumeroConSeparador(numero) {
    // Verificar si el número es decimal
    const esDecimal = Number.isInteger(numero) ? false : true;

    // Configuración regional para separadores de miles y decimales
    const opciones = {
        maximumFractionDigits: esDecimal ? 2 : 0,
        minimumFractionDigits: esDecimal ? 2 : 0,
        useGrouping: true, // Usar separadores de miles
        // Configuración regional específica para tener coma como separador decimal
        style: 'decimal',
        decimalSeparator: '.',
        groupingSeparator: ',',
    };

    // Formatear el número con separadores de miles y decimales
    const numeroFormateado = numero.toLocaleString('en-EN', opciones);

    return numeroFormateado;
}

function crearTabla(array) {
    let fila;
    let tbody = document.getElementById("cuerpoTabla");
    tbody.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        let td = document.createElement("div");
        td.className = "td";
        
        let div1 = document.createElement("div");
        div1.className="todo";
        let div2 = document.createElement("div");
        div2.className="arribaIzquierda";
        let div3 = document.createElement("div");
        div3.className="arribaDerecha";
        let div4 = document.createElement("div");
        div4.className="abajoIzquierda";


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
        abreviacionCripto.innerHTML = (array[i].corto).toUpperCase();
        abreviacionCripto.className="abreviacionCripto";
        div2.appendChild(abreviacionCripto);


        //Arriba derecha
        let precioActual = document.createElement("span");
        precioActual.innerHTML = "$"+formatearNumeroConSeparador(array[i].current_price);
        precioActual.className="precioActual";
        div3.appendChild(precioActual);

        let divPrecioBajo = document.createElement("div");
        divPrecioBajo.id ="divPrecioBajo";
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
        divPrecioAlto.id ="divPrecioAlto";
        let colorPrecioAlto = document.createElement("span");
        colorPrecioAlto.innerHTML = "High 24: ";
        colorPrecioAlto.className="colorPrecioAlto";
        let precioAlto = document.createElement("span");
        precioAlto.innerHTML = "$"+formatearNumeroConSeparador(array[i].high_24h);
        precioAlto.className="precioAlto";
        divPrecioAlto.appendChild(colorPrecioAlto);
        divPrecioAlto.appendChild(precioAlto);
        div3.appendChild(divPrecioAlto);
        
        //Abajo
        let divAth = document.createElement("div");
        let colorAth = document.createElement("span");
        colorAth.innerHTML = "ATH: ";
        colorAth.className="colorAth";
        let Ath = document.createElement("span");
        Ath.innerHTML = "$"+formatearNumeroConSeparador(array[i].ath);
        Ath.className="Ath";
        divAth.appendChild(colorAth);
        divAth.appendChild(Ath);
        div4.appendChild(divAth);

        let divAthChange = document.createElement("div");
        let colorAthChange = document.createElement("span");
        colorAthChange.innerHTML = "ATH Change: ";
        colorAthChange.className="colorAth";
        let AthChange = document.createElement("span");
        AthChange.innerHTML = "$"+formatearNumeroConSeparador(array[i].ath_change);
        AthChange.className="AthChange";
        divAthChange.appendChild(colorAthChange);
        divAthChange.appendChild(AthChange);
        div4.appendChild(divAthChange);

        let divMkCap = document.createElement("div");
        let colorMkCap = document.createElement("span");
        colorMkCap.innerHTML = "Mk. Cap: ";
        colorMkCap.className="colorAth";
        let mkCap = document.createElement("span");
        mkCap.innerHTML = "$"+formatearNumeroConSeparador(array[i].market_cap);
        mkCap.className="mkCap";
        divMkCap.appendChild(colorMkCap);
        divMkCap.appendChild(mkCap);
        div4.appendChild(divMkCap);






        td.appendChild(div1);
        div1.appendChild(div2);
        div1.appendChild(div3);
        div1.appendChild(div4);
        
        if(i==0 || i%3==0){
            fila = document.createElement("div");
            fila.id ="tr";
            tbody.appendChild(fila);
        }
        fila.appendChild(td);

        
    }
}


window.onload = function () {
    let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=120&page=1";
    let options = {
        method : "get"
    }
    pFetch(url, options, muestraDatos);

};


//ERROR LOS DIVS SE COLOCAN EN VERTICAL HACIA ABAJO, PRO ESO, NO TODAS LAS LINEAS SE COMPLETAN
//ERROR CON TAMAÑO DE PARTES DE UN DIV, LO CUAL HACE QUE LOS DATOS SE SALGAN
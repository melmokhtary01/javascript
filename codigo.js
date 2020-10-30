class Coche{
    propietario;
    velocidad=0;
    barra;
    constructor(propietario,barra){
        this.propietario=propietario;
        this.barra=barra;
    }
    toString(){
        return "el coche de: "+this.propietario+", va a "+this.velocidad+" Km por hora";
    }
    acelerar(v){
        this.velocidad+=v;
    }
    frenar(v){
        if(v >this.velocidad)
            this.velocidad=0;
        else
            this.velocidad-=v;
    }
}


let c1 = new Coche("pepe","bc1");
let c2 = new Coche("luis","bc2");
let c3 = new Coche("manu","bc3");
let c4 = new Coche("juan","bc4");

// para poner la propiedad max de todas las barra a un valor
//  que almacenaré en la variable maximoBarras
let maximoBarras =100;
let barras= document.getElementsByTagName("progress");
for (let v of barras){
    v.max=maximoBarras;
}




document.getElementById("pc1").innerHTML=c1.toString();
document.getElementById("pc2").innerHTML=c2.toString();
document.getElementById("pc3").innerHTML=c3.toString();
document.getElementById("pc4").innerHTML=c4.toString();

let cochesEnCarrera= [c1,c2,c3,c4];
let podium = [];

let intervalo= setInterval(control, 200);
function control(){
    /*para cada coche que está en la carrera debemos decir se aceleramos o frenamos
      para cada coche que está en la carrera ¿que velocidad vamos a acelerar o frenar?
     para cada coche  que está en la carrera actualizamos la barra de progreso
    si algún coche ha llegado al máximo de la barra de progreso lo damos
    como terminado y no volverá a estar en la carrera y guardaremos su
    posición
     Si ya no quedan coches en la carrera mostraremos los resultados 
    */
   modificaVelocidadDeCochesEnCarrera();
   actualizaBarrasDeProgreso();
}

function modificaVelocidadDeCochesEnCarrera(){
    for(let i=0; i< cochesEnCarrera.length;i++){
        //¿acelero o freno?
        //genero un número aleatorio entre 1 y 2
        // si sale 1 acelero
        // si sale 2 freno
        //la velocidad que se acelera o frena será un valor entre 1 y 5
        if(Math.floor(Math.random() * 2) + 1==1){//acelero
            cochesEnCarrera[i].acelerar(Math.floor(Math.random() * 5) + 1);
        }else{//freno
            cochesEnCarrera[i].frenar(Math.floor(Math.random() * 5) + 1);
        }
    }
}
function actualizaBarrasDeProgreso(){
    for(let i=0; i< cochesEnCarrera.length;i++){
        let v = cochesEnCarrera[i].velocidad;
        let barra =document.getElementById(cochesEnCarrera[i].barra);
        barra.value+=v;
        if(barra.value>=maximoBarras){
            //este coche ha terminado y lo tengo que pasar al array
            //de podium
            podium.push(cochesEnCarrera[i]);
            //sacar cochesEnCarrera[i] del array cochesEnCarrera[i]
            cochesEnCarrera.splice(i,1);i--;//ojo que estamos modificando i
            //la modificación de i es para que se vuelva a analizar la posición i
            //pues ahora la ocupará el elemento del array que ocupaba 
            //la siguiente posición.
        }
    }
    if(cochesEnCarrera.length==0){//entonces hemos terminado
        console.log("orden de llegada:");
        for(let coche of podium){
            console.log(coche.propietario);
        }
        clearInterval(intervalo);
    }
}
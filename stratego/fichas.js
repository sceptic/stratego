/**
 * Created by adrian on 22/05/15.
 */

/**
 * Created by adrian on 20/05/15.
 */
goog.provide('stratego.Fichas');

goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('stratego.Config');


stratego.Fichas = function(color, ancho_ficha, alto_ficha, user){

    lime.Sprite.call(this);


    this.formacion = (user.user.formacion =="")? "" : JSON.parse(user.user.formacion);
    this.color = color;
    this.ancho_ficha = ancho_ficha;
    this.alto_ficha = alto_ficha;
    this.user = user;

    if(this.color == "Rojas"){
        var img_oculta = "#B20000";
    }else{
        var img_oculta = "#0059B2";
    }

    //if(this.color == "Mixtas") this.color ="M";

    var config = new stratego.Config();

    this.personajes = [

        // Bandera
        {id:1, nombre:"Bandera",img_oculto : img_oculta, img:"img/"+this.color+"/bandera.png", index:0},
        ////////////////////////////////
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:1},
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:2},
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:3},
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:4},
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:5},
        {id:2, nombre:"Bomba",img_oculto : img_oculta, img:"img/"+this.color+"/bomba.png", index:6},

        {id:3, nombre:"Espia",img_oculto : img_oculta, img:"img/"+this.color+"/espia.png", index:7},

        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:8},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:9},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:10},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:11},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:12},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:13},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:14},
        {id:4, nombre:"Explorador",img_oculto : img_oculta, img:"img/"+this.color+"/explorador.png", index:15},

        {id:5, nombre:"Minador",img_oculto : img_oculta, img:"img/"+this.color+"/minero.png", index:16},
        {id:5, nombre:"Minador",img_oculto : img_oculta, img:"img/"+this.color+"/minero.png", index:17},
        {id:5, nombre:"Minador",img_oculto : img_oculta, img:"img/"+this.color+"/minero.png", index:18},
        {id:5, nombre:"Minador",img_oculto : img_oculta, img:"img/"+this.color+"/minero.png", index:19},
        {id:5, nombre:"Minador",img_oculto : img_oculta, img:"img/"+this.color+"/minero.png", index:20},


        {id:6 , nombre:'Sargento',img_oculto : img_oculta, img:"img/"+this.color+"/sargento.png", index:21},
        {id:6 , nombre:'Sargento',img_oculto : img_oculta, img:"img/"+this.color+"/sargento.png", index:22},
        {id:6 , nombre:'Sargento',img_oculto : img_oculta, img:"img/"+this.color+"/sargento.png", index:23},
        {id:6 , nombre:'Sargento',img_oculto : img_oculta, img:"img/"+this.color+"/sargento.png", index:24},

        {id:7 , nombre:'Teniente',img_oculto : img_oculta, img:"img/"+this.color+"/teniente.png", index:25},
        {id:7 , nombre:'Teniente',img_oculto : img_oculta, img:"img/"+this.color+"/teniente.png", index:26},
        {id:7 , nombre:'Teniente',img_oculto : img_oculta, img:"img/"+this.color+"/teniente.png", index:27},
        {id:7 , nombre:'Teniente',img_oculto : img_oculta, img:"img/"+this.color+"/teniente.png", index:28},


        {id:8 , nombre:'Capitán',img_oculto : img_oculta, img:"img/"+this.color+"/capitan.png", index:29},
        {id:8 , nombre:'Capitán',img_oculto : img_oculta, img:"img/"+this.color+"/capitan.png", index:30},
        {id:8 , nombre:'Capitán',img_oculto : img_oculta, img:"img/"+this.color+"/capitan.png", index:31},
        {id:8 , nombre:'Capitán',img_oculto : img_oculta, img:"img/"+this.color+"/capitan.png", index:32},

        {id:9 , nombre:'Comandante',img_oculto : img_oculta, img:"img/"+this.color+"/comandante.png", index:33},
        {id:9 , nombre:'Comandante',img_oculto : img_oculta, img:"img/"+this.color+"/comandante.png", index:34},
        {id:9 , nombre:'Comandante',img_oculto : img_oculta, img:"img/"+this.color+"/comandante.png", index:35},


        {id:10 , nombre:'Coronel',img_oculto : img_oculta, img:"img/"+this.color+"/coronel.png", index:36},
        {id:10 , nombre:'Coronel',img_oculto : img_oculta, img:"img/"+this.color+"/coronel.png", index:37},

        {id:11 , nombre:'General',img_oculto : img_oculta, img:"img/"+this.color+"/general.png", index:38},

        {id:12 , nombre:'Mariscal',img_oculto : img_oculta, img:"img/"+this.color+"/mariscal.png", index:39}
    ];



}

goog.inherits(stratego.Fichas, lime.Sprite);

var color = stratego.Fichas.prototype;
var personajes = stratego.Fichas.prototype;
var formacion = stratego.Fichas.prototype;

var ancho_ficha = stratego.Fichas.prototype;
var alto_ficha = stratego.Fichas.prototype;
var user = stratego.Fichas.prototype;


stratego.Fichas.prototype.ordenarFichas = function(){

}


stratego.Fichas.prototype.crearFichas = function(){

    var fichas = [];


    for(var i = 0; i < this.personajes.length; i++)
    {
        var personaje = this.personajes[i];
        var ficha = new lime.Sprite()
            .setSize(this.ancho_ficha, this.alto_ficha);



        if(this.color == 'Mixtas')
        {
            ficha.setFill(personaje.img);
        }else{
            if(localStorage.miColor == this.color)
            {
                ficha.setFill(personaje.img);
            }else{
                ficha.setFill(personaje.img_oculto);
            }
        }



        ficha.tipo="ficha";
        ficha.color = this.color;
        ficha.id = personaje.id;
        ficha.nombre = personaje.nombre;
        ficha.img = personaje.img;
        ficha.index = personaje.index;
        ficha.player = this.user.id;



        if(this.formacion != ''){
            console.log("formacion:",this.formacion);
            var fichasStorage = this.formacion;
            //console.log(fichasStorage);
            ficha.casilla_id = this.formacion[i];
            fichas[this.formacion[i]] = ficha;
            //console.log(fichasStorage[1]);
            //console.log(fichas);
        }else{
            ficha.casilla_id = null;
            fichas.push(ficha);
        }

    }

    return fichas;
}



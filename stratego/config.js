/**
 * Created by adrian on 20/05/15.
 */
//set main namespace
goog.provide('stratego.Config');


stratego.Config = function(){
    var lado_corto = (window.innerWidth < window.innerHeight)? window.innerWidth : window.innerHeight;

    console.log(lado_corto);

    var config = {
        ancho:lado_corto,
        alto: lado_corto,
        lado_corto: lado_corto

    }
    return config;
}

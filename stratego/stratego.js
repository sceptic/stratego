
//set main namespace
goog.provide('stratego');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.GlossyButton');
goog.require('stratego.Config');
goog.require('stratego.Tablero');
goog.require('stratego.Preparacion');

// entrypoint
stratego.start = function(escena_juego) {

    localStorage.fichas = "2,13,4,5,6,7,8,9,10,0,1,12,3,14,15,16,18,17,28,19,11,20,21,22,23,37,25,26,27,29,35,30,31,32,33,34,24,38,39,36";


    console.log(stratego);
    var config = new stratego.Config();

    if(jQuery('#canvas').length == 0){
        var div = document.createElement("div");
        div.id="canvas";
        div.setAttribute("style", "width: "+window.innerWidth+"px;height:"+window.innerHeight+"px;");
        document.body.appendChild(div);
    }else{
        jQuery('#canvas').html('')
        var div = document.getElementById('canvas');
    }

    var director = new lime.Director(div);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);




    switch(escena_juego){
        case 'jugar':

            // game scene //////////////////////////////////////////////
            var initialScene = new stratego.Tablero(config);
            var gameScene = new lime.Scene().setRenderer();
            var gameLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
            gameScene.appendChild(gameLayer);
            director.replaceScene(initialScene.escena,lime.transitions.SlideInRight);

            break;
        case 'preparar_fichas':
            director.removeAllChildren();
            // game scene //////////////////////////////////////////////
            var initialScene = new stratego.Preparacion();
            var gameScene = new lime.Scene().setRenderer();
            var gameLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
            gameScene.appendChild(gameLayer);
            director.replaceScene(initialScene.escena);

            break;
    }










}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('stratego.start', stratego.start);

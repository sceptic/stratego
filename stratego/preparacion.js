/**
 * Created by adrian on 22/05/15.
 */
goog.provide('stratego.Preparacion');

goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('lime.GlossyButton');
goog.require('stratego.Config');
goog.require('stratego.Fichas');

stratego.Preparacion = function() {
    lime.Sprite.call(this);

    var EVENTS_CLICK = ['mousedown', 'touchstart'];

    var estado=0;
    var seleccion={"a":null,"b":null};

    function touched(target){

        console.log(target);
       // console.debug(seleccion);

        if(target.tipo == "casilla" && estado == 1){
            seleccion.b = target;
            var movimiento = new lime.animation.MoveTo(seleccion.b.position_.x,seleccion.b.position_.y).setDuration(0.5);
            seleccion.a.casilla_id = seleccion.b.id;
            seleccion.a.runAction(movimiento);

            console.log("FICHA---->",seleccion.a);

            seleccion={"a":null,"b":null};
            estado= 0;
            return;
        }


        if(target.tipo == "ficha"  && estado == 0){

            estado = 1;
            seleccion.a = target;
            return;
        }

        if(estado == 1 ){
            seleccion.b = target;
            var movimiento1 = new lime.animation.MoveTo(seleccion.b.position_.x,seleccion.b.position_.y).setDuration(0.5);
            var movimiento2 = new lime.animation.MoveTo(seleccion.a.position_.x,seleccion.a.position_.y).setDuration(0.5);

            var casillaA = seleccion.a.casilla_id;
            var casillaB = seleccion.b.casilla_id;

            seleccion.b.casilla_id = casillaA;
            seleccion.a.casilla_id = casillaB;
            console.log("FICHA---->",seleccion.a);
            console.log("FICHA---->",seleccion.b);

            seleccion.a.runAction(movimiento1);
            seleccion.b.runAction(movimiento2);

            seleccion={"a":null,"b":null};
            estado = 0;
        }else{
            seleccion={"a":null,"b":null};
            estado = 0;
            console.log(seleccion)
        }

        return;
    }




    var config = stratego.Config();
    var sizeCasilla = config.ancho/10;
    var casillas = [];
    var fichas_final = [];


    var Fichas = new stratego.Fichas("Mixtas",sizeCasilla-5,sizeCasilla-5,  my_player);
    var fichas= Fichas.crearFichas();

    console.log("FICHAS-AAAA::::: ",fichas);





    var fichas_jugador = fichas.length;

    var total_casillas = 100;
    var index_colocacion_fichas = (total_casillas -1) - fichas_jugador;
    var index_fichas = 0;


    var scene = new lime.Scene().setRenderer();


    // inital scene //////
    var initialLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS);

    var initialContainer = new lime.Sprite().setPosition(0,0).setSize(config.ancho,config.alto).setFill('#123456').setAnchorPoint(0,0);

    /*
     var initialTitle = new lime.Label().setText('WELCOME').setFontFamily('Arial').setFontColor('#000000').
     setFontSize(20).setAnchorPoint(0,0).setPosition(150,60);
     */
    initialLayer.appendChild(initialContainer);



    var fila = 0; var columna = 0;
    for( var i = 0 ; i < total_casillas; i++)
    {

        if(i> 0 && i % 10 == 0)
        {
            fila = 0;
            columna ++;
        }


        var posX = (fila*sizeCasilla)+(sizeCasilla/2);
        var posY = (columna*sizeCasilla)+(sizeCasilla/2);

        if(i < fichas.length)
        {
            var casilla = new lime.Sprite()
                .setSize(sizeCasilla-1,sizeCasilla-1)
                .setFill('#ccc')
                .setPosition(posX,posY);
            casilla.tipo="casilla";
            casilla.id=i;

            goog.events.listen(casilla,EVENTS_CLICK, function(e){
                e.event.stopPropagation();
                touched(e.currentTarget);
            });
            initialLayer.appendChild(casilla);

            if(Fichas.formacion != "")
            {
                var ficha = fichas[i];

                goog.events.listen(ficha,EVENTS_CLICK, function(e){
                    e.event.stopPropagation();
                    touched(e.currentTarget);
                    e.currentTarget.parent_.setChildIndex(e.currentTarget, e.currentTarget.parent_.getNumberOfChildren()-1)
                });

                ficha.setPosition(posX,posY);
                initialLayer.appendChild(ficha);

            }
        }

        if(i > 49)
        {
            var casilla = new lime.Sprite()
                .setSize(sizeCasilla-1,sizeCasilla-1)
                .setFill('#ccc')
                .setPosition(posX,posY);
            casilla.tipo="casilla";
            casilla.id=null;

            goog.events.listen(casilla,EVENTS_CLICK, function(e){
                e.event.stopPropagation();
                touched(e.currentTarget);
            });
            initialLayer.appendChild(casilla);

        }

        if(i == 41) {
            var finalBtn = new lime.Sprite()
                .setSize(sizeCasilla * 2, sizeCasilla - 1)
                .setFill('#8765432')
                .setPosition(posX, posY);
            initialLayer.appendChild(finalBtn);

            goog.events.listen(finalBtn,EVENTS_CLICK, function (e) {

                console.log("antes FICHAS:compare", fichas)
                function compare(a,b) {
                    if (a.casilla_id < b.casilla_id)
                        return -1;
                    if (a.casilla_id > b.casilla_id)
                        return 1;
                    return 0;
                }

                fichas.sort(compare);

                console.log("FICHAS:compare", fichas)

                fichas_final = [];
                var fichas_nombre = [];
                for(var index = 0; index< fichas.length; index++)
                {


                    var ficha = fichas[index];
                    console.log(ficha.nombre)

                    fichas_final.push(ficha.index);
                    fichas_nombre.push(ficha.nombre);


                    if(fichas[index].casilla_id ==null)
                    {
                        fichas_final = [];
                        alert("FALTA POSICIONAR PIEZAS");

                        return false;
                    }else{


                        //localStorage.fichas = fichas_final;

                    }
                }



                console.log("fichas_nombre",fichas_nombre);


                $.post( socket_host+"update-formacion", {fichas_final:'['+fichas_final.toString()+']', user_id:my_player.user.id}).done(function( data ) {
                    console.log("UPDATE FORMACION",data);
                });
                console.log("FICHAS::::: ",'['+fichas_final.toString()+']');

                socket.emit('PREPARACION FICHAS', {formacion:'['+fichas_final.toString()+']', user_id:my_player.user.id});
                irA('#inicio');
                gotoLobby();

                initialLayer.removeAllChildren();

                jQuery('#canvas').hide();
                //stratego.start('jugar');
                return true;
            });

        }



            if(i > index_colocacion_fichas && Fichas.formacion == "")
            {
                var ficha = fichas[index_fichas];


                goog.events.listen(ficha,EVENTS_CLICK, function(e){
                    e.event.stopPropagation();
                    touched(e.currentTarget);
                });

                ficha.setPosition((fila*sizeCasilla)+(sizeCasilla/2),(columna*sizeCasilla)+(sizeCasilla/2));


                initialLayer.appendChild(ficha);
                index_fichas++;
            }


        fila++;
    }




    console.log("INDEXES:");
    console.log(initialLayer)

    scene.appendChild(initialLayer);

    return {
        escena: scene,
        layer: initialLayer,
        config : config
        //,
        //startButton: startButton
    }


};
goog.inherits(stratego.Preparacion, lime.Sprite);

var color = stratego.Preparacion.prototype;



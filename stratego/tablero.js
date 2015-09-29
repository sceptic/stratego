

/**
 * Created by adrian on 20/05/15.
 */
goog.provide('stratego.Tablero');

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
//goog.require('stratego.Player');


stratego.Tablero = function(config){
    if(localStorage.miColor == "Azules")
    {
       var turno = "on";
    }else{
        var turno ="off";
    }
    var estado = 0;
    var seleccion={"a":null,"b":null};
    var CLICK_TAGS = ['mousedown', 'touchstart'];
    var fichasRojas;
    var fichasAzules;



    var compararFichas = function(a,b){

        if(a.id == 5 && b.id == 2)
        {
            return 'a';
        }else if(a.id != 5 && b.id == 2)
        {
            return  'b';
        }else if(a.id == 2 && b.id == 12)
        {
            return  'a';
        }else if(a.id > b.id)
        {
            return  'a';
        }else if(a.id < b.id)
        {
            return 'b';
        }else if(a.id == b.id)
        {
            return  'c';
        }

    }










    //////////////////////////////////////////////////////////////////////
    // MOVIENDO PIEZAS:
    /////////////////////////////////////////////////////////////////////
    socket.on("FICHA vs FICHA", function(data){
        console.log("on FICHA vs FICHA", data);



        var fichaA;
        var fichaB;
        var ArrA;
        var ArrB;
        if(data.enemy == my_player.id){
            //alert("YESSSS");
            if(localStorage.miColor == "Azules"  )
            {
                ArrA = fichasRojas;
                ArrB = fichasAzules;
            }else{
                ArrA = fichasAzules;
                ArrB = fichasRojas;
            }
        }else{
            if(localStorage.miColor == "Azules"  )
            {
                ArrA = fichasAzules;
                ArrB = fichasRojas;

            }else{
                ArrA = fichasRojas;
                ArrB = fichasAzules;
            }
        }


        for(var index = 0; index< ArrA.length; index++)
        {
            if(ArrA[index].index == data.a){
                fichaA =  ArrA[index];
            }
        }
        for(var index = 0; index< ArrB.length; index++)
        {
            if(ArrB[index].index == data.b){
                fichaB =  ArrB[index];
            }
        }

        fichaVsFicha(fichaA,fichaB);

        seleccion={"a":null,"b":null};
        estado = 0;
        if(data.enemy != my_player.id){
            turno = "off";
        }else{
            turno = "on";
        }


    });

    socket.on("IR A CASILLA2", function(data){
        var fichaA;
        var posB;
        var ArrA;
        if(data.color == "Rojas")
        {
            ArrA = fichasRojas;
        }else{
            ArrA = fichasAzules;
        }

        for(var index = 0; index< ArrA.length; index++)
        {
            if(ArrA[index].index == data.a){
                fichaA =  ArrA[index];
            }
        }

        for(var index = 0; index< casillas.length; index++)
        {
            if(casillas[index].id == data.b){
                casilla = casillas[index];
                break;
            }
        }


        moverFichaPlayer2(fichaA, casilla);
        seleccion={"a":null,"b":null};
        estado = 0;
        if(data.enemy != my_player.id){
            turno = "off";
        }else{
            turno = "on";
        }
    });



    function fichaVsFicha(a,b){


        a.parent_.setChildIndex(a, a.parent_.getNumberOfChildren()-1);
        b.parent_.setChildIndex(b, b.parent_.getNumberOfChildren()-1);

        var win = compararFichas(a,b);
        if(win == 'a'){
            console.log("MOVER::");
            console.log(a);
            console.log(b);

            b.setHidden(true);
            //console.log(a.position);
            var movimiento = new lime.animation.MoveTo(b.position_.x,b.position_.y).setDuration(2);
            a.runAction(movimiento);

            info_fichaVSficha(a,b);


            delete seleccion.b;

        }else if(win == 'b'){
            info_fichaVSficha(a,b);
            a.setHidden(true);
            delete a;

        }else if(win == 'c'){
            info_fichaVSficha(a,b);
            a.setHidden(true);
            delete a;

            b.setHidden(true);
            delete b;
        }
    }

    function moverFichaPlayer2(ficha, pos){
        ficha.parent_.setChildIndex(ficha, ficha.parent_.getNumberOfChildren()-1);
        var movimiento = new lime.animation.MoveTo(pos.position_.x,pos.position_.y).setDuration(0.25);
        ficha.runAction(movimiento);

        return;
    }

    function rangoMovimientos(a, b, max){
        var max = max + (max/7);
        var rango = 0;

        if(Math.round(a.position_.x) == Math.round(b.position_.x)){
            if(a.position_.y > b.position_.y){
                rango = a.position_.y - b.position_.y;
                if(rango <= max) return true;
            }else{
                rango = b.position_.y - a.position_.y;
                if(rango <= max) return true;
            }
        }else if(Math.round(a.position_.y) == Math.round(b.position_.y)){
            if(a.position_.x > b.position_.x){
                rango = a.position_.x - b.position_.x;
                if(rango <= max) return true;
            }else{
                rango = b.position_.x - a.position_.x;
                if(rango <= max) return true;
            }
        }else{
            console.log(a.position_.x+"--" +b.position_.x)
            console.log(a.position_.y+"--" +b.position_.y)
        }

        return false;
    }





    function touched(target){

        if(turno == "off") return;


        var player = my_player.id;
        var player_enemy = player2.id;

        if(target.tipo == "casilla" && estado == 1 ){
            seleccion.b = target;
            if(!rangoMovimientos(seleccion.a, seleccion.b, sizeCasilla))
            {
                seleccion.b = null;
                return;
            }
            socket.emit("IR A CASILLA2", {color:localStorage.miColor , a:seleccion.a.index,  b:seleccion.b.id,room:my_player.room, enemy:player2.id});

            return;
        }


        if(target.tipo == "ficha" && target.player == player && estado == 0){

            if(target.id == 1 || target.id == 2) return;

            console.log("TERGET id", target.id);

            console.log(target.tipo +" && "+target.player +"=="+ player);
            console.log(estado);

            estado = 1;
            seleccion.a = target;
            return;
        }

        if(estado == 1 && target.player == player_enemy ) {
            seleccion.b = target;
            if(!rangoMovimientos(seleccion.a, seleccion.b, sizeCasilla))
            {
                seleccion.b = null;
                return;
            }

            if(seleccion.b.id == 1)
            {
                alert("HAS GANADO");
            }

            socket.emit("FICHA vs FICHA", {color:localStorage.miColor , a:seleccion.a.index,  b:seleccion.b.index,room:my_player.room, enemy:player2.id});


        }else if(estado == 1 && target.player == player ){
            seleccion.a = target;
        }else{
            seleccion={"a":null,"b":null};
            estado = 0;
        }

        return;

    }
    /////////////////////////////////////////////////////////////////////

    lime.Sprite.call(this);

    var initialScene = new lime.Scene().setRenderer();


    // inital scene //////
    var initialLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS);

    var initialContainer = new lime.Sprite().setPosition(0,0).setSize(config.ancho,config.alto).setFill('#111').setAnchorPoint(0,0);

    /*
     var initialTitle = new lime.Label().setText('WELCOME').setFontFamily('Arial').setFontColor('#000000').
     setFontSize(20).setAnchorPoint(0,0).setPosition(150,60);
     */
    initialLayer.appendChild(initialContainer);

    var sizeCasilla = config.ancho/10;

    var casillas = [];
    if(localStorage.miColor == "Rojas")
    {
        var FichasRojas = new stratego.Fichas("Rojas", sizeCasilla-7,sizeCasilla-7, my_player);
        var FichasAzules = new stratego.Fichas("Azules", sizeCasilla-7,sizeCasilla-7,player2);
    }else{
        var FichasRojas = new stratego.Fichas("Rojas", sizeCasilla-7,sizeCasilla-7, player2);
        var FichasAzules = new stratego.Fichas("Azules", sizeCasilla-7,sizeCasilla-7, my_player);
    }


    fichasRojas= FichasRojas.crearFichas();
    fichasAzules= FichasAzules.crearFichas();

    //console.log(fichasRojas);

    fichasRojas.reverse();

    var total_rojas = fichasRojas.length;
    var total_azules = fichasAzules.length;

    inicio_rojas = 100 - total_rojas;


    var fila = 0; var columna = 0;
    for( var i = 0 ; i < 100; i++)
    {

        if(i> 0 && i % 10 == 0)
        {
            fila = 0;
            columna ++;
        }


        if(i != 43 && i != 42 && i != 46 && i != 47 && i != 53 && i != 52 && i != 56 && i != 57)
        {
            var casilla = new lime.Sprite()
                .setSize(sizeCasilla-1,sizeCasilla-1)
                .setFill('img/back/'+i+'.jpg')
                .setPosition((fila*sizeCasilla)+(sizeCasilla/2),(columna*sizeCasilla)+(sizeCasilla/2));
            casilla.tipo="casilla";
            casilla.id = i;
            casillas.push(casilla);

            goog.events.listen(casilla, CLICK_TAGS, function(e){
                e.event.stopPropagation();
                touched(e.currentTarget);

            });
        }else{
            var casilla = new lime.Sprite()
                .setSize(sizeCasilla-1,sizeCasilla-1)
                .setFill('img/back/'+i+'.jpg')
                .setPosition((fila*sizeCasilla)+(sizeCasilla/2),(columna*sizeCasilla)+(sizeCasilla/2));
            casilla.id = i;
            casillas.push(casilla);
        }


        if(i < fichasAzules.length)
        {
            fichasAzules[i].setPosition((fila*sizeCasilla)+(sizeCasilla/2),(columna*sizeCasilla)+(sizeCasilla/2));
            goog.events.listen(fichasAzules[i], CLICK_TAGS, function(e){
                e.currentTarget.parent_.setChildIndex(e.currentTarget, e.currentTarget.parent_.getNumberOfChildren()-1)
                e.event.stopPropagation();
                touched(e.currentTarget);

            });
        }

        if(i >= inicio_rojas){
            fichasRojas[i-inicio_rojas].setPosition((fila*sizeCasilla)+(sizeCasilla/2),(columna*sizeCasilla)+(sizeCasilla/2));
            goog.events.listen(fichasRojas[i-inicio_rojas], CLICK_TAGS, function(e){
                e.currentTarget.parent_.setChildIndex(e.currentTarget, e.currentTarget.parent_.getNumberOfChildren()-1)
                e.event.stopPropagation();
                touched(e.currentTarget);

            });
        }

        //if(i != 43 && i != 42 && i != 46 && i != 47 && i != 53 && i != 52 && i != 56 && i != 57)
        initialLayer.appendChild(casilla);

        if(i < fichasAzules.length) initialLayer.appendChild(fichasAzules[i]);
        if(i >= inicio_rojas){
            initialLayer.appendChild(fichasRojas[i-inicio_rojas]);
        }

        fila++;
    }


    initialScene.appendChild(initialLayer);




    //////////////////////////////////////////////////////////////////////




    /*goog.events.listen(pieza2, CLICK_TAGS, function(e){
        e.event.stopPropagation();
        touched(e.currentTarget);

    });

    goog.events.listen(casilla, CLICK_TAGS, function(e){
        e.event.stopPropagation();
        //alert(this.itemId);
        // this.setPosition(this.getPosition().x+10,0);
        touched(e.currentTarget);

    });

    goog.events.listen(casilla2, CLICK_TAGS, function(e){
        e.event.stopPropagation();
        touched(e.currentTarget);
    });*/
    //////////////////////////////////////////////////////////////////////











    return {
        escena: initialScene,
        layer: initialLayer,
        config : config
        //,
        //startButton: startButton
    }
}

goog.inherits(stratego.Tablero, lime.Sprite);


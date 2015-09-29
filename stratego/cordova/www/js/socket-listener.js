/**
 * Created by adrian on 31/05/15.
 */

var my_player = {};
var player2 = {};
var usuarios = [];
var estado_usuario = "off";

function retarJugador(id){
    player_rojo = player_id.id;
    player_azul = id;
    jQuery('#players .'+id).hide();
    jQuery('#players-ocupados .'+id).show();


    room = player_id.id;
    player_rival = id;

    socket.emit('dejar lobby', {});
    socket.emit('unirme a room', {room:my_player.id});
    socket.emit('unir usuario a room', {usuario_id: id, room:my_player.id});

    console.log('unir usuario a room', {usuario_id: id, room:my_player.id});

    irA("#reto");
}

function socketsStart(data_user){


    socket = io.connect(socket_host);

    socket.on('connect', function () {
        estado_usuario = "on";
        socket.emit('USUARIO CONECTADO', my_player);
    });

    socket.on("RESET", function(player){
        alert("RESET");
        my_player = player;
    });

    socket.on('disconnect', function () {
        estado_usuario = "off";
        console.log("desconectado ",my_player);
    });



    socket.emit('add_user',data_user);


    socket.on('preparacion', function(data) {
        my_player = data.user;
        prepararFichas();
    });

    socket.on('UPDATE my user', function(data) {
        my_player = data.user;
    });

    socket.on('status usuarios', function(data) {
        usuarios = data.usuarios;
        actualizarVistaUsuarios(usuarios);
        console.log("USUARIOS:", usuarios);
    });


    // OTROS USUARIOS;
    socket.on('OTRO USUARIO: reto', function(data){

        console.log("OTRO USUARIO: reto", data);
        socket.emit('dejar lobby', {});
        socket.emit('unirme a room', {room:data.room});

        irA("#reto");
    });


    // PARA ROOMS
    socket.on('JUGAR AHORA', function(data) {
        initGame();
    });

    socket.on('RETO CANCELADO', function(room){
        socket.emit("RETO CANCELADO", room);
    });

    socket.on('GANAS POR ABANDONO', function(){
        alert("HAS GANADO");
        socket.emit("FIN PARTIDA", {ganador: my_player, perdedor: player2});
    });


    socket.on('GET INFO PLAYERS', function(data){
        if(data.player.id != my_player.id){
            player2 = data.player;
            $('.page').hide();
            $('#canvas').show();
            stratego.start('jugar');
        }
        /*
         if(data != my_player){
         player2 = data;
         console.log("PLAYER2:", player2);
         stratego.start('jugar');

         }else{
         console.log("FALSE PLAYER2:", data);

         }*/
    });



















    /************************************************************/

    function actualizarVistaUsuarios(data){
        var template = $("#player_tpl").html();
        $("#players").html('');
        $("#players-ocupados").html('');
        _.each(data, function(item){

            if(my_player.id == item.id || item.room != 'lobby') return;

            var data = {data:item}
            console.log("ITEM:", item);
            var tpl1 =  _.template($("#player_tpl").html())(data)

            $("#players").append(tpl1);
            var tpl2 =  _.template($("#player_oucpado_tpl").html())(data)
            $("#players-ocupados").append(tpl2);
        });
    }




    /******************************************************************/




    // PARA MI:
    socket.on('my player id', function(data) {
        player_id = data;
        player_id.user = data_user;



    });

    // DE MI RIVAL:
    socket.on('de rival', function(data) {
        console.debug(data);
    });

    socket.on('reto de rival', function(data) {
        console.debug(data);

        if(room == ''){
            console.log(room + " is empty room");
            room = data.player_rival;
            player_rival = data.player_rival;

            socket.emit('unirme a room',room);
            irA("#reto");
        }else{
            console.log("NOT EMPTY "+room);
            socket.emit('reto rechazado',data.player_rival);
        }
    });

    socket.on('cancelar reto',function(room_cancel){

        console.log("ENTRO EN CANCELACION");
        room = "";
        player_rojo = "";
        player_azul = "";
        player_rival = "";

        irA("#inicio");
    });

}

// PARA MI RIVAL:
function paraRival(id,msg){
    socket.emit('para rival',{id:id, msg:msg});
}




function aceptar_reto(){
    console.log("RETO ACEPTADO:", my_player.room);
    player_rojo = room;
    player_azul = player_id.id;
    socket.emit('RETO ACEPTADO', my_player.room);
}

function cancelar_reto(){
    player_rojo = '';
    player_azul = '';
    socket.emit('RETO RECHAZADO', my_player.room);
}

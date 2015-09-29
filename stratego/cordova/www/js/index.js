/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$(document).ready(function(){
    jQuery('[data-dropdown-content]').on('click.fndtn.dropdown', function (e) {
        e.stopPropagation();
    });
    //var template = _.template($("#template").html(),{});
    //jQuery("#canvas").detach().appendTo('#game');

});

var socket = null;
var current_page = "#login";
var room = "";
var player_id = {};
var player_rival = "";
var player_rojo, player_azul;


function irA(pageId){
    $(current_page).hide();
    $(pageId).show();
    current_page = pageId;
}

function info_fichaVSficha(a,b){

    if(a.color == "Azules"){
        azules = a;
        rojas = b;
    }else{
        azules = b;
        rojas = a;
    }

    $(".img-ficha-azul").attr("src", azules.img);
    $(".img-ficha-roja").attr("src", rojas.img);
    //$('.img-ficha-roja').attr('src', 'img/sargento.png');
    //$('.img-ficha-azul').attr('src', 'img/sargento.png');

    console.log('Info;',a);console.log('Info;',b);
    $('.ficha-vs-ficha').show();
    $('.ficha-roja').animate({
        'margin-right': '0'
    }, 1000, function() {
        $('.ficha-roja').delay( 1000 ).animate({
            'margin-right': '-100%'
        }, 1000, function() {
            $('.ficha-vs-ficha').hide();
        });
    });

    $('.ficha-azul').animate({
        'margin-left': '0'
    }, 1000, function() {
        $('.ficha-azul').delay( 1000 ).animate({
            'margin-left': '-100%'
        }, 1000, function() {
            $('.ficha-vs-ficha').hide();
        });
    });

}

function gotoLobby(){
    socket.emit('Lobby room',{});

}

function login(){
    email = $('#login_email').val();
    password = $('#login_password').val();

    $.post( socket_host+"login", { email: email, password: password} ).done(function( data ) {
        if(data.user)
        {
            socketsStart(data.user);
        }
    });
}


function prepararFichas(){
    $('.page').hide();
    $('#canvas').show();
    stratego.start('preparar_fichas');
}

function initGame(){
    if(my_player.id == my_player.room)
    {
        localStorage.miColor = "Azules";
    }else{
        localStorage.miColor = "Rojas";
    }

    //alert(localStorage.miColor);

    //console.log("INFO PLAYERS", {player:my_player})
    socket.emit("INFO PLAYERS", {player:my_player});
    socket.emit("STADO JUGANDO", {});
    //stratego.start('jugar');
}

function exitGame(){

    //stratego.start();
}



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {



        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
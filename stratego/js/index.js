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

var stage;
var conf = {
    NUMERO_CASILLAS:100,
    NUMERO_FICHAS_JUGADOR : 40,
    ANCHO_CASILLA : 40,
    ALTO_CASILLA : 40,
    ANCHO_FICHA : 40,
    ALTO_FICHA : 40,
    LIMITE_MOVIMIENTO : 40,
    PLAYER : null,
    PLAYER_2 : null
};


var game = {
    ESTADO:'', // OCUPADO, DISPONIBLE,
    ESTAGE: 1,
    TURNO:'off'
};



$(document).ready(function(){
    console.log('init');
    stage = new createjs.Stage("game");
    var circulo = new createjs.Shape();
    circulo.graphics.beginFill("#fc0").drawCircle(0,0,50);
    stage.addChild(circulo);
    stage.update();
});
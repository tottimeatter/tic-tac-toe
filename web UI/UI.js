'use strict'

var tauler = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var Jugador = {Nom: 'Jugador', Tirades: 0, FitxesATaula: 0};
var Maquina = {Nom: 'Màquina', Tirades: 0, FitxesATaula: 0};
var final = false;
let guanyador = {victoria: false, guanyador: ''};

let registre = {Jugador: 0, Maquina: 0};
localStorage.getItem('jugador') ? registre.Jugador = localStorage.getItem('jugador') : registre.Jugador =0;
localStorage.getItem('maquina') ? registre.Maquina = localStorage.getItem('maquina') : registre.Maquina =0;

window.onload = function (){
    let print = document.createTextNode(`Jugador ${registre.Jugador} - ${registre.Maquina} Màquina`);
    let div = document.getElementById(`registre`);
    div.appendChild(print);
}


function start() {
    location.reload();
}

function clearRegisters(){
    localStorage.clear();
    location.reload();
}

/**
 * a) Emmagatzemar l'estat del tauler
 */
function saveState(valor, fila, columna){
    if((valor === 'O' || valor === 'X') && tauler[fila][columna] == 0){
        try {
            tauler[fila][columna] = valor;
            switch(valor){
                case('X'):{
                    let cross=document.createElement("div");
                    cross.classList.add("cross");
                    let cell = document.getElementById(`fil${fila + 1}-col${columna + 1}`)
                    cell.appendChild(cross)       
                    break
                }
                case('O'):{
                    let circle = document.createElement("div");
                    circle.classList.add("circle");
                    let cell = document.getElementById(`fil${fila + 1}-col${columna + 1}`);
                    cell.appendChild(circle);
                    break
                }
            }

            return true
        } catch (error) {
            return false
        }
    } else if(valor == 0){
        tauler[fila][columna] = 0;
    }
}
/**
 * b) Detecta quan finalitza el joc
 */
function avaluaGuanyador(){
    let victoria = false;
    let retFiles = avaluaFiles();
    let retCol = avaluaColumnes();
    let retDia = avaluaDiagonals();
    let guanyador;
    
    if(retFiles.victoria || retCol.victoria || retDia.victoria) {
        victoria = true;

        if(retFiles.guanyador != undefined){
            guanyador = retFiles.guanyador;
        } else if (retCol.guanyador != undefined){
            guanyador = retCol.guanyador;
        } else if (retDia.guanyador != undefined){
            guanyador = retDia.guanyador;
        }

    } else {
        victoria = false;
        guanyador = undefined;
    }

    return {victoria: victoria, guanyador: guanyador};

    function avaluaFiles() {
        let i = 0;
        let j = 0;
        let victoriaFiles = false;
        let valor;
        let guanyador;
    
        for (i = 0; i < 3; i += 1) {
            valor = tauler[i][j];
            if(valor === 'O' || valor === 'X'){
                for (j = 0; j < 3; j += 1) {
                    if (valor === tauler[i][j]) {
                        valor = tauler[i][j];
                        if (j === 2) {
                            victoriaFiles = true;
                            guanyador = valor;
                            break;
                        }
                    } else {
                        break;
                    }
        
                }
            }            
        }
    return {victoria: victoriaFiles, guanyador: guanyador};
    }

    function avaluaColumnes () {
        let i = 0;
        let j = 0;
        let victoriaColumnes = false;
        let valor;
        let guanyador;

        for (j = 0; j < 3; j += 1) {
            valor = tauler[i][j];
            if(valor === 'O' || valor === 'X'){            
                for (i = 0; i < 3; i += 1) {
                    if (valor === tauler[i][j]) {
                        valor = tauler[i][j];
                        if (i === 2) {
                            victoriaColumnes = true;
                            guanyador = valor;
                            break;
                        }
                    } else {
                        break;
                    }
        
                }
            }
        }
        return {victoria: victoriaColumnes, guanyador: guanyador};
    }

    function avaluaDiagonals () {
        let i = 0;
        let j = 0;
        let victoriaDiagonals = false;
        let valor = tauler[i][j];
        let guanyador;
        
        if(valor === 'O' || valor === 'X'){
            while(i < 3){
                if (valor == tauler[i][j]){
                    if(i == 2){
                        victoriaDiagonals = true;
                        guanyador = valor;
                        break;
                    } else {
                        i += 1;
                        j += 1;
                    }
                    
                } else {
                    break;
                }
            }
        }
        i = 0;
        j = 2;
        valor = tauler[i][j];
        if(valor === 'O' || valor === 'X'){  
            while(i < 3){
                if (valor == tauler[i][j]){
                    if (i == 2){
                        victoriaDiagonals = true;
                        guanyador = valor;
                        break;
                    } else {
                        i += 1;
                        j -= 1;
                    }
                } else {
                    break;
                }
            }
        }
        
        return {victoria: victoriaDiagonals, guanyador: guanyador};
    }


}
/**
 * c) Col·locar fitxa jugador
 */
function setFitxaJugador(j, i) {
    if(!guanyador.victoria) {
        if(j>=0 && j<3 && i>=0 && i<3){
            if(tauler[j][i] == 0) {
                saveState('X', j, i);
            }
            } else {
                alert(`Aquesta posici\u00F3 est\u00E0 ocupada`);
                setFitxaJugador();
            }
    }
}
/**
 * d) Col·locar fitxa màquina sense tenir en compte si el jugador pot o no guanyar
 */
function setFitxaMaquinaDummy() {
    let col = false;
    while(col == false) {
        let fitxa = [5,5];
        while(fitxa[0] > 2 || fitxa[0]<0){
            fitxa[0] = Math.floor(Math.random() * 10);
        }
        while(fitxa[1] > 2 || fitxa[1] < 0){
            fitxa[1] = Math.floor(Math.random() * 10);
        }
        if(tauler[fitxa[0]][fitxa[1]] == 0){
            saveState('O', fitxa[0], fitxa[1]);
            col = true;
            break
        }
    }
}
/**
 * d.b) La màquina intenta que el jugador no guanyi
 */
function setFitxaMaquina() {
    let col = false;

    for(let i = 0; i<3; i++){
        let jug = 0;
        let maq = 0;
        for(let j = 0; j<3; j++){
            if(tauler[i][j] == 'X'){
                jug ++;
            } else if (tauler[i][j] == 'O'){
                maq ++;
            }
        }
        if(maq == 2 && !col){
            for(let j = 0; j<3; j++){
                if(tauler[i][j] == 0){
                    
                    saveState('O', i, j);
                    col = true;
                    break
                }
            }
        }
        if(jug==2 && !col){
            for(let j = 0; j<3; j++){
                if (tauler[i][j] == 0){
                    
                    saveState('O', i, j);
                    col = true;
                    break;
                }
            }       
        }

        if (col){
    	    break
        }
    }

    if(!col){
        for(let j = 0; j<3; j++){
            let maq = 0;
            let jug = 0;
            for (let i = 0; i<3; i++){
                if(tauler [i][j] == 'X'){
                    jug++;
                } else if(tauler[i][j] == 'O'){
                    maq++;
                }
            }
            
            if(jug == 2){
                for(let i = 0; i <3; i++){
                    if(tauler[i][j] == 0){
                        
                        saveState('O', i, j);
                        col = true;
                        break;
                    }
                }
            }

            if(maq == 2 && !col){
                for(let i = 0; i<3; i++){
                    if(tauler[i][j] == 0){
                        
                        saveState('O', i, j);
                        col = true;
                        break
                    }
                }
            }
            if(col){
                break
            }
        }
    
        if(!col){
            let maq = 0;
            let jug = 0;
            for(let i = 0; i<3; i++){
                let j = i;
                if(tauler[i][j] == 'X'){
                    jug ++;
                } else if(tauler[i][j] == 'O'){
                    maq ++;
                }
            }

            if(maq == 2 && !col){
                for(let i = 0; i<3; i++){
                    let j = i;
                    if(tauler[i][j] == 0){
                        
                        saveState('O', i, j)
                        col = true;
                        break  
                    } 
                }  
            }

            if(jug == 2 && !col){
                for(let i = 0; i<3; i++){
                    let j = i;
                    if(tauler[i][j] == 0){
                        
                        saveState('O', i, j)
                        col = true;
                        break  
                    } 
                }   
            }

            if(!col){
                maq = 0;
                jug = 0;
                for(let i = 0; i<3; i++){
                    let j = 2 - i;
                    if(tauler[i][j] == 'X'){
                        jug ++;
                    } else if(tauler[i][j] == 'O'){
                        maq ++;
                    }
                }

                if(maq == 2 && !col){
                    for(let i = 0; i<3; i++){
                        let j = 2 - i;
                        if(tauler[i][j] == 0){
                            
                            saveState('O', i, j)
                            col = true;
                            break  
                        } 
                    }  
                }

                if(jug == 2 && !col){
                    for(let i = 0; i<3; i++){
                        let j = 2 - i;
                        if(tauler[i][j] == 0){
                            
                            saveState('O', i, j)
                            col = true;
                            break  
                        } 
                    }   
                }
            }
        }

        if(!col){
            
            setFitxaMaquinaDummy();
        }
    }
}
/**
 * e) Alliberar espai jugador
 */
function alliberaFitxaJugador(fila, columna) {
    if(tauler[fila][columna] == 'X') {
        saveState(0, fila, columna)
    } 
}
/**
 * f) Alliberar espai màquina
 */
function alliberaFitxaMaquina() {
    let alliberat = false;
    while(alliberat == false) {
        let fitxa = [5,5];
        while(fitxa[0] > 2 || fitxa[0]<0){
            fitxa[0] = Math.floor(Math.random() * 10);
        }
        while(fitxa[1] > 2 || fitxa[1] < 0){
            fitxa[1] = Math.floor(Math.random() * 10);
        }
        if(tauler[fitxa[0]][fitxa[1]] == 'O'){
            saveState(0, fitxa[0], fitxa[1]);
            alliberat = true;
            let cell = document.getElementById(`fil${fitxa[0] + 1}-col${fitxa[1] + 1}`);
            let circle = cell.getElementsByClassName("circle");
            cell.removeChild(circle[0]);
            break
        }
    }  
}
/**
 * Gestióna cada tirada
 */
function tiradaManager(tira, j, i) {
    document.getElementById("alert").innerHTML = "" 
    if (!guanyador.victoria ) {
        let col = false;
        if((tira.Tirades < 3 || tira.FitxesATaula < 3)) {
            if((tira != Jugador || tauler[j][i] != 'X')){
                switch(tira.Nom){
                    case('Jugador'):{
                        setFitxaJugador(j,i);
                        tira.Tirades ++;
                        tira.FitxesATaula ++;
                        col = true;
                        mostraEstat();
                        break;
                    } case ('Màquina'): {
                        
                        setFitxaMaquina();
                        tira.Tirades ++;
                        tira.FitxesATaula ++;
                        col = true;
                        mostraEstat();
                        break;
                    }
                }
            }

        } else {
            switch(tira.Nom){
                case('Jugador'):{
                    if(tauler[j][i] == 'X'){
                        let cell = document.getElementById(`fil${j + 1}-col${i + 1}`);
                        let cross = cell.getElementsByClassName("cross");
                        cell.removeChild(cross[0]);
                        tira.FitxesATaula --;
                        alliberaFitxaJugador(j, i);
                        mostraEstat();
                    } else {
                        document.getElementById("alert").innerHTML = "Ja tens les tres fitxes al tauler, tria'n una per canviar-la de lloc" 
                    }                
                    break;
                } case('Màquina'):{
                    alliberaFitxaMaquina();
                    setTimeout(function () {
                        setFitxaMaquina();
                        tira.Tirades ++;;
                        col = true;
                        guanyador = avaluaGuanyador();
                        victoria();
                    }, 500);
                     
                    break;
                }
            }
        }
        guanyador = avaluaGuanyador();
        victoria();

        if(tira == Jugador && !guanyador.victoria && col){
            setTimeout(function () {tiradaManager(Maquina);}, 500);
        }
    }

}
/**
 * Mostra l'estat de la partida
 */
function mostraEstat() {
    console.log(tauler.slice(), `${Jugador.Nom}: ${Jugador.Tirades} tirades`, `${Maquina.Nom}: ${Maquina.Tirades} tirades`);
}

function victoria() {
    if(guanyador.victoria){
        switch(guanyador.guanyador){
            case('X'):{
                let victoriaMsg = document.createTextNode("");
                let div = document.getElementById("victoria");
                victoriaMsg = document.createTextNode("Enhorabona! Has guanyat la partida");
                div = document.getElementById("victoria");
                div.appendChild(victoriaMsg);
                registre.Jugador++;
                // console.log(registre.Jugador,registre.Maquina)
                localStorage.setItem('jugador', registre.Jugador);
                break
            }
            case('O'):{
                let victoriaMsg = document.createTextNode("");
                let div = document.getElementById("victoria");
                victoriaMsg = document.createTextNode("Vaja... l'ordinador ha guanyat aquesta partida");
                div = document.getElementById("victoria");
                div.appendChild(victoriaMsg);
                registre.Maquina++;
                // console.log(registre.Jugador,registre.Maquina)
                localStorage.setItem('maquina', registre.Maquina);
            }
        }
        let div = document.getElementById(`registre`).innerHTML = `Jugador ${registre.Jugador} - ${registre.Maquina} Màquina`;
    }
}



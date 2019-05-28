'use strict'

var tauler = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var Jugador = {Nom: 'Jugador', Tirades: 0};
var Maquina = {Nom: 'Màquina', Tirades: 0};
var final = false;

/**
 * a) Emmagatzemar l'estat del tauler
 */
function saveState(valor, posicioX, posicioY){
    if(valor === 'O' || valor === 'X'){
        try {
            tauler[posicioY][posicioX] = valor;
            return true
        } catch (error) {
            return false
        }
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

            i = 0;
            j = 2;
        }
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
function setFitxaJugador() {
    let fitxa = prompt(`On vols fer la tirada? Introdueix els valors de la forma (x,y)`);
    fitxa = fitxa.split(',');
    if(fitxa[0]>=0 && fitxa[0]<3 && fitxa[1]>=0 && fitxa[1]<3){
        if(tauler[fitxa[0]][fitxa[1]] == 0) {
            saveState('X', fitxa[0], fitxa[1])
        } else {
            alert(`Aquesta posici\u00F3 est\u00E0 ocupada`);
            setFitxaJugador();
        }
    } else {
        alert('Has de tirar la fitxa dins el tauler! Torna-ho a intentar');
        setFitxaJugador();
    }
    
}
/**
 * d) Col·locar fitxa màquina sense tenir en compte si el jugador pot o no guanyar
 */
function setFitxaMaquinaDummy() {
    let fitxa = [5,5];
    let col = false;
    while(col == false) {
        while(fitxa[0] > 2 || fitxa[0]<0){
            fitxa[0] = Math.floor(Math.random() * 10);
        }
        while(fitxa[1] > 2 || fitxa[1] < 0){
            fitxa[1] = Math.floor(Math.random() * 10);
        }
        if(tauler[fitxa[0]][fitxa[1]] == 0){
            saveState('O', fitxa[0], fitxa[1]);
            col = true;
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
                    saveState('O', j, i);
                    col = true;
                    break
                }
            }
        }
        if(jug==2 && !col){
            for(let j = 0; j<3; j++){
                if (tauler[i][j] == 0){
                    saveState('O', j, i);
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
                        saveState('O', j, i);
                        col = true;
                        break;
                    }
                }
            }

            if(maq == 2 && !col){
                for(let i = 0; i<3; i++){
                    if(tauler[i][j] == 0){
                        saveState('O', j, i);
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
                        saveState('O', j, i)
                        col = true;
                        break  
                    } 
                }  
            }

            if(jug == 2 && !col){
                for(let i = 0; i<3; i++){
                    let j = i;
                    if(tauler[i][j] == 0){
                        saveState('O', j, i)
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
                            saveState('O', j, i)
                            col = true;
                            break  
                        } 
                    }  
                }

                if(jug == 2 && !col){
                    for(let i = 0; i<3; i++){
                        let j = 2 - i;
                        if(tauler[i][j] == 0){
                            saveState('O', j, i)
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
function alliberaFitxaJugador() {
    let fitxa = prompt(`Quina fitxa vols alliberar? Introdueix els valors de la forma (x,y)`);
    fitxa = fitxa.split(',');
    if(tauler[fitxa[0]][fitxa[1]] == 'X') {
        saveState(0, fitxa[0], fitxa[1])
    } else {
        alert(`En aquesta posici\u00F3 no hi tens cap fitxa!`);
        alliberaFitxaJugador();
    }
}
/**
 * f) Alliberar espai màquina
 */
function alliberaFitxaMaquina() {
    let fitxa = [5,5];
    let alliberat = false;
    while(alliberat == false) {
        while(fitxa[0] > 2 || fitxa[0]<0){
            fitxa[0] = Math.floor(Math.random() * 10);
        }
        while(fitxa[1] > 2 || fitxa[1] < 0){
            fitxa[1] = Math.floor(Math.random() * 10);
        }
        if(tauler[fitxa[0]][fitxa[1]] == 'O'){
            saveState(0, fitxa[0], fitxa[1]);
            alliberat = true;
        }
    }  
}
/**
 * Gestióna cada tirada
 */
function tiradaManager(tira) {
    if(tira.Tirades < 3) {
        switch(tira.Nom){
            case('Jugador'):{
                setFitxaJugador();
                tira.Tirades ++;
                mostraEstat();
                break;
            } case ('Màquina'): {
                setFitxaMaquina();
                tira.Tirades ++;
                mostraEstat();
                break;
            }
        }
    } else {
        switch(tira.Nom){
            case('Jugador'):{
                alliberaFitxaJugador();
                setFitxaJugador();
                tira.Tirades ++;
                break;
            } case('Maquina'):{
                allibaraFitxaMaquina();
                setFitxaMaquina();
                tira.Tirades ++;
                break;
    }
        }
    }
}
/**
 * Mostra l'estat de la partida
 */
function mostraEstat() {
    console.log(tauler.slice(), `${Jugador.Nom}: ${Jugador.Tirades} tirades`, `${Maquina.Nom}: ${Maquina.Tirades} tirades`);
}

function main() {
    let juga = Jugador
    let seguentPartida;
    while(!final){
        tiradaManager(juga);
        let resultat = avaluaGuanyador();
        if(resultat.victoria){
            final = true;
            switch(resultat.guanyador){
                case('X'):{
                    seguentPartida = confirm(`Enhorabona! Has guanyat la partida! Vols que hi tornem?`);
                    break;
                } case('O'):{
                    seguentPartida = confirm(`Vaja, has perdut... Ho vols tornar a intentar?`);
                    break;
                }
            }
        } else {
            switch(juga){
                case(Jugador):{
                    juga = Maquina;
                    break
                }
                case(Maquina):{
                    juga = Jugador;
                    break
                }
            } 
        }

        if(final && seguentPartida){
            tauler = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            Jugador = {Nom: 'Jugador', Tirades: 0};
            Maquina = {Nom: 'Màquina', Tirades: 0};
            final = false;
            main();
        }
    }

}

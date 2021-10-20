let operation = 0;
let vorherigerOperant = "";
let aktuellerOperant = "";
let hilfsoperant = "";
let gesamteRechnung = "";
let kommaCheck = false;
let vorher_gerechnet = false;
let ergebnis = 0;
let kommaStellen = 5
let klammerCheck = false;

function hinzufuegen(x) {
    if(x=="("){
        klammerCheck = true;
    } else if (x == ")"){
        klammerCheck = false;
    }
    if(vorher_gerechnet) {
        document.getElementsByClassName("vorheriger-operant")[0].innerHTML = "";
        vorher_gerechnet = false;
    }
    aktuellerOperant = aktuellerOperant.toString() + x;
    document.getElementsByClassName("aktueller-operant")[0].innerHTML = aktuellerOperant;
}

function komma() {
    if(kommaCheck == false){
        hinzufuegen('.');
        kommaCheck = true;
    }
}

function loeschen(){
    if(aktuellerOperant.substring(aktuellerOperant.length-1, aktuellerOperant.length) == "("){
        klammerCheck = false;
    }
    aktuellerOperant = aktuellerOperant.substring(0, aktuellerOperant.length - 1);
    document.getElementsByClassName("aktueller-operant")[0]. innerHTML = aktuellerOperant
    if(aktuellerOperant.length == 0){
        document.getElementsByClassName("aktueller-operant")[0].innerHTML = "0";
    }
}

function operationF(x) {
    operation = x;
    if(vorherigerOperant.length > 0 || hilfsoperant.length > 0) {
        gesamteRechnung = document.querySelector('.vorheriger-operant').innerHTML + " " + aktuellerOperant; 
        switch(operation) {
            case 1:
                gesamteRechnung = gesamteRechnung + " +";
                break;
            case 2:
                gesamteRechnung = gesamteRechnung + " -";
                break;
            case 3:
                gesamteRechnung = gesamteRechnung + " *";
                break;
            case 4:
                gesamteRechnung = gesamteRechnung + " /";
                break;
        }
        document.getElementsByClassName("vorheriger-operant")[0].innerHTML = gesamteRechnung;
    }else{
        switch(operation) {
            case 1:
                gesamteRechnung = aktuellerOperant + " +";
                break;
            case 2:
                gesamteRechnung = aktuellerOperant + " -";
                break;
            case 3:
                gesamteRechnung = aktuellerOperant + " *";
                break;
            case 4:
                gesamteRechnung = aktuellerOperant + " /";
                break;
        }
        document.getElementsByClassName("vorheriger-operant")[0].innerHTML = gesamteRechnung;
    }
    if(vorher_gerechnet) {
        switch(operation) {
            case 1:
                gesamteRechnung = hilfsoperant + " +";
                break;
            case 2:
                gesamteRechnung = hilfsoperant + " -";
                break;
            case 3:
                gesamteRechnung = hilfsoperant + " *";
                break;
            case 4:
                gesamteRechnung = hilfsoperant + " /";
                break;
        }
        document.getElementsByClassName("vorheriger-operant")[0].innerHTML = gesamteRechnung;
        vorher_gerechnet = false;
        vorherigerOperant = gesamteRechnung;
    }
    document.getElementsByClassName("aktueller-operant")[0].innerHTML = "0";
    vorherigerOperant = aktuellerOperant;
    aktuellerOperant = "";
    kommaCheck = false;
} // +=1, -=2, *=3, /=4

function dezimalstellen() {
    let hilfe1 = ergebnis.toString();
    let hilfe2 = hilfe1.slice(0, hilfe1.indexOf("."));
    hilfe2 = (hilfe1.length-1) - hilfe2.length;
    if(hilfe2 > kommaStellen) {
        ergebnis = ergebnis.toFixed(kommaStellen);
    }
}

function berechnen() {
    try{
        if(aktuellerOperant.length > 0){
            gesamteRechnung = gesamteRechnung + " " + aktuellerOperant;
            if(klammerCheck == true) {
                gesamteRechnung = gesamteRechnung + " )";
                klammerCheck = false;
            }
            ergebnis = math.evaluate(gesamteRechnung);
            dezimalstellen();
            document.getElementsByClassName("vorheriger-operant")[0].innerHTML = gesamteRechnung;
            document.getElementsByClassName("aktueller-operant")[0].innerHTML = ergebnis;
            kommaCheck = false;
            hilfsoperant = ergebnis.toString();
            aktuellerOperant = "";
            vorher_gerechnet = true;
            vorherigerOperant = "";
            gesamteRechnung = "";
        }
    } catch (e) {
        ac();
        document.getElementsByClassName("aktueller-operant")[0].innerHTML = "Ungültige Eingabe";
    }
}

function ac() {
    vorher_gerechnet = false;
    kommaCheck = false;
    aktuellerOperant = "";
    vorherigerOperant = "";
    hilfsoperant = "";
    ergebnis = 0;
    gesamteRechnung = "";
    klammerCheck = false;
    document.getElementsByClassName("aktueller-operant")[0].innerHTML = 0;
    document.getElementsByClassName("vorheriger-operant")[0].innerHTML = "";
}

window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    const parsedKey = Number.parseInt(key)
    if (!Number.isNaN(parsedKey)) {
        hinzufuegen(key);
    } else if ( key == '+' ) {
        operationF(1);
    } else if ( key == '-' ) {
        operationF(2);
    } else if ( key == '*' ) {
        operationF(3);
    } else if ( key == '/' ) {
        operationF(4);
    } else if ( key == ',' || key == "." ) {
        komma();
    } else if ( key == 'BACKSPACE' ) {
        loeschen();
    } else if ( key == 'ENTER' ) {
        berechnen();
    } else if ( key == '(' ) {
        hinzufuegen('(');
    } else if ( key == ')' ) {
        hinzufuegen(')');
    }
}
var Personnage;

Personnage = class Personnage {
  constructor(cls, clssub, rce, rcesub, sup, weap) {

  }
}

function resolvestat() {
  var cls = document.getElementById("Classe").value;
  var clssub = document.getElementById("Csub").value;
  var rce = document.getElementById("Race").value;
  var rcesub = document.getElementById("Rsub").value;
  var sup = document.getElementById("Sup").value;
  var weap = document.getElementById("Weap").value;
  perso = new Personnage(cls, clssub, rce, rcesub, sup, weap)
}

function checkpoint() {
  var pt = 3
  if (document.getElementById("Sup").value) {pt -= 1;}
  var ppt = document.getElementById("pt");
  ppt.innerHTML = "point restant : " + pt;
}

function verifclassespe() {
  var n = document.getElementById("Csub");
  var m = n.getElementsByTagName("optgroup");
  for (var i = 0; i < m.length; i++) {m[i].style.display = "none";m[i].disable = true;}
  var val = document.getElementById("Classe").value;
  var sub = document.getElementById(val);
  sub.style.display = "initial";
  sub.disable = false;
  n.value = "STD";
  verifarme()
}

function verifracespe() {
  var n = document.getElementById("Rsub");
  var m = n.getElementsByTagName("optgroup");
  for (var i = 0; i < m.length; i++) {m[i].style.display = "none";m[i].disable = true;}
  var val = document.getElementById("Race").value;
  var sub = document.getElementById(val);
  sub.style.display = "initial";
  sub.disable = false;
  n.value = "Lambda";
  var sup = document.getElementById("script_sup");
  var supv = document.getElementById("Sup");
  supv.disable = false;
  sup.innerHTML = "ici : ";
  switch (val) {
    case "Nain":
    case "Humain":supv.disable = true;
      supv.value = false;
      sup.innerHTML += "Indisponible";break;
    case "Elf":sup.innerHTML += "Haut Elf";break;
    case "Orc":sup.innerHTML += "Haut orc";break;
    case "Goblin":sup.innerHTML += "Hobogoblin";
  }
  verifarme()
}

function verifarme() {
  var cls = document.getElementById("Classe").value;
  var clssub = document.getElementById("Csub").value;
  var rce = document.getElementById("Race").value;
  var rcesub = document.getElementById("Rsub").value;
  var sup = document.getElementById("Sup").value;
  var weap = document.getElementById("Weap");
  weap.value = "1HS";
  for (var i = 0; i < weap.length; i++) {
    var x;
    switch (weap[i].value) {//ok : Samourai+Mage+Goblin+Orc+Elf+Nain+
      case "KAT": x = ( (cls == "Samourai") && ( (rce != "Goblin") || sup) ); break;
      case "DAG": x = ( (rce != "Orc" || sup) ); break;
      case "LAN": x = ( (cls != "Mage") && (cls != "Samourai") && (rce != "Nain")); break;
      case "ARB": x = ( (cls != "Mage") ); break;
      case "ARC": x = ( (cls != "Mage") ); break;
      case "2HA": x = ( ( (rce != "Goblin") || sup) && (cls != "Mage") && (cls != "Samourai")); break;
      case "1HA": x = ( (cls != "Mage") ); break;
      case "2HH": x = ( ( (rce != "Goblin") || sup) && (rce != "Elf") && (cls != "Samourai") ); break;
      case "1HH": x = ( (rce != "Elf") ); break;
      case "2HS": x = ( ( (rce != "Goblin") || sup) && (cls != "Mage") && (cls != "Samourai") );
      case "1HS":
      default:
    }
  if (x) {weap[i].style.display = "initial"; weap[i].disable = false} else {weap[i].style.display = "none"; weap[i].disable = true}
  }
}

function startup() {
  verifclassespe();
  verifracespe();
}

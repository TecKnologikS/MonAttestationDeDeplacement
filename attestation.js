function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var choix = {
  "boulot": "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils sont indispensables à l’exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés",
  "course": "Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées (liste sur gouvernement.fr)",
  "medecin": "Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une affection de longue durée",
  "garde": "Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants",
  "sport": "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
  "police": "Déplacements résultant d'une obligation de présentation aux services de police ou de gendarmerie nationales ou à tout autre service ou professionnel, imposée par l'autorité de police administrative ou l'autorité judiciaire",
  "justice": "Convocation judiciaire ou administrative",
  "interet": "Participation à des missions d’intérêt général sur demande de l’autorité administrative",
};

var motifs = {
  "boulot": "travail",
  "course": "courses",
  "medecin": "sante",
  "garde": "famille",
  "sport": "sport",
  "police": "judiciaire",
  "justice": "judiciaire",
  "interet": "missions",
}

if (undefined === getUrlVars()['prenom'] || undefined === getUrlVars()['prenom'])
  window.location.href = "/";

if(undefined !== getUrlVars()['nom'] && undefined !== getUrlVars()['prenom'])
  document.getElementById('nom').textContent = unescape(decodeURI(getUrlVars()['nom'])) + " " + unescape(decodeURI(getUrlVars()['prenom']));
if(undefined !== getUrlVars()['naissance'] && undefined !== getUrlVars()['lieu'])
  document.getElementById('naissance').textContent = unescape(decodeURI(getUrlVars()['naissance'])) + " à " + unescape(decodeURI(getUrlVars()['lieu']));
if(undefined !== getUrlVars()['adresse'])
  document.getElementById('adresse').textContent = unescape(decodeURI(getUrlVars()['adresse']));
if(undefined !== getUrlVars()['ville'])
  document.getElementById('ville').textContent = unescape(decodeURI(getUrlVars()['ville']));
if(undefined !== getUrlVars()['choix'])
  document.getElementById('choix').textContent = unescape(choix[decodeURI(getUrlVars()['choix'])]);

let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, '0');
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();

document.getElementById('dateDuJour').textContent = day + '/' + month + '/' + year;

if(undefined !== getUrlVars()['heure'] && undefined !== getUrlVars()['minute']) {
  document.getElementById('heureDeDebut').textContent = decodeURI(getUrlVars()['heure']) + 'h' + decodeURI(getUrlVars()['minute']);
} else {
  document.getElementById('heureDeDebut').textContent = dateObj.getHours() + "h" + dateObj.getMinutes();
}

if(null !== localStorage.getItem('signature'))
  document.getElementById("signature").src = localStorage.getItem('signature');


var textQrCode = "";
textQrCode += "Cree le: " + day + '/' + month + '/' + year + " a " + dateObj.getHours() + "h" + dateObj.getMinutes() + ";";
textQrCode += "Nom: " + unescape(decodeURI(getUrlVars()['nom'])) + ";";
textQrCode += "Prenom: " + unescape(decodeURI(getUrlVars()['prenom'])) + ";";
textQrCode += "Naissance: " + unescape(decodeURI(getUrlVars()['naissance'])) + " a " + unescape(decodeURI(getUrlVars()['lieu'])) + ";";
textQrCode += "Adresse: " + unescape(decodeURI(getUrlVars()['adresse'])) + ";";
textQrCode += "Sortie: " + day + '/' + month + '/' + year + " a " + document.getElementById('heureDeDebut').textContent + ";";
textQrCode += "Motifs: " + unescape(motifs[decodeURI(getUrlVars()['choix'])]) + ";";

new QRCode(document.getElementById("qrcode"), textQrCode);

let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, '0');
let day = String(dateObj.getDate()).padStart(2, '0');
let year = dateObj.getFullYear();

document.getElementById('newHour').value = String(dateObj.getHours()).padStart(2, '0') + ":" + String(dateObj.getMinutes()).padStart(2, '0');

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

function updateHour() {
  if("" !== document.getElementById('newHour').value)
    localStorage.setItem('heure', document.getElementById('newHour').value.replace(':', 'h'));
  else
    localStorage.setItem('heure', String(dateObj.getHours()).padStart(2, '0') + "h" + String(dateObj.getMinutes()).padStart(2, '0'));

  localStorage.setItem('created_at', day + '/' + month + '/' + year + " a " + String(dateObj.getHours()).padStart(2, '0') + "h" + String(dateObj.getMinutes()).padStart(2, '0'));

  location.reload();
}

document.getElementById('button').addEventListener('click', function(event) {
  event.preventDefault();
   updateHour();
}, false);

var correspondance = {
  "boulot": "boulot",
  "travail": "boulot",
  "course": "course",
  "courses": "course",
  "achat": "course",
  "achats": "course",
  "medecin": "medecin",
  "docteur": "medecin",
  "garde": "garde",
  "handicap": "handicap",
  "sport": "sport",
  "animal": "sport",
  "animaux": "sport",
  "police": "police",
  "justice": "police",
  "interet": "interet",
  "enfants": "enfants",
};

var choix = {
  "boulot": "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen.",
  "course": "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle, des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de commande et les livraisons à domicile.",
  "medecin": "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.",
  "garde": "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants.",
  "sport": "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.",
  "police": "Convocation judiciaire ou administrative et pour se rendre dans un service public",
  "interet": "Participation à des missions d’intérêt général sur demande de l’autorité administrative",
  "handicap": "Déplacement des personnes en situation de handicap et leur accompagnant.",
  "enfants": "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires"
};

var motifs = {
  "boulot": "travail",
  "course": "achats",
  "medecin": "sante",
  "garde": "famille",
  "handicap": "handicap",
  "sport": "sport_animaux",
  "police": "convocation",
  "interet": "missions",
  "enfants": "enfants",
}

if (undefined === getUrlVars()['prenom'] || undefined === getUrlVars()['prenom'] || null === localStorage.getItem('created_at'))
  window.location.href = "/";

if(undefined !== getUrlVars()['nom'] && undefined !== getUrlVars()['prenom'])
  document.getElementById('nom').textContent = unescape(decodeURI(getUrlVars()['nom'])) + " " + unescape(decodeURI(getUrlVars()['prenom']));
if(undefined !== getUrlVars()['naissance'] && undefined !== getUrlVars()['lieu'])
  document.getElementById('naissance').textContent = unescape(decodeURI(getUrlVars()['naissance'])) + " à " + unescape(decodeURI(getUrlVars()['lieu']));
if(undefined !== getUrlVars()['adresse'])
  document.getElementById('adresse').textContent = unescape(decodeURI(getUrlVars()['adresse']));
if(undefined !== getUrlVars()['ville'])
  document.getElementById('ville').textContent = unescape(decodeURI(getUrlVars()['ville']));
if(undefined !== getUrlVars()['choix']) {
  var monChoix = correspondance[decodeURI(getUrlVars()['choix']).toLowerCase()];
} else {
  var monChoix = "course";
}

document.getElementById('choix').textContent = unescape(choix[monChoix]);

document.getElementById('dateDuJour').textContent = day + '/' + month + '/' + year;

if(null !== localStorage.getItem('heure') && localStorage.getItem('heure').length > 0) {
  //si heure dispo
  document.getElementById('heureDeDebut').textContent = localStorage.getItem('heure');
} else {
  //sinon on met
  document.getElementById('heureDeDebut').textContent = String(dateObj.getHours()).padStart(2, '0') + "h" + String(dateObj.getMinutes()).padStart(2, '0');
  localStorage.setItem('heure', document.getElementById('heureDeDebut').textContent);
}

if(null !== localStorage.getItem('signature'))
  document.getElementById("signature").src = localStorage.getItem('signature');


var textQrCode = "";
textQrCode += "Cree le: " + document.getElementById('heureDeDebut').textContent + ";\n";
textQrCode += "Nom: " + unescape(decodeURI(getUrlVars()['nom'])) + ";\n";
textQrCode += "Prenom: " + unescape(decodeURI(getUrlVars()['prenom'])) + ";\n";
textQrCode += "Naissance: " + unescape(decodeURI(getUrlVars()['naissance'])) + " a " + unescape(decodeURI(getUrlVars()['lieu'])) + ";\n";
textQrCode += "Adresse: " + unescape(decodeURI(getUrlVars()['adresse'])) + ";\n";
textQrCode += "Sortie: " + day + '/' + month + '/' + year + " a " + document.getElementById('heureDeDebut').textContent + ";\n";
textQrCode += "Motifs: " + unescape(motifs[monChoix]) + ";";

new QRCode(document.getElementById("qrcode"), {
	text: textQrCode,
	width: 256,
	height: 256,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.L
});

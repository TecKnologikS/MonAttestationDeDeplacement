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

function removeParam(parameter)
{
  var url=document.location.href;
  var urlparts= url.split('?');

  if (urlparts.length>=2)
  {
    var urlBase=urlparts.shift();
    var queryString=urlparts.join("?");

    var prefix = encodeURIComponent(parameter)+'=';
    var pars = queryString.split(/[&;]/g);
    for (var i= pars.length; i-->0;)
      if (pars[i].lastIndexOf(prefix, 0)!==-1)
        pars.splice(i, 1);
    url = urlBase+'?'+pars.join('&');
    window.history.pushState('',document.title,url); // added this line to push the new url directly to url bar .

  }
  return url;
}

function updateHour(reload = true) {
  if("" !== document.getElementById('newHour').value)
    localStorage.setItem('heure', document.getElementById('newHour').value.replace(':', 'h'));
  else
    localStorage.setItem('heure', String(dateObj.getHours()).padStart(2, '0') + "h" + String(dateObj.getMinutes()).padStart(2, '0'));

  if(reload) {
    location.reload();
  } else {
    removeParam('refresh');
  }
}

document.getElementById('button').addEventListener('click', function(event) {
  event.preventDefault();
   updateHour();
}, false);

var correspondance = {
  "boulot": "boulot",
  "travail": "boulot",
  "course": "course",
  "eglise": "course",
  "culte": "course",
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
  "course": "Déplacements pour se rendre dans un établissement culturel autorisé ou un lieu de culte ;déplacements pour effectuer des achats de biens, pour des services dont la fourniture est autorisée, pour les retraits de commandes et les livraisons à domicile",
  "medecin": "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.",
  "garde": "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et précaires ou la garde d'enfants.",
  "sport": "Déplacements en plein air ou vers un lieu de plein air, sans changement du lieu de résidence, dans la limite de trois heures quotidiennes et dans un rayon maximal de vingt kilomètres autour du domicile, liés soit à l’activité physique ou aux loisirs individuels, à l’exclusion de toute pratique sportive collective et de toute proximité avec d’autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie",
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

if (undefined === getUrlVars()['prenom'] || undefined === getUrlVars()['prenom'])
  window.location.href = "/";

if (undefined !== getUrlVars()['refresh']) {
  updateHour(false);
}

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

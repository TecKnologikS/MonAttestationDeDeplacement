window.mobilecheck = function() {
  var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if (window.mobilecheck()) {
  document.getElementById('signature-pad').height = 400;
  document.getElementById('signature-pad').width = 800;
}


var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  penColor: 'rgb(0, 0, 0)'
});

if(null !== localStorage.getItem('nom'))
  document.getElementById('attestationNom').value = localStorage.getItem('nom');
if(null !== localStorage.getItem('prenom'))
  document.getElementById('attestationPrenom').value = localStorage.getItem('prenom');
if(null !== localStorage.getItem('lieu'))
  document.getElementById('attestationLieunaissance').value = localStorage.getItem('lieu');
if(null !== localStorage.getItem('naissance'))
  document.getElementById('attestationNaissance').value = localStorage.getItem('naissance');
if(null !== localStorage.getItem('ville'))
  document.getElementById('attestationVille').value = localStorage.getItem('ville');
if(null !== localStorage.getItem('adresse'))
  document.getElementById('attestationAdresse').value = localStorage.getItem('adresse');
if(null !== localStorage.getItem('heure'))
  document.getElementById('attestationHeure').value = localStorage.getItem('heure');

document.getElementById('button').addEventListener('click', function(event) {
  event.preventDefault();
  open();
}, false);

document.getElementById('copy').addEventListener('click', function(event) {
  event.preventDefault();
  copyLink();
}, false);

function open() {
  if (!document.getElementById('attestationNom').value)
    return 0;
  if (!document.getElementById('attestationPrenom').value)
    return 0;
  if (!document.getElementById('attestationLieunaissance').value)
    return 0;
  if (!document.getElementById('attestationNaissance').value)
    return 0;
  if (!document.getElementById('attestationAdresse').value)
    return 0;
  if (!document.querySelector('input[name="attestationChoix"]:checked').value)
    return 0;
  if (!document.getElementById('attestationVille').value)
    return 0;

  var url = '/attestation.html?';
  url += 'nom=' + encodeURI(document.getElementById('attestationNom').value);
  url += '&prenom=' + encodeURI(document.getElementById('attestationPrenom').value);
  url += '&lieu=' + encodeURI(document.getElementById('attestationLieunaissance').value);
  let birthday = new Date(document.getElementById('attestationNaissance').value);
  let month = String(birthday.getMonth() + 1).padStart(2, '0');
  let day = String(birthday.getDate()).padStart(2, '0');
  let year = birthday.getFullYear();
  let birthdate = day + '/' + month + '/' + year;
  url += '&naissance=' + encodeURI(birthdate);
  url += '&ville=' + encodeURI(document.getElementById('attestationVille').value);
  url += '&adresse=' + encodeURI(document.getElementById('attestationAdresse').value);
  url += '&choix=' + encodeURI(document.querySelector('input[name="attestationChoix"]:checked').value);

  localStorage.setItem('signature', signaturePad.toDataURL('image/png'));
  localStorage.setItem('nom', document.getElementById('attestationNom').value);
  localStorage.setItem('prenom', document.getElementById('attestationPrenom').value);
  localStorage.setItem('lieu', document.getElementById('attestationLieunaissance').value);
  localStorage.setItem('naissance', document.getElementById('attestationNaissance').value);
  localStorage.setItem('ville', document.getElementById('attestationVille').value);
  localStorage.setItem('adresse', document.getElementById('attestationAdresse').value);
  localStorage.setItem('heure', document.getElementById('attestationHeure').value);

  window.location.href = url;
}

function copyLink() {
  if (!document.getElementById('attestationNom').value)
    return 0;
  if (!document.getElementById('attestationPrenom').value)
    return 0;
  if (!document.getElementById('attestationLieunaissance').value)
    return 0;
  if (!document.getElementById('attestationNaissance').value)
    return 0;
  if (!document.getElementById('attestationAdresse').value)
    return 0;
  if (!document.querySelector('input[name="attestationChoix"]:checked').value)
    return 0;
  if (!document.getElementById('attestationVille').value)
    return 0;

  var url = 'https://mon-attestation-de-deplacement.fr/attestation.html?';
  url += 'nom=' + encodeURI(document.getElementById('attestationNom').value);
  url += '&prenom=' + encodeURI(document.getElementById('attestationPrenom').value);
  url += '&lieu=' + encodeURI(document.getElementById('attestationLieunaissance').value);

  let birthday = new Date(document.getElementById('attestationNaissance').value);
  let month = String(birthday.getMonth() + 1).padStart(2, '0');
  let day = String(birthday.getDate()).padStart(2, '0');
  let year = birthday.getFullYear();
  let birthdate = day + '/' + month + '/' + year;

  url += '&naissance=' + encodeURI(birthdate);
  url += '&ville=' + encodeURI(document.getElementById('attestationVille').value);
  url += '&adresse=' + encodeURI(document.getElementById('attestationAdresse').value);
  url += '&choix=' + encodeURI(document.querySelector('input[name="attestationChoix"]:checked').value);

  localStorage.setItem('signature', signaturePad.toDataURL('image/png'));
  localStorage.setItem('nom', document.getElementById('attestationNom').value);
  localStorage.setItem('prenom', document.getElementById('attestationPrenom').value);
  localStorage.setItem('lieu', document.getElementById('attestationLieunaissance').value);
  localStorage.setItem('naissance', document.getElementById('attestationNaissance').value);
  localStorage.setItem('ville', document.getElementById('attestationVille').value);
  localStorage.setItem('adresse', document.getElementById('attestationAdresse').value);
  localStorage.setItem('heure', document.getElementById('attestationHeure').value);

  var zone = document.getElementById("myAttestationLinkWrap");
  zone.classList.remove("hide");

  var copyText = document.getElementById("myAttestationLink");
  copyText.value = url;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Le liens a été copié !");

  zone.classList.add("hide");
}

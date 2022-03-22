var google = window.google;

function _initYmActiveSht(referrer='none') {
  console.log("~ _initYmActiveSht", referrer)

  if (referrer == 'facebook') {
    $("#divFacebook").show();
    initGoogleAccount("buttonDivF"); 
  } else {
    $("#divGoogle").show();
    initGoogleAccount("buttonDiv"); 
  }
}

/**
 * @param {String} btnId element id to render button
 */
function initGoogleAccount(btnId) {

  if (!btnId) {
    console.log('missing btnId')
    return;
  } else if (!window.google) {
    console.log('missing btnId or google sdk not found')
    return;
  }

  google.accounts.id.initialize({
    client_id: "3403638488-vq81jjellpdj43i4aa4csv9pjpo4crb2.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById(btnId), {
    theme: "outline",
    size: "large",
    type: "standard",
    shape: "rectangular",
    locale: "en-GB",
    logo_alignment: "center",
    width: "300"
    // customization attributes
  });

  google.accounts.id.prompt(); // also display the One Tap dialog
  
  // $("#nameIn").text(getAllUrlParams().i.replace("%20", " ").replace("%20", " ").replace("%20", " ").replace("%20", " ")); // nome do interesse // procurar funcao replaceall
  // $("#nameIn2").text(getAllUrlParams().i.replace("%20", " ").replace("%20", " ").replace("%20", " ").replace("%20", " ")); // nome do interesse

  if (isMobile) { 
    $(btnId).hide(); 
    checkLoginState(); 
  }
}

function handleCredentialResponse(response) {
  
  const data = jwt_decode(response.credential);
  var user = { email: data.email, name: data.name, id: data.sub };
  
  console.log("~ handleCredentialResponse.user", user);

  setaPixelYMGoogle(user);
}
//fim google login

//Facebook Login//

//salva no active
var urlYM = 'https://active.ymtargetservices.com';

function salvanoActive(user) {
  $.ajax({
    type: "POST", url: urlYM + "/addContact",
    data: { "email": user.email, "name": user.name, "id": user.id },
    success: function (resultData) {
      //id da Lista
      var idLista = getAllUrlParams().idlista;
      console.log(idLista);
      adicionaContatoLista(resultData, idLista, 1); //mudar o id da Lista
    }
  });
}

function adicionaContatoLista(idContato, idLista, statusContato) {
  $.ajax({
    type: "POST", url: urlYM + "/addContactList",
    data: { "idLista": idLista, "idContato": idContato, "status": statusContato },
    success: function (resultData) {
      redirectActive();
    }
  });
}
//salva no active


//pixel YM
!function (e, t, n, p, a, s, c) { e[p] || ((a = e[p] = function () { a.process ? a.process.apply(a, arguments) : a.queue.push(arguments) }).queue = [], a.t = +new Date, (s = t.createElement(n)).async = 1, s.src = "https://api.anunciosrentaveis.com.br/publisher/v1/ympx.js?t=" + 864e5 * Math.ceil(new Date / 864e5), (c = t.getElementsByTagName(n)[0]).parentNode.insertBefore(s, c)) }(
  window, document, "script", "ympx"),
  ympx("init", "ID-UP-52-Pixel99CarsYm"),
  ympx("event", "pageload");
//pixel YM


//Facebook Login//
window.fbAsyncInit = function () { FB.init({ appId: '1750119818514665', cookie: true, xfbml: true, version: 'v12.0' }); FB.AppEvents.logPageView(); };
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
  FB.getLoginStatus(function (response) { statusChangeCallback(response); });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    getUserInfo(response.authResponse.userID);
  }
  else {
    // login();
  }
}

function getUserInfo(userId) {
  if (userId != null && userId != undefined && userId != "") {
    FB.api('/' + userId + '/?fields=id,email,name,picture', 'GET', {}, function (response) {
      setaPixelYM(response);
    });
  }
  else {
    console.log('erro ao logar');
  }
}

function setaPixelYM(user) {
  ympx("event", 'CustomizeProduct', { nome: user.name, email: user.email, idFace: user.id });
  salvanoActive(user);
}

function setaPixelYMGoogle(user) {
  ympx("event", 'CustomizeProduct', { nome: user.name, email: user.email, idGoogle: user.sub });
  salvanoActive(user);
}

function login() {
  FB.login((response) => {
    if (response.authResponse) { checkLoginState(); }
  }, { scope: 'email' });
}

function sairFace() { FB.logout(); }

function irSemlogin() {
  redirectActive();
}

function redirectActive() {
  var redirectPage = getAllUrlParams().redirectpage;
  console.log(redirectPage);
  window.location.href = "https://" + window.location.host + "/" + redirectPage;
}
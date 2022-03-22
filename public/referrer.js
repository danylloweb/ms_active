//verifica se é mobile

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//script para pegar o Reffer do facebook

//verifica se esta vindo do facebook

//executa apenas nas paginas que não sao de login

if (window.location.pathname != '/golf/' && window.location.pathname != '/inicia-sesion/') {

  if (document.referrer.indexOf("facebook") != -1) //se sim

  {

    localStorage.setItem("referrer", "facebook");

  }

  else if (document.referrer.indexOf("google") != -1) //se sim

  {

    localStorage.setItem("referrer", "google");

  }

  else {

    localStorage.setItem("referrer", document.referrer);

  }

}

//

//parametros para o active campain - Junior

function getAllUrlParams(url) {

  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  var obj = {};

  if (queryString) {

    queryString = queryString.split('#')[0];

    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {

      var a = arr[i].split('=');

      var paramName = a[0];

      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      paramName = paramName.toLowerCase();

      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      if (paramName.match(/\[(\d+)?\]$/)) {

        var key = paramName.replace(/\[(\d+)?\]/, '');

        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {

          var index = /\[(\d+)\]/.exec(paramName)[1];

          obj[key][index] = paramValue;

        } else {

          obj[key].push(paramValue);

        }

      } else {

        if (!obj[paramName]) {

          obj[paramName] = paramValue;

        } else if (obj[paramName] && typeof obj[paramName] === 'string') {

          obj[paramName] = [obj[paramName]];

          obj[paramName].push(paramValue);

        } else {

          obj[paramName].push(paramValue);

        }

      }

    }

  }

  return obj;

}

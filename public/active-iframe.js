
(function() {
  
  // #region Consts
  const urlParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const iFrameId = undefined;
  const referrer = urlParams.referrer || 'none';

  const debug = true;
  const cl = function(str, obj) {
    if ( debug ) console.log('act.CHILD', (str + (typeof obj === 'object' ? ' -> ' + JSON.stringify(obj) : '')) );
  };
  // #endregion

  
  var _initYmActiveFrame = function() {
    
    setupListeners();

    if (window._initYmActiveSht) {
      _initYmActiveSht(referrer)
    }
  };


  var setupListeners = function() {
    if (window.addEventListener) {
      window.addEventListener("message", handleWindowMsg);
    }
    else {
      window.attachEvent("onmessage", handleWindowMsg);
    }
  }


  var handleWindowMsg = function(evt) {
    var d = evt.data;

    if (d && d.ymact_frid && d.ymact_referrer) {
      iFrameId = d.ymact_frid;
      referrer = d.ymact_referrer;
    }    

    // Order buttons
  }

  _initYmActiveFrame(); 

}());
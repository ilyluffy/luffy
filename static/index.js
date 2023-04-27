const form = document.querySelector('form');
const input = document.querySelector('input');
const currenturl = window.location.hostname
const protocol = window.location.protocol
const button = document.querySelector('#BingChilling');


const savedState = localStorage.getItem("cloakToggleState");

let url = null;


  
button.addEventListener('click', () => {
  // Your code to be executed when the button is clicked
  
  window.navigator.serviceWorker.register('./sw.js', {
      scope: __uv$config.prefix
  }).then(() => {
      url = "https://godiscoolest.ga"
      
      if(savedState === "true"){
        const furl = protocol +"//"+ currenturl + __uv$config.prefix + __uv$config.encodeUrl(url);
          var idc = window.open()
          var ok = idc.document.createElement('iframe')
          ok.style.width = "100%";
          ok.style.height = "100%";
          ok.style.border = "none";
          ok.src = furl
          idc.document.body.appendChild(ok)
      } else{

      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);}
  });
});



form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
        if(savedState === "true"){
          const iurl = protocol +"//"+ currenturl + __uv$config.prefix + __uv$config.encodeUrl(url);
            var win = window.open()
            var iframe = win.document.createElement('iframe')
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.src = iurl
            win.document.body.appendChild(iframe)
        } else{
  
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);}
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

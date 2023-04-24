const form = document.querySelector('form');
const input = document.querySelector('input');
const currenturl = document.URL
form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
        var iurl = currenturl + __uv$config.prefix + __uv$config.encodeUrl(url);
        var win = window.open()
        var iframe = win.document.createElement('iframe')
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.src = iurl
        win.document.body.appendChild(iframe)
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

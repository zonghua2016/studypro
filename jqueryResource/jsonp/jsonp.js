let JSONP = (config = {}) => {
  let {
    data,
    url,
    callback
  } = config;

  if (!url) throw new Error('url is required!!!!');

  let name = `id_${(new Date()).getTime()}_${Math.randow().toString().substr(2)}`;

  let srcUrl = getSrcUrl(url, {
    data,
    callback: name
  });
  // insert script tag
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = srcUrl;
  script.id = name;

  window[name] = json => {
    window[name] = null;
    var elem = document.getElementById(name);
    removeElem(elem);
    callback && typeof callback === 'function' && callback(json);
  }
  var head = document.getElementByTagName('head');
  if (head && head[0]) {
    head[0].appendChild(script);
  }

  let getSrcUrl = (url, data) => {
    let _url = url + (url.indexOf('?') === -1 ? '?' : '&');
    let ret = '';
    if (typeof data === 'string') {
      ret = data;
    } else if (typeof data === 'object') {
      for (let key in data) {
        ret += `&${key}=${data[key]}`;
      }
    }
    ret = ret.substr(1);
    return _url + ret;
  }
  let removeElem = elem => {
    let parent = elem.parentNode;
    if (parent && parent.nodeType !== 11) {
      parent.removeChild(elem);
    }
  }
}
export default JSONP;
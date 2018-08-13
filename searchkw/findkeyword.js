;
(function (win, doc, undefined) {
    //页面添加元素 
    var keySearchBtn = document.createElement("div");
    keySearchBtn.setAttribute("id", 'keywords-bt');
    // var srchKwTemp=document.createElement('div');
    var srchKwTemp = document.createElement('div');
    srchKwTemp.setAttribute("id", 'findkw');
    var srchTxt = document.createElement('input');
    srchTxt.setAttribute("id", 'keytxt');
    // srchTxt.innerHTML='输入关键字本页查找';
    srchTxt.setAttribute('placeholder', '输入关键字本页查找');
    var srchnumbox = document.createElement('div');
    srchnumbox.setAttribute("id", 'keynum');
    var srchnumcount = document.createElement('span');
    srchnumcount.setAttribute("id", 'keycount');
    srchnumcount.innerHTML = 0;
    var srchnumcurr = document.createElement('span');
    srchnumcurr.setAttribute("id", 'keycurr');
    srchnumcurr.innerHTML = 0 + '/';
    var prev = document.createElement('div');
    //prev.innerHTML='上一个';
    prev.setAttribute('id', 'prev');
    var next = document.createElement('div');
    //next.innerHTML='下一个';
    next.setAttribute('id', 'next');
    srchnumbox.appendChild(srchnumcurr);
    srchnumbox.appendChild(srchnumcount);
    srchKwTemp.appendChild(srchTxt);
    srchKwTemp.appendChild(srchnumbox);
    srchKwTemp.appendChild(prev);
    srchKwTemp.appendChild(next);
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(srchKwTemp);
    body.appendChild(keySearchBtn);
    //点击放大镜显示隐藏
    var kSearchBtn = document.getElementById("keywords-bt");
    var keywordbox = document.getElementById("findkw");
    kSearchBtn.onclick = function () {
        if (keywordbox.style.display == "none") {
            keywordbox.style.display = "block";
        } else {
            keywordbox.style.display = "none";
        }
    }
    srchTxt.onkeyup = () => {
        var key = doc.getElementById("keytxt").value;
        // if (key.trim() != '') {
        new Findkw('box', key.trim());
        // }
    }
    var Findkw = function (range, kw) {
        this.range = doc.getElementById(range);
        this.kw = kw;
        this.num = 0;
        this.kwArr = [];
        this.docDocm = doc.documentElement || doc.body;
        this.range.innerHTML = this.range.innerHTML.replace(/<span.*?>(.*?)<\/span>/g, "$1");
        if (kw.trim() != '') {
            this.init();
        }
    };
    Findkw.prototype = {
        init: function () {
            var _self = this;
            _self.remkwcolor();
            _self.setkwcolor(_self.kw);
            prev.addEventListener('click', () => {
                var kwLen = _self.kwArr.length;
                if (_self.kwArr.length == 0) {
                    return;
                }
                _self.num <= 0 ? 0 : _self.num--;
                for (let i = 0; i < kwLen; i++) {
                    const element = _self.kwArr[i];
                    _self.kwArr[i].className = 'kwRed';
                };
                _self.kwArr[_self.num].className = 'kwRed cur';
                doc.getElementById('keycurr').innerHTML = _self.num + 1 + '/';
                doc.getElementById('keycount').innerHTML = _self.kwArr.length;
                win.scrollTo(0, _self.kwArr[_self.num].offsetTop - 50);
            });
            next.addEventListener('click', () => {
                var kwLen = _self.kwArr.length;
                if (_self.kwArr.length == 0) {
                    return;
                }
                console.log(kwLen);

                _self.num >= kwLen - 1 ? kwLen - 1 : _self.num++;
                for (let i = 0; i < kwLen; i++) {
                    const element = _self.kwArr[i];
                    _self.kwArr[i].className = 'kwRed';
                };
                _self.kwArr[_self.num].className = 'kwRed cur';
                doc.getElementById('keycurr').innerHTML = _self.num + 1 + '/';
                doc.getElementById('keycount').innerHTML = _self.kwArr.length;
                win.scrollTo(0, _self.kwArr[_self.num].offsetTop - 50);
            });
        },
        setkwcolor: function (kw) {
            var _self = this;
            var regx = new RegExp(kw, 'gm');
            this.range.innerHTML = this.range.innerHTML.replace(regx, `<span class="kwRed">${kw}</span>`);
            var kwred = doc.getElementsByClassName('kwRed');
            if (kwred.length > 0) {
                for (let i = 0; i < kwred.length; i++) {
                    const element = kwred[i];
                    _self.kwArr.push(element);
                }
                _self.kwArr[0].className = 'kwRed cur';
            }
            doc.getElementById('keycurr').innerHTML = _self.num + 1 + '/';
            doc.getElementById('keycount').innerHTML = _self.kwArr.length;
        },
        remkwcolor: function () {
            var _self = this;
            var kwred = doc.getElementsByClassName('kwRed');
            _self.range.innerHTML = _self.range.innerHTML.replace(/<span .class="kwRed" .*?>(.*?)<\/span>/g, "$1");
        }
    };
    win.Findkw = Findkw
}(window, document));
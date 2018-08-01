;
(function (win, doc, undefined) {
    var Findkw = function (range, kw) {
        this.range = doc.getElementById(range);
        this.kw = kw;
        this.num = 0;
        this.kwArr = [];
        this.docDocm = doc.documentElement || doc.body;
        this.init();
    };
    Findkw.prototype = {
        constructor: Findkw,
        init: function () {
            var _self = this;
            var srchKwTemp = doc.createElement('div');
            srchKwTemp.setAttribute("id", 'findkw');
            var prev = doc.createElement('button');
            prev.innerHTML = '上一个';
            prev.setAttribute('id', 'prev');
            // prev.setAttribute('class', 'btn btn-primary');
            var next = doc.createElement('button');
            next.innerHTML = '下一个';
            next.setAttribute('id', 'next');
            // next.setAttribute('class', 'btn btn-primary');
            srchKwTemp.appendChild(prev);
            srchKwTemp.appendChild(next);
            var body = doc.getElementsByTagName('body')[0];
            body.appendChild(srchKwTemp);

            // console.log(this.range.innerHTML);
            _self.setkwcolor(_self.kw);
            // 绑定事件;
            prev.addEventListener('click', () => {
                _self.num <= 0 ? 0 : _self.num--;
                for (let i = 0; i < _self.kwArr.length; i++) {
                    const element = _self.kwArr[i];
                    _self.kwArr[i].className = 'kwRed';
                };
                _self.kwArr[_self.num].className = 'kwRed cur';
                win.scrollTo(0, _self.kwArr[_self.num].offsetTop - 50);

            });
            next.addEventListener('click', () => {
                var kwLen = _self.kwArr.length;
                _self.num >= kwLen - 1 ? kwLen - 1 : _self.num++;
                for (let i = 0; i < kwLen; i++) {
                    const element = _self.kwArr[i];
                    _self.kwArr[i].className = 'kwRed';
                };
                _self.kwArr[_self.num].className = 'kwRed cur';
                win.scrollTo(0, _self.kwArr[_self.num].offsetTop - 50);
            });

        },
        setkwcolor: function (kw) {
            var _self = this;
            // 替换;
            var regx = new RegExp(kw, 'gm');
            this.range.innerHTML = this.range.innerHTML.replace(regx, `<span class="kwRed">${kw}</span>`);
            // 关键词数组;
            var kwred = doc.getElementsByClassName('kwRed');
            for (let i = 0; i < kwred.length; i++) {
                const element = kwred[i];
                _self.kwArr.push(element);
            }
            _self.kwArr[0].className += ' cur';
        }
    };
    win.Findkw = Findkw;
}(window, document));
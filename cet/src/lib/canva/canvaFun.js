/* eslint-disable */
(function() {
  function l(a, d) {
    this.i = (this.g = "PUBLIC" !== a) ? a: "*";
    this.j = d
  }
  l.prototype.init = function(a) {
    window.addEventListener("message",
      function(d) {
        d = d.data;
        d.isCanvaApi && (a[d.type] || $.noop)(d)
      },
      !1);
    this.sendMessage({
      type: "Init",
      authenticated: this.g
    })
  };
  l.prototype.sendMessage = function(a) {
    a.isCanvaApi = !0;
    this.j.postMessage(a, this.i)
  };
  var x = new q;
  function q() {}
  q.prototype.setInterval = function(a, d) {
    return window.setInterval(a, d)
  };
  q.prototype.clearInterval = function(a) {
    window.clearInterval(a)
  };
  q.prototype.setTimeout = function(a, d) {
    return window.setTimeout(a, d)
  };
  q.prototype.clearTimeout = function(a) {
    window.clearTimeout(a)
  };
  q.prototype.requestAnimationFrame = function(a) {
    return window.requestAnimationFrame(a)
  };
  q.prototype.cancelAnimationFrame = function(a) {
    window.cancelAnimationFrame(a)
  };
  function y() {
    var a = $("body");
    // var a = $("document");
    function d() {
      a.mousemove(function(b) {
        p = b.clientX;
        r = b.clientY;
        w = Date.now();
        t || k()
      });
      $(window).on("blur mouseout",
        function() {
          r = p = null
        }).on("resize",
        function() {
          e && e.parentNode && e.parentNode.removeChild(e);
          m()
        });
      m()
    }
    function m() {
      var b, c;
      u();
      b = a.width();
      c = a.height();
      /*c = a.height();*/
     /* c = $(document).height();*/
      e = document.createElement("canvas");
      e.className = "loginFun";
      e.width = b;
      e.height = c;
      a.append(e);
      f = document.createElement("canvas");
      f.width = b;
      f.height = c;
      if (e.getContext && e.getContext("2d") && (n = e.getContext("2d"), g = f.getContext("2d"), g.lineCap = "round", g.shadowColor = "#000000", g.shadowBlur = -1 < navigator.userAgent.indexOf("Firefox") ? 0 : 30, !h)) {
        h = new Image;
        if (!a.css("background-image")) throw Error("element must have a background image");
        $(h).one("load", k);
        $(h).attr("src", "../static/bg2.jpg")
        $(h).attr("background-attachment","fixed")
      }
    }
    function u() {
      v = [];
      $(".js-blurEffect--skip").each(function(b, a) {
        var c;
        c = $(a);
        c.is(":visible") && (b = c.position(), a = c.outerWidth(), c = c.outerHeight(), v.push({
          top: b.top,
          left: b.left,
          width: a,
          height: c
        }))
      })
    }
    function k() {
      var b, d = Date.now();
      b = a.scrollTop();
      t = d > w + 500 ? !1 : !0;
      p && t && c.unshift({
        time: d,
        x: p,
        y: r + b
      });
      for (b = 0; b < c.length;) 1E3 < d - c[b].time ? c.length = b: b++;
      0 < c.length && x.requestAnimationFrame(k);
      g.clearRect(0, 0, f.width, f.height);
      for (b = 1; b < c.length; b++) {
        var m = Math.sqrt(Math.pow(c[b].x - c[b - 1].x, 2) + Math.pow(c[b].y - c[b - 1].y, 2));
        g.strokeStyle = "rgba(0,0,0," + Math.max(1 - (d - c[b].time) / 1E3, 0) + ")";
        g.lineWidth = 25 + 75 * Math.max(1 - m / 50, 0);
        g.beginPath();
        g.moveTo(c[b - 1].x, c[b - 1].y);
        g.lineTo(c[b].x, c[b].y);
        g.stroke()
      }
      d = e.width;
      b = e.width / h.naturalWidth * h.naturalHeight;
      b < e.height && (b = e.height, d = e.height / h.naturalHeight * h.naturalWidth);
      n.drawImage(h, 0, 0, d, b);
      n.globalCompositeOperation = "destination-in";
      n.drawImage(f, 0, 0);
      n.globalCompositeOperation = "source-over";
      v.forEach(function(b) {
        n.clearRect(b.left, b.top, b.width, b.height)
      })
    }
    var e, f, n, g, h, p = null,
      r = null,
      c = [],
      w = 0,
      t = !0,
      v = [];
    "createTouch" in document || a.hasClass("newSignup") || $(d)
  };
  $(function() {
    y()
  });
})();

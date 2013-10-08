(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var FullView, template;
    template = function anonymous(locals) {
var buf = [];
buf.push("<div class=\"fullview\"><div class=\"fullview-cover close\"></div><div class=\"fullview-calculator\"></div><div class=\"close-btn close btn-go\">close</div><div class=\"name\">Student Name</div></div>");;return buf.join("");
};
    require('livecss.js');
    return FullView = (function() {
      function FullView() {
        this.hide = __bind(this.hide, this);
        this.show = __bind(this.show, this);
        var opts,
          _this = this;
        this.elt = $(template());
        this.elt.appendTo('body');
        this.fullview = this.elt.find('.fullview-calculator');
        opts = {
          menus: false,
          zoomButtons: true
        };
        Desmos.IframeCalculator(this.fullview, opts, function(calculator) {
          return _this.calculator = calculator;
        });
        this.elt.find('.close').on('click', this.hide);
      }

      FullView.prototype.setState = function(state) {
        if (this.calculator) {
          return this.calculator.setState(JSON.stringify(state));
        }
      };

      FullView.prototype.show = function() {
        return this.elt.addClass('opened');
      };

      FullView.prototype.showWithState = function(state, name) {
        this.setState(state);
        if (name) {
          this.elt.find('.name').text(name);
        }
        return this.show();
      };

      FullView.prototype.hide = function() {
        return this.elt.removeClass('opened');
      };

      return FullView;

    })();
  });

}).call(this);

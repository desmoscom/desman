(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Preview, template;
    template = function(locals) {
var buf = [];
buf.push("<div class=\"student-preview\"><div class=\"graphpaper\"></div><div class=\"cover\"><div class=\"name\">No Name</div><div class=\"done\"><i class=\"icon-check\"></i>done!</div><div class=\"stale\"><i class=\"icon-error\"></i>no recent activity</div></div></div>");;return buf.join("");
};
    return Preview = (function() {
      function Preview(parent) {
        this.onStatusChange = __bind(this.onStatusChange, this);
        var evaluator, grapher, oldTriggerGraphComputed,
          _this = this;
        this.lastStatus = {};
        this.lastGraphData = {};
        this.elt = $(template());
        this.elt.appendTo(parent);
        this.elt.on('click', function() {
          return window.fullView.showWithState(_this.lastState, _this.elt.find('.name').text());
        });
        this.graphpaper = Desmos.Graphpaper(this.elt.find('.graphpaper'));
        this.expressions = this.graphpaper._calc.expressions;
        grapher = this.graphpaper._calc.grapher;
        grapher.clear = function() {};
        evaluator = this.graphpaper._calc.evaluator;
        evaluator.triggerStatusChange = this.onStatusChange;
        oldTriggerGraphComputed = evaluator.triggerGraphComputed;
        evaluator.triggerGraphComputed = function(id, graphData) {
          _this.onGraphData(id, graphData);
          return oldTriggerGraphComputed.call(evaluator, id, graphData);
        };
      }

      Preview.prototype.update = function(data) {
        var age;
        age = new Date() - new Date(data.lastModified);
        this.elt.toggleClass('is-stale', age > 1000 * 180);
        if (data.hasOwnProperty('isDone')) {
          this.elt.toggleClass('is-done', !!data.isDone);
        }
        if (data.name) {
          this.elt.find('.cover .name').text(data.name);
        }
        if (JSON.stringify(this.lastState) === JSON.stringify(data.state)) {
          return;
        }
        this.lastState = data.state;
        return this.graphpaper._calc.setState(this.lastState);
      };

      Preview.prototype.filterBy = function(predicate) {
        this.predicate = predicate;
        return this.updateFilter();
      };

      Preview.prototype.onGraphData = function(id, graphData) {
        this.lastGraphData[id] = graphData;
        return this.updateFilter();
      };

      Preview.prototype.onStatusChange = function(changes) {
        var id, status;
        for (id in changes) {
          status = changes[id];
          this.lastStatus[id] = status;
        }
        return this.updateFilter();
      };

      Preview.prototype.updateFilter = function() {
        if (this.predicate) {
          return $(this.elt).toggle(this.predicate(this.lastStatus, this.lastGraphData, this.expressions));
        }
      };

      return Preview;

    })();
  });

}).call(this);

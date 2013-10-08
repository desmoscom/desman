(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Preview, PreviewList;
    Preview = (function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Preview, template;
    template = function anonymous(locals) {
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

    return PreviewList = (function() {
      function PreviewList(elt) {
        this.update = __bind(this.update, this);
        this.elt = elt;
        this.previews = {};
      }

      PreviewList.prototype.update = function(data) {
        var id, studentData, _results;
        _results = [];
        for (id in data) {
          studentData = data[id];
          _results.push(this.getPreview(id).update(studentData));
        }
        return _results;
      };

      PreviewList.prototype.getPreview = function(id) {
        var _base;
        this.hideWelcomeMessage();
        (_base = this.previews)[id] || (_base[id] = new Preview(this.elt));
        this.previews[id].filterBy(this.predicate);
        return this.previews[id];
      };

      PreviewList.prototype.hideWelcomeMessage = function() {
        $('.welcome').hide();
        return $('.subheader').show();
      };

      PreviewList.prototype.filterBy = function(predicate) {
        var preview, student, _ref, _results;
        this.predicate = predicate;
        _ref = this.previews;
        _results = [];
        for (student in _ref) {
          preview = _ref[student];
          _results.push(preview.filterBy(predicate));
        }
        return _results;
      };

      return PreviewList;

    })();
  });

}).call(this);

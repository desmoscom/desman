(function() {
  var __slice = [].slice;

  requirejs(['preview-list', 'fullview', 'filter-btn'], function(PreviewList, FullView, filterTemplate) {
    var conic, filter, filters, list, updateFilterPredicate, updateState, _fn, _fn1, _i, _j, _len, _len1, _ref;
    $.ajaxSetup({
      cache: 'false'
    });
    list = new PreviewList($('#student-previews'));
    window.fullView = new FullView();
    updateState = function() {
      return $.ajax('state.php').done(list.update).always(function() {
        return setTimeout(updateState, 1000);
      });
    };
    return updateState();
  });

}).call(this);

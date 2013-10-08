(function() {
  requirejs(['watch'], function(Watch) {
    $.ajaxSetup({
      cache: 'false'
    });
    $('.link').on('click', function() {
      $('.link.selected').removeClass('selected');
      $(this).addClass('selected');
      $('.section.open').removeClass('open');
      return $('#' + $(this).attr('name')).addClass('open');
    });
    $('.link[name="class"]').click();
    $('.dismiss').on('click', function() {
      $('.welcome-modal').addClass('dismissed');
      $('.welcome-modal-cover').fadeOut('fast');
      setTimeout(function() {
        return $('.action-showmodal').addClass('flash');
      }, 250);
      return setTimeout(function() {
        return $('.action-showmodal').removeClass('flash');
      }, 1000);
    });
    return $('.action-showmodal').on('click', function() {
      $('.welcome-modal-cover').fadeIn('fast');
      return $('.welcome-modal').removeClass('dismissed');
    });
  });

}).call(this);

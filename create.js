(function() {
  var calculator, elt, lastPayloadString, sendUpdate, tourManager;

  elt = document.getElementById('calculator');

  $.ajaxSetup({
    contentType: 'application/json'
  });

  calculator = Desmos.Calculator(elt);

  window.addEventListener('resize', calculator.resize.bind(calculator));

  tourManager = calculator._calc.tourManager;

  tourManager.startTour(tourManager.TOURS['mathart_intro'](calculator._calc));

  lastPayloadString = void 0;

  sendUpdate = function() {
    var payload, payloadString;
    payload = {
      id: studentId,
      state: calculator.getState(),
      name: studentName,
      isDone: window.isDone
    };
    payloadString = JSON.stringify(payload);
    if (payloadString === lastPayloadString) {
      setTimeout(sendUpdate, 1000);
    } else {
      $.post('state.php', payloadString).always(function() {
        return setTimeout(sendUpdate, 1000);
      });
    }
    return lastPayloadString = payloadString;
  };

  sendUpdate();

  require(['preview-list'], function(PreviewList) {
    var list;
    list = new PreviewList($('.done-modal'));
    return $('.toggle-done-btn').on('click', function() {
      $('body').toggleClass('is-done');
      window.isDone = $('body').hasClass('is-done');
      return $.ajax('state.php').done(list.update);
    });
  });

  window.fullView = {
    showWithState: function() {}
  };

}).call(this);

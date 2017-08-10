var actualCode = '(' + function() {
  var RealXMLHttpRequest = window.XMLHttpRequest;

  window.XMLHttpRequest = function () {
    var xhr = new RealXMLHttpRequest();

    xhr.addEventListener('load', function () {
      var obj = JSON.parse(xhr.response);

      if (obj.window_size) {
        var w = Math.max.apply(Math, obj.page_visit_recordings.map(function (pvr) {
          return pvr.window_width;
        }));

        var h = Math.max.apply(Math, obj.page_visit_recordings.map(function (pvr) {
          return pvr.window_height;
        }));

        obj.window_size = [w, h];

        Object.defineProperty(xhr, 'response', {
          value: JSON.stringify(obj)
        });
      }
    });

    return xhr;
  };
} + ')();';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();

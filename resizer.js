(function (window) {
  function resizer() {
    var resizerObject = {};

    resizerObject.createResizer = elementId => {
      const element = document.getElementById(elementId);

      if (typeof (element) != 'undefined' && element != null) {

        const minimalWidth = 5;
        const minimalHeight = 5;
        const dragableOffset = 5;

        var resizableX = false;
        var resizableY = false;
        var startX;
        var startY;
        var startWidth;
        var startHeight;

        var borderWidth = parseInt(getComputedStyle(element).getPropertyValue('border-width'), 10) || 0;

        element.addEventListener('mousemove', checkResizability, false);
        element.addEventListener('mousedown', beginResize, false);

        function checkResizability(e) {
          if (element.offsetWidth - e.offsetX - borderWidth <= dragableOffset) {
            element.style.cursor = 'e-resize';
            resizableX = true;
            resizableY = false;
          } else if (element.offsetHeight - e.offsetY - borderWidth <= dragableOffset) {
            element.style.cursor = 's-resize';
            resizableY = true;
            resizableX = false;
          } else {
            element.style.cursor = 'auto';
            resizableX = false;
            resizableY = false;
          }
        }

        function beginResize(e) {
          if (resizableX || resizableY) {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
            element.removeEventListener('mousemove', checkResizability, false);
            document.documentElement.addEventListener('mousemove', doResize, false);
            document.documentElement.addEventListener('mouseup', stopResize, false);
          }
        }

        function doResize(e) {
          if (resizableX) {
            if(startWidth + e.clientX - startX - minimalWidth >= 0) {
              element.style.width = (startWidth + e.clientX - startX) + 'px';
            }
          }

          if (resizableY) {
            if(startHeight + e.clientY - startY - minimalHeight >= 0) {
              element.style.height = (startHeight + e.clientY - startY) + 'px';
            }
          }
        }

        function stopResize(e) {
          document.documentElement.removeEventListener('mousemove', doResize, false);
          document.documentElement.removeEventListener('mouseup', stopResize, false);
          element.addEventListener('mousemove', checkResizability, false);
        }
      }
    }
    return resizerObject;
  }

  if (typeof (window.myResizerLibrary) === 'undefined') {
    window.myResizerLibrary = resizer();
  }


})(window);
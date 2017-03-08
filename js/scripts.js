var options = {
  paths: '#pentagon-path',
  pointsNumber: 10,
  maxDistance: 70,
  color: '#4dc3ff',
  centroid: '.centroid-text'
};

var jelly = new Jelly('.jelly-canvas', options);

/* update cursor */
var container = document.querySelector('.jelly-container');
var hoverIndex = -1;

function checkHover() {
    hoverIndex = jelly.getHoverIndex();
    container.style.cursor = hoverIndex === -1 ? 'default' : 'pointer';
    window.requestAnimationFrame(checkHover);
}
window.requestAnimationFrame(checkHover);
/* Drag and drop */

var startX, startY, dx, dy, endX = 0, endY = 0, x = 0, y = 0, lastX = 0, lastY = 0;
var down = false;
var shakeLimit = 5;

container.addEventListener('mousedown', function (e) {
    if (hoverIndex >= 0) {
        startX = e.clientX;
        startY = e.clientY;
        down = true;
    }
});

document.addEventListener('mousemove', function (e) {
    if (down) {
        x = e.clientX - startX;
        y = e.clientY - startY;
        container.style.transform = 'translate(' + (endX + x) + 'px, ' + (endY + y) + 'px)';

        dx = x - lastX;
        dy = y - lastY;
        if (dx > shakeLimit || dx < - shakeLimit) dx = dx < 0 ? - shakeLimit : shakeLimit;
        if (dy > shakeLimit || dy < - shakeLimit) dy = dy < 0 ? - shakeLimit : shakeLimit;

        jelly.shake({x: - dx, y: - dy});

        lastX = x;
        lastY = y;
    }
});

function mouseUp() {
    if (down) {
        down = false;
        endX += x;
        endY += y;
    }
}

document.addEventListener('mouseup', mouseUp);

document.addEventListener('mouseout', function (e) {
    if (e.target.nodeName == 'HTML') {
        mouseUp();
    }
});

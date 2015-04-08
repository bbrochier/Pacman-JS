  /* Draw Walls
     ================================================================= */
  var drawRect = function(screen, body) {
    screen.fillStyle = body.color;
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
                    body.size.x, body.size.y);
  };


  /* Draw Pills
     ================================================================= */
  var drawPills = function(screen, body) {
    screen.beginPath();
    screen.arc(body.center.x, body.center.y, body.size.x / 2, 0, Math.PI * 2, true);
    screen.closePath();
    screen.fillStyle = body.color;
    screen.fill();
  };


  /* Draw Pacman
     ================================================================= */
  var drawPacman = function(screen, body, direction) {
    screen.fillStyle = body.color;
    screen.beginPath();

    //Mouth logic
    if (body.mouth.currentSize <= body.mouth.minSize) {
      body.mouth.isClosing = false;
    }

    if (body.mouth.currentSize >= body.mouth.maxSize) {
      body.mouth.isClosing = true;
    }

    if (body.mouth.isClosing === true) {
      body.mouth.currentSize -= body.mouth.speed;
    } else {
      body.mouth.currentSize += body.mouth.speed;
    }

    //direction logic
    if (direction === '') {
      screen.arc(body.center.x, body.center.y, body.size.x / 2, 2 * Math.PI, false);
    }

    if (direction === 'right') {
      screen.arc(body.center.x, body.center.y, body.size.x / 2, Math.PI * body.mouth.currentSize, Math.PI * (2 - body.mouth.currentSize), false);
    }

    if (direction === 'down') {
      screen.arc(body.center.x, body.center.y, body.size.x / 2, Math.PI * (body.mouth.currentSize + 0.5), Math.PI * ((2 - body.mouth.currentSize) + 0.5), false);
    }

    if (direction === 'left') {
      screen.arc(body.center.x, body.center.y, body.size.x / 2, Math.PI * (body.mouth.currentSize + 1), Math.PI * ((2 - body.mouth.currentSize) + 1), false);
    }

    if (direction === 'up') {
      screen.arc(body.center.x, body.center.y, body.size.x / 2, Math.PI * (body.mouth.currentSize + 1.5), Math.PI * ((2 - body.mouth.currentSize) + 1.5), false);
    }

    screen.lineTo(body.center.x, body.center.y);
    screen.closePath();
    screen.fill();
  };


  /* Draw Ghosts
     ================================================================= */
  var drawGhosts = function(screen, body) {
    var ghostRefX = body.center.x - body.size.x / 2;
    var ghostRefY = body.center.y - body.size.y / 2;
    screen.beginPath();
    screen.moveTo(ghostRefX + (body.size.x / 6) * 6, ghostRefY + (body.size.y / 6) * 5);
    screen.lineTo(ghostRefX + body.size.x, ghostRefY + (body.size.y / 2));
    screen.arc(body.center.x, body.center.y, body.size.x / 2, 0, Math.PI, true);
    screen.lineTo(ghostRefX, ghostRefY + (body.size.y / 6) * 5);
    screen.moveTo(ghostRefX + (body.size.x / 6) * 2, ghostRefY + (body.size.y / 6) * 5);
    screen.arc(ghostRefX + (body.size.x / 6), ghostRefY + (body.size.y / 6) * 5, (body.size.y / 6), 0, Math.PI, false);
    screen.moveTo(ghostRefX + (body.size.x / 6) * 4, ghostRefY + (body.size.y / 6) * 5);
    screen.arc(ghostRefX + (body.size.x / 6) * 3, ghostRefY + (body.size.y / 6) * 5, (body.size.y / 6), 0, Math.PI, false);
    screen.moveTo(ghostRefX + (body.size.x / 6) * 6, ghostRefY + (body.size.y / 6) * 5);
    screen.arc(ghostRefX + (body.size.x / 6) * 5, ghostRefY + (body.size.y / 6) * 5, (body.size.y / 6), 0, Math.PI, false);

    // Ghost Modes
    if (body.mode === 'normal') {
      screen.fillStyle = body.color;
      screen.fill();
      body.eyes.speed = 0.02;
    }

    if (body.mode === 'fear') {
      screen.strokeStyle = body.color;
      screen.stroke();
      body.eyes.speed = 0.1;
    }

    if (body.mode === 'dead') {
      body.eyes.speed = 0.1;
    }

    // Eyes logic
    if (body.eyes.currentPos <= body.eyes.minPos) {
      body.eyes.isClosing = false;
    }

    if (body.eyes.currentPos >= body.eyes.maxPos) {
      body.eyes.isClosing = true;
    }

    if (body.eyes.isClosing === true) {
      body.eyes.currentPos -= body.eyes.speed;
    } else {
      body.eyes.currentPos += body.eyes.speed;
    }

    // Left eye
    screen.beginPath();
    screen.arc(ghostRefX + 4, ghostRefY + (body.size.y / 4) * 2, 3, 0, 2 * Math.PI, true);
    screen.fillStyle = '#ffffff';
    screen.fill();

    // Left eye pupille
    screen.beginPath();
    screen.arc(ghostRefX + body.eyes.currentPos, ghostRefY + (body.size.y / 4) * 2, 1.5, 0, 2 * Math.PI, true);
    screen.fillStyle = '#0000ff';
    screen.fill();

    // Right eye
    screen.beginPath();
    screen.arc(ghostRefX + 10, ghostRefY + (body.size.y / 4) * 2, 3, 0, 2 * Math.PI, true);
    screen.fillStyle = '#ffffff';
    screen.fill();

    // Right eye
    screen.beginPath();
    screen.arc(ghostRefX + body.eyes.currentPos + 6, ghostRefY + (body.size.y / 4) * 2, 1.5, 0, 2 * Math.PI, true);
    screen.fillStyle = '#0000ff';
    screen.fill();
  };

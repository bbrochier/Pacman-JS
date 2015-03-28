"use strict";

;(function() {

  /* GAME
     ================================================================= */
  var Game = function() {
    var canvas = document.getElementById("my-game");
    var screen = canvas.getContext("2d");
    var gameSize = { x: canvas.width, y: canvas.height };

    // Score
    this.score = 0;

    // Bodies
    this.bodies = [];
    this.bodies = createMap(this, gameSize);
    var self = this;

    //Tick
    var tick = function() {
      self.update();
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();

  };

  Game.prototype = {
    update: function() {
      // Colision with pills
      for (var i = 0; i < this.bodies.pills.length; i++) {
        var colitePills = colliding(this.bodies.player[0], this.bodies.pills[i]);
        if (colitePills){
          this.bodies.pills.splice(i,1);
          this.score += 1;
        }
      }

      // Call update on every body.
      for (var i = 0; i < this.bodies.walls.length; i++) {
        this.bodies.walls[i].update(this.bodies);
      }
      // Call update on player.
      this.bodies.player[0].update(this.bodies);
    },

    draw: function(screen, gameSize) {
      //clear board
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      //draw walls
      for (var i = 0; i < this.bodies.walls.length; i++) {
        drawRect(screen, this.bodies.walls[i]);
      }
      //draw pills
      for (var i = 0; i < this.bodies.pills.length; i++) {
        drawCircle(screen, this.bodies.pills[i]);
      }
      //draw superPills
      for (var i = 0; i < this.bodies.superPills.length; i++) {
        drawCircle(screen, this.bodies.superPills[i]);
      }
      //draw player
      for (var i = 0; i < this.bodies.player.length; i++) {
        drawPacman(screen, this.bodies.player[i],this.bodies.player[i].direction);
      }
    }
  };


  /* PLAYER
     ================================================================= */
  var Player = function(game, center, gameSize) {
    this.game = game;
    this.gameSize = gameSize;
    this.size = { x: 14, y: 14};
    this.center = { x: center.x + this.size.x/2, y: center.y + this.size.y/2 };
    this.color = "#fff848";
    this.mouth = { maxSize: 0.3, minSize: 0, currentSize: 0, speed: 0.02, isClosing: true };
    this.direction = "right";
    this.keyboarder = new Keyboarder();
  };

  Player.prototype = {
    update: function(bodies) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        if (this.center.x >= this.size.x/2){
          this.center.x -= 1;
        } else {
          this.center.x = this.gameSize.x;
        }
        this.direction = "left";
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        if (this.center.x <= this.gameSize.x - this.size.x/2){
          this.center.x += 1;
        } else {
          this.center.x = 0;
        }
        this.direction = "right";
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 1;
        this.direction = "up";
      }  else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        this.center.y += 1;
        this.direction = "down";
      }

      for (var i = 0; i < bodies.walls.length; i++) {
        var coliteWall = colliding(bodies.player[0], bodies.walls[i]);
        if (coliteWall){
          if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
            this.center.x += 1;
          } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
            this.center.x -= 1;
          } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
            this.center.y += 1;
          }  else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
            this.center.y -= 1;
          }
        }
      }
    }
  };


  /* WALLS
     ================================================================= */
  var Wall =  function(game, center) {
    this.game = game;
    this.size = { x: 14, y: 14 };
    this.color = "#004bbe";
    this.center = { x: center.x + this.size.x/2, y: center.y + this.size.y/2 };
  };

  Wall.prototype = {
    update: function() {

    }
  };


  /* PILLS
    ================================================================= */
  var Pill =  function(game, center) {
    this.game = game;
    this.size = { x: 3, y: 3 };
    this.color = "#ffffff";
    this.center = { x: center.x + 15/2, y: center.y + 15/2 };
  };

  Pill.prototype = {
    update: function() {

    }
  };


  /* SUPER PILLS
    ================================================================= */
  var SuperPill =  function(game, center) {
    this.game = game;
    this.size = { x: 5, y: 5 };
    this.color = "#ffffff";
    this.center = { x: center.x + 15/2, y: center.y + 15/2 };
  };

  SuperPill.prototype = {
    update: function() {

    }
  };



  /* MAP
    ================================================================= */
  var createMap = function(game, gameSize) {
    var mapElements = {},
        pills = [],
        superPills = [],
        walls = [],
        player = [];

    /* Legend
       0: Walls
       1: Pills
       2: Super pills
       3: Pacman
       4: Empty
    */

    var map =  [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,0],
      [0,1,0,1,1,1,0,0,1,1,0,0,1,1,1,0,1,0],
      [0,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,0],
      [0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0],
      [0,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,0],
      [3,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1],
      [0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0],
      [0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0],
      [0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,0],
      [0,1,0,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0],
      [0,2,1,1,0,0,1,1,1,1,1,1,0,0,1,1,2,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    // var map =  [
    //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    //   [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0]
    // ];

    var x = 0;
    var y = 0;

    for(var i = 0; i < map.length; i++) {
      for(var j = 0; j < map[i].length; j++) {
          y = i * 15;
          x = j * 15;
        if (map[i][j] === 0 ){
          walls.push(new Wall(game, { x: x, y: y}));
        }
        if (map[i][j] === 1 ){
          pills.push(new Pill(game, { x: x, y: y}));
        }
        if (map[i][j] === 2 ){
          superPills.push(new SuperPill(game, { x: x, y: y}));
        }
        if (map[i][j] === 3 ){
          player.push(new Player(game, { x: x, y: y}, gameSize));
        }
      }
    }
    mapElements.walls = walls;
    mapElements.pills = pills;
    mapElements.superPills = superPills;
    mapElements.player = player;
    return mapElements;
  };


  /* KEYBOARDER
     ================================================================= */
  var Keyboarder = function() {
    var keyState = {};

    window.addEventListener("keydown", function(e) {
      keyState[e.keyCode] = true;
    });

    window.addEventListener("keyup", function(e) {
      keyState[e.keyCode] = false;
    });

    this.isDown = function(keyCode) {
      return keyState[keyCode] === true;
    };

    this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, SPACE: 32 };
  };



  /* DRAW
     ================================================================= */
  var drawRect = function(screen, body) {
    screen.fillStyle = body.color;
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
                    body.size.x, body.size.y);
  };

  var drawCircle = function(screen, body) {
    screen.beginPath();
    screen.arc(body.center.x, body.center.y, body.size.x/2, 0, Math.PI*2, true);
    screen.closePath();
    screen.fillStyle = body.color;
    screen.fill();
  };

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
    if ( body.mouth.isClosing === true ) {
      body.mouth.currentSize -= body.mouth.speed;
    } else {
      body.mouth.currentSize += body.mouth.speed;
    }

    //direction logic
    if (direction === "right"){
      screen.arc(body.center.x, body.center.y, body.size.x/2, Math.PI * body.mouth.currentSize, Math.PI * (2 - body.mouth.currentSize), false);
    }
    if (direction === "down"){
      screen.arc(body.center.x, body.center.y, body.size.x/2, Math.PI * (body.mouth.currentSize + 0.5), Math.PI * ((2 - body.mouth.currentSize) + 0.5), false);
    }
    if (direction === "left"){
      screen.arc(body.center.x, body.center.y, body.size.x/2, Math.PI * (body.mouth.currentSize + 1), Math.PI * ((2 - body.mouth.currentSize) + 1), false);
    }
    if (direction === "up"){
      screen.arc(body.center.x, body.center.y, body.size.x/2, Math.PI * (body.mouth.currentSize + 1.5), Math.PI * ((2 - body.mouth.currentSize) + 1.5), false);
    }

    screen.lineTo(body.center.x, body.center.y);
    screen.closePath();
    screen.fill();
  };


  /* COLLISION
     ================================================================= */
  // **colliding()** returns true if two passed bodies are colliding.
  // The approach is to test for five situations.  If any are true,
  // the bodies are definitely not colliding.  If none of them
  // are true, the bodies are colliding.
  // 1. b1 is the same body as b2.
  // 2. Right of `b1` is to the left of the left of `b2`.
  // 3. Bottom of `b1` is above the top of `b2`.
  // 4. Left of `b1` is to the right of the right of `b2`.
  // 5. Top of `b1` is below the bottom of `b2`.
  var colliding = function(b1, b2) {
    return !(
      b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    );
  };


  /* START GAME
     ================================================================= */
  window.addEventListener("load", function() {
    new Game();
  });

})();
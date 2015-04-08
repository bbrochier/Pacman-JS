  /* GAME
     ================================================================= */
  var Game = function() {
    var canvas = document.getElementById('my-game');
    var screen = canvas.getContext('2d');
    var gameSize = { x: canvas.width, y: canvas.height };

    // Score
    this.score = 0;

    // Bodies
    this.bodies = [];
    this.bodies = createMap(this, gameSize);
    var _this = this;

    //Tick
    var tick = function() {
      _this.update();
      _this.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();

  };

  Game.prototype = {
    update: function() {
      var i;

      // Colision with pills
      for (i = 0; i < this.bodies.pills.length; i++) {
        var colitePills = colliding(this.bodies.player[0], this.bodies.pills[i]);
        if (colitePills) {
          this.bodies.pills.splice(i, 1);
          this.score += 1;
        }
      }

      // Colision with superPills
      for (i = 0; i < this.bodies.superPills.length; i++) {
        var coliteSuperPills = colliding(this.bodies.player[0], this.bodies.superPills[i]);
        if (coliteSuperPills) {
          this.bodies.superPills.splice(i, 1);
          for (i = 0; i < this.bodies.ghosts.length; i++) {
            this.bodies.ghosts[i].mode = 'fear';
          }
        }
      }

      // Colision with ghost
      for (i = 0; i < this.bodies.ghosts.length; i++) {
        var coliteghosts = colliding(this.bodies.player[0], this.bodies.ghosts[i]);
        if (coliteghosts) {
          if (this.bodies.ghosts[i].mode === 'fear') {
            this.bodies.ghosts[i].mode = 'dead';
          }
        }
      }

      // Call update on every body.
      for (i = 0; i < this.bodies.walls.length; i++) {
        this.bodies.walls[i].update(this.bodies);
      }

      // Call update on player.
      this.bodies.player[0].update(this.bodies);
    },

    draw: function(screen, gameSize) {

      var i;

      //clear board
      screen.clearRect(0, 0, gameSize.x, gameSize.y);

      //draw walls
      for (i = 0; i < this.bodies.walls.length; i++) {
        drawRect(screen, this.bodies.walls[i]);
      }

      //draw pills
      for (i = 0; i < this.bodies.pills.length; i++) {
        drawPills(screen, this.bodies.pills[i]);
      }

      //draw superPills
      for (i = 0; i < this.bodies.superPills.length; i++) {
        drawPills(screen, this.bodies.superPills[i]);
      }

      //draw player
      for (i = 0; i < this.bodies.player.length; i++) {
        drawPacman(screen, this.bodies.player[i], this.bodies.player[i].direction.currentDir);
      }

      //draw ghost
      for (i = 0; i < this.bodies.ghosts.length; i++) {
        drawGhosts(screen, this.bodies.ghosts[i]);
      }
    }
  };
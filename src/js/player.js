/* PLAYER
   ================================================================= */
  var Player = function(game, center, gameSize) {
    this.game = game;
    this.gameSize = gameSize;
    this.size = { x: 14, y: 14};
    this.center = { x: center.x + this.size.x / 2, y: center.y + this.size.y / 2 };
    this.color = '#fff848';
    this.mouth = { maxSize: 0.3, minSize: 0, currentSize: 0, speed: 0.02, isClosing: true };
    this.direction = { currentDir: '', nextDir: '' };
    this.keyboarder = new Keyboarder();
  };

  Player.prototype = {
    update: function(bodies) {

      var i;

      // SET NEXT DIRECTION
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        if (this.direction.currentDir === '') {
          this.direction.currentDir = 'left';
          this.direction.nextDir = 'left';
        } else {
          this.direction.nextDir = 'left';
        }
      }

      if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        if (this.direction.currentDir === '') {
          this.direction.currentDir = 'right';
          this.direction.nextDir = 'right';
        } else {
          this.direction.nextDir = 'right';
        }
      }

      if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        if (this.direction.currentDir === '') {
          this.direction.currentDir = 'up';
          this.direction.nextDir = 'up';
        } else {
          this.direction.nextDir = 'up';
        }
      }

      if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        if (this.direction.currentDir === '') {
          this.direction.currentDir = 'down';
        } else {
          this.direction.nextDir = 'down';
        }
      }

      function moveForward(pm) {
        if (pm.direction.currentDir === 'left') {
          if (pm.center.x >= pm.size.x / 2) {
            pm.center.x -= 1;
          } else {
            pm.center.x = pm.gameSize.x;
          }
        }

        if (pm.direction.currentDir === 'right') {
          if (pm.center.x <= pm.gameSize.x - pm.size.x / 2) {
            pm.center.x += 1;
          } else {
            pm.center.x = 0;
          }
        }

        if (pm.direction.currentDir === 'up') {
          pm.center.y -= 1;
        }

        if (pm.direction.currentDir === 'down') {
          pm.center.y += 1;
        }
      }

      if (this.direction.nextDir !== this.direction.currentDir) {
        // GO NEXT DIR
        if (this.direction.nextDir === 'left') {
          if (this.center.x >= this.size.x / 2) {
            this.center.x -= 1;
          } else {
            this.center.x = this.gameSize.x;
          }
        }

        if (this.direction.nextDir === 'right') {
          if (this.center.x <= this.gameSize.x - this.size.x / 2) {
            this.center.x += 1;
          } else {
            this.center.x = 0;
          }
        }

        if (this.direction.nextDir === 'up') {
          this.center.y -= 1;
        }

        if (this.direction.nextDir === 'down') {
          this.center.y += 1;
        }

        // TEST COLLISION NEXT DIR
        for (i = 0; i < bodies.walls.length; i++) {
          var testcoliteWall = colliding(bodies.player[0], bodies.walls[i]);
          if (testcoliteWall) {
            if (this.direction.nextDir === 'left') {
              this.center.x += 1;
            } else if (this.direction.nextDir === 'right') {
              this.center.x -= 1;
            } else if (this.direction.nextDir === 'up') {
              this.center.y += 1;
            }  else if (this.direction.nextDir === 'down') {
              this.center.y -= 1;
            }

            moveForward(this);

          } else {
            this.direction.currentDir = this.direction.nextDir;
            this.direction.nextDir = '';
          }
        }

      } else {
        moveForward(this);
      }

      //COLLISION
      for (i = 0; i < bodies.walls.length; i++) {
        var coliteWall = colliding(bodies.player[0], bodies.walls[i]);
        if (coliteWall) {
          if (this.direction.currentDir === 'left') {
            this.center.x += 1;
          } else if (this.direction.currentDir === 'right') {
            this.center.x -= 1;
          } else if (this.direction.currentDir === 'up') {
            this.center.y += 1;
          }  else if (this.direction.currentDir === 'down') {
            this.center.y -= 1;
          }
        }
      }

    }
  };
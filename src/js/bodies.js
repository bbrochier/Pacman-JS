/* GHOST
     ================================================================= */
  var Ghost =  function(game, center) {
    this.game = game;
    this.size = { x: 14, y: 14 };
    this.color = '#ff00ff';
    this.eyes = { minPos: 3, maxPos: 5, currentPos: 3, speed: 0.02, isGlancing: true };
    this.center = { x: center.x + this.size.x / 2, y: center.y + this.size.y / 2 };
    this.mode = 'normal'; /* fear / normal / dead */
  };

  Ghost.prototype = {
    update: function() {

    }
  };



  /* WALLS
     ================================================================= */
  var Wall =  function(game, center) {
    this.game = game;
    this.size = { x: 14, y: 14 };
    this.color = '#004bbe';
    this.center = { x: center.x + this.size.x / 2, y: center.y + this.size.y / 2 };
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
    this.color = '#ffffff';
    this.center = { x: center.x + 15 / 2, y: center.y + 15 / 2 };
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
    this.color = '#ffffff';
    this.center = { x: center.x + 15 / 2, y: center.y + 15 / 2 };
  };

  SuperPill.prototype = {
    update: function() {

    }
  };
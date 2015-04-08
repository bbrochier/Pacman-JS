/* MAP
    ================================================================= */
  var createMap = function(game, gameSize) {
    var mapElements = {};
    var pills = [];
    var superPills = [];
    var walls = [];
    var player = [];
    var ghosts = [];

    /* Legend
       0: Walls
       1: Pills
       2: Super pills
       3: Pacman
       4: Ghost
       5: Empty
    */

    var map =  [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 0],
      [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 0, 5, 5, 0, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 5, 5, 4, 5, 0, 1, 0, 0, 1, 0, 0],
      [3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var x = 0;
    var y = 0;
    var i;
    var j;

    for (i = 0; i < map.length; i++) {
      for (j = 0; j < map[i].length; j++) {
        y = i * 15;
        x = j * 15;
        if (map[i][j] === 0) {
          walls.push(new Wall(game, { x: x, y: y}));
        }

        if (map[i][j] === 1) {
          pills.push(new Pill(game, { x: x, y: y}));
        }

        if (map[i][j] === 2) {
          superPills.push(new SuperPill(game, { x: x, y: y}));
        }

        if (map[i][j] === 3) {
          player.push(new Player(game, { x: x, y: y}, gameSize));
        }

        if (map[i][j] === 4) {
          ghosts.push(new Ghost(game, { x: x, y: y}, gameSize));
        }
      }
    }

    mapElements.walls = walls;
    mapElements.pills = pills;
    mapElements.superPills = superPills;
    mapElements.player = player;
    mapElements.ghosts = ghosts;
    return mapElements;
  };
(function (global) {
    "use strict";

    var player = {

        setGame: function (game) { // ajout de la méthode setgame à player
            this.game = game;
        },

        isShipOk: function (callback) { // isShipOk verifie que les bateau son prêts
            this.clearPreview(); // appelle des bateaux pour supprimer les bateaux placé 
            callback(); // function bateau prêts
        },

        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        setGame: function (game) { // ajout de la méthode setgame à player
            this.game = game;
        },
        isShipOk: function (callback) { // isShipOk verifie que les bateau son prêts
            this.clearPreview(); // appelle des bateaux pour supprimer les bateaux placé 
            callback(); // function bateau prêts
        },
        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une callback pour récupérer le résultat du tir
            this.game.fire(this, col, line, _.bind(function (hasSucceeded) {
                this.tries[line][col] = hasSucceeded;
            }, this));
        },
        // quand il est attaqué le joueur doit dire s'il a un bateau ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, callback) {
            var succeeded = false;

            console.log("line = ", line)
            console.log("col = ", col)
            console.log(this.grid);
            if (this.grid[line][col] !== 0) {
                succeeded = true;
                this.grid[line][col] = 0;
            }
            callback.call(undefined, succeeded);
        },
        setActiveShipPosition: function (x, y) {
            var ship = this.fleet[this.activeShip];
            var i = 0;
            if (ship.id == 1 || ship.id == 2 || ship.id == 3) {
                x = x - 2;

            }
            else {
                x = x - 1;
            }
            while (i < ship.getLife()) {
                if(this.grid[y][x + i] != 0)return false    
                i += 1;
            }
            i = 0

            while (i < ship.getLife()) {
                this.grid[y][x + i] = ship.getId();
                i += 1;
            }

            //console.log(ship)

            return true;
        },
        clearPreview: function () {
            this.fleet.forEach(function (ship) {
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom);
                }
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
               

                this.activeShip += 1;
                return true;
                
            } else {
                return false;
            }

        },
        renderTries: function (grid) {
            console.log("tries = ", this.tries);
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');      
                    if (val === true) {         
                        node.style.backgroundColor = '#e60019';
                               node.innerHTML = '<img src="js/shot.gif" style="width: 100%; height: 100%;" />';
                   
                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';
                        node.innerHTML = '<img src="js/yx9.gif" style="width: 100%; height: 100%;" />';

                    }
                });
            });
        },
        

        renderShips: function (Grid) {
            // Méthode pour afficher les bateaux sur la grille
        }
    };
    global.player = player;
    //console.log("value of player in player.js line 96", player)

}(this));
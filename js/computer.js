/*jslint browser this */
/*global _, player */

// attribut variable attribuer a une classe
// methode = function attribuer aux objets 
// global objet qui contient toute les informations du programme équivalent au new avec les classes


(function (global) { // JS ES5 
    "use strict";
    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        setGame: function (game) { // ajout de la méthode setgame à player
            this.game = game;
        },
        play: function () {
            var self = this;
            setTimeout(function () {
                let y = Math.floor(Math.random() * 10)
                let x = Math.floor(Math.random() * 10)
                console.log("y = ", y);
                console.log("x = ", x);

                self.game.fire(this, x, y, function (hasSucceeded) {
                    self.tries[y][x] = hasSucceeded;
                    console.log(self.tries)
                });
            }, 2000);
        },

        isShipOk: function (callback) {
            //console.log(this.fleet)
            let i = 0
            while (i < this.fleet.length) {
                let y = Math.floor(Math.random() * 10)
                let x = Math.floor(Math.random() * 5)
                // console.log(x)
                // console.log(y)
                let a = 0
                let error = true
                while (a < this.fleet[i].getLife()) {
                    if (this.grid[y][x + a] != 0) {
                        error = false
                        break
                    }
                    else {
                        a++
                    }
                }
                if (error === false) {
                    continue
                }
                let e = 0
                while (e < this.fleet[i].getLife()) {
                    this.grid[y][x + e] = this.fleet[i].getId();
                    e++
                }
                i++
            }


            setTimeout(function () {
                callback();
            }, 500);
            return true;
        }

    }, this);

    global.computer = computer;

}(this));
/*

Apology
The turn-based game of racing and squashing.

Coded by: lempamo

*/

const Discord = require("discord.js");

var Apology = require('./classes/classloader.js');

module.exports = class {
    constructor(id, client, firstPlayer) {
        this.id = id;
        this.client = client;
        this.firstPlayer = firstPlayer;
        this.isOpen = true;
        var Game = new Apology.Game(id);
        Apology.Games[id] = Game;
        var Player = new Apology.Player(firstPlayer, Apology.Games[id]);
        Apology.Players[Player.id] = Player;
        Apology.Games[id].players[Apology.Games[id].players.length] = Player;
    }
    addMember(member) {
        if (member == null) return;
        if (!this.isOpen) {
            throw new UserInputError("This game isn't available.");
        }
        console.log(member.id);
        if (Apology.Players[member.id]) {
            throw new Error("You're already in this game.");
        }
        if (Apology.Games[this.id].players.length == 4) {
            throw new Error("This game is full!");
        }
        var Player = new Apology.Player(member, Apology.Games[this.id]);
        Apology.Players[Player.id] = Player;
        Apology.Games[this.id].players[Apology.Games[this.id].players.length] = Player;
        Player.Game.announce("**" + member.username + "** has joined the game!");
    }
    processCommand(command, messageParts, message) {

    }
    roomClosedMessage() {
        return "Everyone's ready, so let's get this game started!";
    }
    close() {
        Apology.Games[this.id].started=true;
        this.isOpen=false;
        Apology.Games[this.id].announce("The game has been closed, let's go!");
        Apology.Games[this.id].newDeck();
        console.log("Apology | Game " + this.id + " started!");
        var colors = ["red", "blue", "green", "yellow"];
        for (var i = 0; i < Apology.Games[this.id].players.length; i++) {
            shuffleArray(colors);
            Apology.Games[this.id].players[i].color = colors[0];
            Apology.Games[this.id].players[i].player.send("Your color is "+colors[0]+".");
            colors = colors.shift();
        }
    }
}
class Player {
  constructor(user, game) {
    this.Player = user;
    this.ID = user.id;
    this.Username = user.username;
    this.Cash = 1500;
    this.isBidding = false;
    this.needsToRoll = false;
    this.Game = game;
    this.OrderPosition = game.players.length;
    if (this.OrderPosition == 0) {
      this.Leader = true
    } else {
      this.Leader = false
    }
    this.Position = 0
  }
  modifyCash(cash) {
    this.Cash = this.Cash + cash
    if (cash < 0) {
      this.Player.send("["+this.Game.id+"] $"+Math.abs(cash)+" has been removed from your account.")
    } else {
      this.Player.send("["+this.Game.id+"] $"+cash+" has been added to your account.")
    }
  }
}
exports.Player = Player

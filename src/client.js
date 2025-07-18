const WebSocket = require("ws");
const { EventEmitter } = require("events");
const TeamlyAPI = require("./api");
const Teams = require("./teams")
const Bot = require("./bot")
const User = require("./user")

class TeamlyClient extends EventEmitter {
  constructor(token) {
    super();
    this.api = new TeamlyAPI(token);
    this.token = token;
    this.wsURL = "wss://api.teamly.one/api/v1/ws";
    this.ws = null;
    this.heartbeatInterval = null;
    this._readyOnce = false;
    this.teams = new Teams(this, this.token);
    this.bot = new Bot(this, this.token);
    this.user = new User(this, this.token);
  }

  async connect() {
    this.ws = new WebSocket(this.wsURL, {
      headers: { Authorization: `Bot ${this.token}` },
    });

    this.ws.once("open", async () => {
      if (!this._readyOnce) {
        const botUser = await this.bot.getBot();
        this.emit("ready", { bot: botUser });
        this._readyOnce = true;
      }
      this._startHeartbeat();
    });

    this.ws.on("message", (data) => {
      try {
        const { t: type, d: payload } = JSON.parse(data);
        this.emit(type, payload)
        
      } catch (err) {
        console.error("WS parse error:", err);
      }
    });

    this.ws.on("close", () => {
      clearInterval(this.heartbeatInterval);
      setTimeout(() => this.connect(), 3000);
    });
  }

  _startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.ws.send(JSON.stringify({ op: 1, d: Date.now() }));
    }, 30000);
  }

  getChannels(teamId) {
    return this.api.getChannels(teamId);
  }
}

module.exports = TeamlyClient;

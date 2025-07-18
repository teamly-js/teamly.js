const axios = require("axios");

const Roles = require("./role")
const Todos = require("./todos")
const Channels = require("./channel")
const Blog = require("./blog")
const Announcements = require("./announcements");
const Reaction = require("./reactions");
const Application = require("./applications")

class Teams {
    constructor(client, token) {
        this.client = client;
        this.wsURL = "wss://api.teamly.one/api/v1/ws";
        this.baseURL = "https://api.teamly.one/api/v1";
        this.ws = null;
        this.token =  token
        this.roles = new Roles(client,token)
        this.todos = new Todos(client,token)
        this.channel = new Channels(client,token)
        this.blog = new Blog(client,token)
        this.announcements = new Announcements(client,token)
        this.reactions = new Reaction(client,token)
        this.applications = new Application(client,token)
    }

    async getMember(teamId, userId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/members/${userId}`,
                {},
                {
                    headers: { 
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Get member error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async getTeam(teamId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/details`,
                {},
                {
                    headers: { 
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Get team error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async getBannedUsers(teamId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/bans`,
                {},
                {
                    headers: { 
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Get bans error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async getChannelMessageById(channelId, messageId) {
        try {
        const res = await axios.get(
            `${this.baseURL}/channels/${channelId}/messages/${messageId}`,
            {
                headers: {
                    Authorization: `Bot ${this.token}`,
                    "Content-Type": "application/json",            
                }
            }
        )

        return res.data;
        } catch(err) {
            console.error("Get channel message error:", err.response?.data || err.message)
            throw err;
        }
    }
}

module.exports = Teams;
const axios = require("axios");

class User {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token =  token        
    }
    
    async getUserById(userId) {
        try {
            const res = await axios.get(
            `${this.baseURL}/users/${userId}`, {
                headers: {
                    Authorization: `Bot ${this.token}`,
                    "Content-Type": "application/json"
                }
            }
            );
            return res.data;
        } catch (err) {
            console.error("Get User By Id Error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async unBanMember(teamId, userId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/members/${userId}/ban`,
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
            console.error("Unban member error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async banMember(teamId, userId, reason = "") {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/members/${userId}/ban`,
                {
                    reason
                },
                {
                    headers: { 
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Unban member error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async kickMember(teamId, userId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/members/${userId}`,
                {
                    headers: { 
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Kick member error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async createDirectMessage(userId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/me/chats`,
                {
                    "users": {
                        "id": userId
                    }
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Create direct message error:", err.response?.data || err.mesage)
            throw err;
        }
    }
}

module.exports = User;
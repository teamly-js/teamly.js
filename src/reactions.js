const axios = require('axios')

class Reaction {
    constructor(client, token) {
        this.client = client;
        this.token = token;
        this.baseURL = "https://api.teamly.one/api/v1";
    }

    async getReactions(teamId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/reactions`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Get reactions error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async updateReaction(teamId, reactionId, newName) {
        try {
            const res = await axios.put(
                `${this.baseURL}/teams/${teamId}/reactions/${reactionId}`,
                {
                    newName
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
            console.error("Update reaction error: ", err.response?.data || err.message)
            throw err;
        }

    }

    async deleteReaction(teamId, reactionId) {
        try {
            const res = axios.delete(
                `${this.baseURL}/teams/${teamId}/reactions/${reactionId}`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Delete reaction error:", err.response?.data || err.message)
            throw err;
        }
    }
}

module.exports = Reaction;
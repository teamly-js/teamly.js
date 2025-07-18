const axios = require("axios")

class Announcements {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token = token;  
    }

    async getAnnouncements(channelId) {
        try {
            const res = axios.get(
                `${this.baseURL}/channels/${channelId}/announcements`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Get announcements error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async createAnnouncements(channelId, body = {}) {
        const { title, content, tagEveryone } = body;

        if (!title || !content || !tagEveryone) {
            throw new Error("title, content and tagEveryone are required.");
        }

        try {
            const res = await axios.post(
                `${this.baseURL}/channels/${channelId}/announcements`,
                {
                    title,
                    content,
                    tagEveryone
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Create announcements error:", err.response?.data || err.message);
            throw err;
        }
    }

    async deleteAnnouncements(channelId, id) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/channels/${channelId}/announcements/${id}`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return res.data;
        } catch (err) {
            console.error("Delete announcements error:", err.response?.data || err.message);
            throw err;
        }
    }
}

module.exports = Announcements;
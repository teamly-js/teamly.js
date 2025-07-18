const axios = require("axios");

class Bot {
    constructor(client, token) {
        this.client = client;
        this.wsURL = "wss://api.teamly.one/api/v1/ws";
        this.baseURL = "https://api.teamly.one/api/v1";
        this.ws = null;
        this.token =  token        
    }

    async sendMessage(channelId, content = "", embeds = []) {
        try {
            const res = await axios.post(
            `${this.baseURL}/channels/${channelId}/messages`,
            {
                content,
                embeds,
                attachments: [],
            },
            {
                headers: {
                Authorization: `Bot ${this.token}`,
                "Content-Type": "application/json",
                },
            }
            );
            return res.data;
        } catch (err) {
            console.error("Send message error:", err.response?.data || err.message);
            throw err;
        }
    }

    async replyMessage(channelId, messageId, content = "", embeds = []) {
        try {
            const res = await axios.post(
            `${this.baseURL}/channels/${channelId}/messages`,
            {
                content,
                embeds,
                attachments: [],
                "replyTo": messageId
            },
            {
                headers: {
                Authorization: `Bot ${this.token}`,
                "Content-Type": "application/json",
                },
            }
            );
            return res.data;
        } catch (err) {
            console.error("Send message error:", err.response?.data || err.message);
            throw err;
        }
    }    
    
    async sendWebhookMessage(webhookId, webhookToken, content = "", embeds = []) {
        try {
            const res = await axios.post(
            `${this.baseURL}/webhooks/${webhookId}/${webhookToken}`,
            {
                content,
                embeds,
                attachments: [],
            },
            {
                headers: {
                    Authorization: `Bot ${this.token}`,
                    "Content-Type": "application/json",
                },
            }
            )
            return res.data;
        } catch (err) {
            console.error("Send webhook message error:", err.response?.data || err.message)
            throw err;
        }
    }
        
    async deleteMessage(channelId, messageId) {
        try {
            const res = await axios.delete(
            `${this.baseURL}/channels/${channelId}/messages/${messageId}`,
            {
                headers: {
                    Authorization: `Bot ${this.token}`,
                    "Content-Type": "application/json",
                }
            }
            );
            return res.data;
        } catch (err) {
            console.error("Delete message error:", err.response?.data || err.message);
            throw err;
        }
    }

    async updateMessage(channelId,messageId, content = "", embeds = []) {
        try {
            const res = await axios.patch(
                `${this.baseURL}/channels/${channelId}/messages/${messageId}`,
                {
                    content,
                    embeds,
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return res.data;
        } catch(err) {
            console.error("Update message error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async getBot() {
        try {
            const res = await axios.get(`${this.baseURL}/users/@me`, {
                headers: { Authorization: `Bot ${this.token}` },
            });
        return res.data.user;
        } catch (err) {
            console.error("Get bot error:", err.response?.data || err.message);
            throw err;
        }
    }
}

module.exports = Bot;
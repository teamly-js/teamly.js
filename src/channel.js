const axios = require("axios")

class Channel {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token = token;    
    }    

    async getChannelById(teamId, channelId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}`, 
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
        return res.data;
        } catch (err) {
            console.error("Get channel by id error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async createChannel(teamId, channelName, type) {
        try {
            const res = await axios.put(
                `${this.baseURL}/teams/${teamId}/channels`,
                {
                    channelName,
                    type
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
            console.error("Channel create error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async deleteChannel(teamId, channelId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }                    
                }
            )
            return res.data;
        } catch (err) {
            console.error("Channel delete error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async duplicateChannel(teamId, channelId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}/clone`,
                {},
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }                    
                }
            )
            return res.data;
        } catch (err) {
            console.error("Channel clone error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async createCategory(teamId, content) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/categories`,
                {
                    content
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
            console.error("Category create error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async updateCategory(teamId, categoryId, content) {
        try {
            const res = await axios.put(
                `${this.baseURL}/teams/${teamId}/categories/${categoryId}`,
                {
                    content
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
            console.error("Category update error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async deleteCategory(teamId, categoryId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/categories/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }                    
                }
            )
            return res.data;
        } catch (err) {
            console.error("Channel delete error: ", err.response?.data || err.message)
            throw err;
        }
    }

}

module.exports = Channel;
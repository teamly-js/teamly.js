const axios = require('axios')

class Voice {
    constructor(client, token){
        this.token = token;
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
    }

    async disconnectMemberFromVoice(teamId, channelId, userId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}/participants/${userId}/disconnect`,
                {},
                {
                    headers: {
                        Authorization: `${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Disconnect member error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async disconnectMemberFromVoice(teamId, channelId, userId, fromChannelId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}/move`,
                {
                    userId,
                    fromChannelId
                },
                {
                    headers: {
                        Authorization: `${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Move member error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async getCredentials(teamId, channelId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/channels/${channelId}/join`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            
            return res.data;
        } catch (err) {
            console.error("Get credentials error: ", err.response?.data || err.message)
            throw err;
        }
    }
}
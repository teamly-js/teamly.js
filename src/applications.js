const axios = require('axios')

class Applications {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token = token;          
    }

    async getSubmissions(teamId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/applications`,
                {
                    headers: {
                        Authorization: `${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Get submissions error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async updateStatus(teamId, applicationId, statusBoolean) {
        const status = "";
        if(Boolean(statusBoolean) == true) {
            status = "accepted"
        } else {
            status = "rejected"
        }

        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/applications/${applicationId}`,
                {
                    status
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
            console.error("Update submissions status error: ", err.response?.data || err.mesage)
            throw err;
        }
    }

    async updateTeamApplicationStatus(teamId, status) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/applications/status`,
                {
                    status
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
            console.error("Update team application status error: ", err.response?.data || err.mesage)
            throw err;
        }
    }

    async getApplicationById(teamId, applicationId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/applications/${applicationId}`,
                {
                    headers: {
                        Authorization: `${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Get application by id error: ", err.response?.data || err.message)
            throw err;
        }
    }
}

module.exports = Applications;
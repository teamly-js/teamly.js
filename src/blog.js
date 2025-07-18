const axios = require('axios')

class Blog {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token = token;          
    }

    async getBlog(teamId) {
        try {
            const res = axios.get(
                `${this.baseURL}/teams/${teamId}/blogs`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Get blog error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async createBlog(teamId, body = {}) {
        const { title, content, heroImage } = body;

        if (!title || !content || !heroImage) {
            throw new Error("title, content ve heroImage zorunludur.");
        }

        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/blogs`,
                {
                    title,
                    content,
                    heroImage
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
            console.error("Create blog error:", err.response?.data || err.message);
            throw err;
        }
    }

    async deleteBlog(teamId,blogId) {
        try {
            const res = axios.delete(
                `${this.baseURL}/teams/${teamId}/blogs/${blogId}`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            return res.data;
        } catch (err) {
            console.error("Delete blog error: ", err.response?.data || err.message)
            throw err;
        }
    }    
}

module.exports = Blog;
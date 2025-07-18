const axios = require("axios");

class Todos {
    constructor(client, token) {
        this.client = client;
        //this.wsURL = "wss://api.teamly.one/api/v1/ws";
        this.baseURL = "https://api.teamly.one/api/v1";
        //this.ws = null;
        this.token = token;    
    }

    async getTodoItems(channelId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/channels/${channelId}/todo/list`,
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",                        
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Get todo items error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async createTodoItems(channelId, content) {
        try {
            const res = await axios.post(
                `${this.baseURL}/channels/${channelId}/todo/item`,
                {
                    content
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",                        
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Create todo item error: ", err.response?.data || err.message)
            throw err;
        }
    }    

    async deleteTodoItems(channelId, todoId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/channels/${channelId}/todo/item/${todoId}`,
                {},
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",                        
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Delete todo item error: ", err.response?.data || err.message)
            throw err;
        }
    }    

    async cloneTodoItems(channelId, todoId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/channels/${channelId}/todo/item/${todoId}/clone`,
                {},
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",                        
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Clone todo item error: ", err.response?.data || err.message)
            throw err;
        }
    } 

    async updateTodoItems(channelId, todoId, content) {
        try {
            const res = await axios.put(
                `${this.baseURL}/channels/${channelId}/todo/item/${todoId}`,
                {
                    content
                },
                {
                    headers: {
                        Authorization: `Bot ${this.token}`,
                        "Content-Type": "application/json",                        
                    }
                }
            )
            return res.data;
        } catch (err) {
            console.error("Update todo item error: ", err.response?.data || err.message)
            throw err;
        }
    }
}

module.exports = Todos;
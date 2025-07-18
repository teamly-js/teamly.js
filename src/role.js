const axios = require("axios");

class Role {
    constructor(client, token) {
        this.client = client;
        this.baseURL = "https://api.teamly.one/api/v1";
        this.token =  token        
    }

    async createRole(teamId, roleName, permissionNumber, color) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/roles`,
                {
                    roleName,
                    permissionNumber,
                    color
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
            console.error("Create role error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async getTeamRoles(teamId) {
        try {
            const res = await axios.get(
                `${this.baseURL}/teams/${teamId}/roles`,
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
            console.error("Get team roles error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async deleteRole(teamId,roleId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/roles/${roleId}`,
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
            console.error("Delete role error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async cloneRole(teamId,roleId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/roles/${roleId}/clone`,
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
            console.error("Clone role error: ", err.response?.data || err.message)
            throw err;
        }
    }

    async updateRole(teamId,roleId,name,permissionNumber,color) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/roles/${roleId}`,
                {
                    name,
                    permissionNumber,
                    color
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
            console.error("Update role error: ", err.response?.data || err.message)
            throw err;
        }
    }   

    async addRoleToMember(teamId, userId, roleId) {
        try {
            const res = await axios.post(
                `${this.baseURL}/teams/${teamId}/members/${userId}/roles/${roleId}`,
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
            console.error("Add role to member error: ", err.response?.data || err.message);
            throw err;
        }
    }

    async removeRoleToMember(teamId, userId, roleId) {
        try {
            const res = await axios.delete(
                `${this.baseURL}/teams/${teamId}/members/${userId}/roles/${roleId}`,
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
            console.error("Remove role to member error: ", err.response?.data || err.message);
            throw err;
        }
    }
}

module.exports = Role;
const axios = require("axios");

class TeamlyAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = "https://api.teamly.one/api/v1";
  }

  async getChannels(teamId) {
    try {
      const res = await axios.get(`${this.baseURL}/teams/${teamId}/channels`, {
        headers: { Authorization: `Bot ${this.token}` },
      });
      return res.data.channels;
    } catch (err) {
      console.error("Get channels error:", err.response?.data || err.message);
      throw err;
    }
  }
}

module.exports = TeamlyAPI;

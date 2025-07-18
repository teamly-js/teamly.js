class EmbedAuthor {
  constructor(data = {}) {
    this.name = data.name ?? null;
    this.icon_url = data.icon_url ?? null;
  }
}

class EmbedMedia {
  constructor(data = {}) {
    this.url = data.url ?? null;
  }
}

class EmbedFooter {
  constructor(data = {}) {
    this.text = data.text ?? null;
    this.icon_url = data.icon_url ?? null;
  }
}

class Embed {
  constructor(data = {}) {
    this.title = data.title ?? null;
    this.description = data.description ?? null;
    this.url = data.url ?? null;
    this.color = typeof data.color === "string"
        ? parseInt(data.color.replace("#", ""), 16)
        : data.color ?? null;


    this.author = data.author ? new EmbedAuthor(data.author) : null;
    this.thumbnail = data.thumbnail ? new EmbedMedia(data.thumbnail) : null;
    this.image = data.image ? new EmbedMedia(data.image) : null;
    this.footer = data.footer ? new EmbedFooter(data.footer) : null;
    this.timestamp = data.timestamp ?? null;
    //this.fields = Array.isArray(data.fields) ? data.fields : null; 
  }

  toJSON() {
    const obj = {
      title: this.title,
      description: this.description,
      url: this.url,
      color: this.color,
      author: this.author,
      thumbnail: this.thumbnail,
      image: this.image,
      footer: this.footer,
      timestamp: this.timestamp,
      //fields: this.fields
    };

    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) delete obj[key];
      if (typeof obj[key] === "object" && obj[key]?.url === null) delete obj[key];
    });

    return obj;
  }
}

module.exports = Embed;

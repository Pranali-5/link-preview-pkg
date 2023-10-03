const axios = require("axios");
const cheerio = require("cheerio");
const {
  getTitle,
  getDescription,
  getImage,
  getSitename,
  getType,
  getOgUrl,
  getDomain,
  getFavicon,
  validateUrl,
} = require("./utils");

// Create an Axios instance with CORS headers
const axiosWithCors = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*", // You can set specific origins here or use "*" to allow all
    "Access-Control-Allow-Methods": "GET", // You can specify allowed HTTP methods
  },
});

const getLinkPreview = async (url) => {
  if (!validateUrl(url)) {
    return { success: false, message: "Invalid URL" };
  }
  try {
    const response = await axiosWithCors.get(url);

    const html = cheerio.load(response.data);

    const title = getTitle(html);
    const description = getDescription(html);
    const image = getImage(url, html);
    const sitename = getSitename(html);
    const ogUrl = getOgUrl(html);
    const type = getType(html);
    const domain = getDomain(url);
    const favicon = getFavicon(url, html);

    console.log("here", {
      success: true,
      title,
      description,
      image,
      sitename,
      ogUrl,
      type,
      domain,
      favicon,
    });

    return {
      success: true,
      title,
      description,
      image,
      sitename,
      ogUrl,
      type,
      domain,
      favicon,
    };
  } catch (err) {
    console.error(err);
    const status = err.response?.status || 400;
    const statusText = err.response?.statusText || "Something went wrong";

    return { success: false, message: statusText };
  }
};

module.exports = { getLinkPreview };


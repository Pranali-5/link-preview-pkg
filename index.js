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
const cors = require("cors");

const app = express();
app.use(cors());
const getLinkPreview = async (req) => {
  const url = req
  if (!validateUrl(url)) {
    return ({ success: false, message: "Invalid URL" });
  }
  try {
    const response = await axios.get(req);

    const html = cheerio.load(response.data);

    const title = getTitle(html);

    const description = getDescription(html);

    const image = getImage(url, html);

    const sitename = getSitename(html);

    const ogUrl = getOgUrl(html);

    const type = getType(html);

    const domain = getDomain(url);

    const favicon = getFavicon(url, html);
    console.log('here', {
      success: true,
      title,
      description,
      image,
      sitename,
      ogUrl,
      type,
      domain,
      favicon,
    })
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
    console.log(err);
    const status = err.response?.status || 400;
    const statusText = err.response?.statusText || "Something went wrong";

    return response.status(status).json({ sucess: false, message: statusText });
  }
};

module.exports = { getLinkPreview };

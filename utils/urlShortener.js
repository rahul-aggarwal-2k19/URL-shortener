const request = require("request");

const urlShortener = (inputUrl, callback) => {
  const options = {
    method: "POST",
    url: "https://url-shortener-service.p.rapidapi.com/shorten",
    json: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
      "x-rapidapi-key": "86a6d84024msh61f609530aeaa0fp1618a0jsnf67a15b65129",
      useQueryString: true,
    },
    form: { url: inputUrl },
  };

  request(options, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the API", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const { result_url } = body;
      callback(undefined, result_url);
    }
  });
};

module.exports = urlShortener ;

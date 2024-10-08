const superagent = require('superagent');
require('superagent-cache')(superagent);

function getInfo(url) {
  /* Return a list of query results for a DOI URL:
   * {
   *   type: "website",
   *   url: string,
   *   title: string,
   *   author: [string, string, etc],
   *   publisher: string,
   *   date: string (ISO date),
   *   <anything else metascraper picks up>
   * }
   */
  console.log(url);
  return new Promise((done, error) => {
    superagent.get(`https://api.crossref.org/works/${url}`)
      .end((err, res) => {
        console.log(err);
        if (err) {
          error(err);
          return;
        }

        const rawData = JSON.parse(res.text).message;
        const data = {
          ...rawData,
          reference: undefined,
          date: (new Date(rawData.published["date-parts"][0])).toISOString(),
          type: rawData.type.replace("proceedings-", ""),
          url: url,
          title: rawData.title[0],
          author: rawData.author,
          publisher: rawData.publisher,
        };
        done(data);
      });
  });
}

module.exports.getInfo = getInfo;

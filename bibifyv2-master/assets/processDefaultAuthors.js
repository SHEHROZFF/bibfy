function processDefaultAuthors(authors) {
    const formattedAuthors = []

    for (const author of (authors || [])) {
        if (author.family) {
          formattedAuthors.push({
            last: author.family,
            first: author.given,
            type: "Person"
          });
        } else {
          formattedAuthors.push({
            last: "Author<UNRECOGNIZED_FORMAT>",
            type: "Organization"
          });
        }
    }

    return formattedAuthors
}

export default processDefaultAuthors

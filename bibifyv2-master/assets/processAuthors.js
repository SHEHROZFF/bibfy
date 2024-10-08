function processAuthors(authors) {
    const formattedAuthors = []

    for (const author of (authors || [])) {
        if (author.split(" ").length === 1) {
            formattedAuthors.push({
                last: author.split(" ")[0],
                type: "Person"
            })
        } else if (author.split(" ").length === 2) {
            formattedAuthors.push({
                first: author.split(" ")[0],
                last: author.split(" ")[1],
                type: "Person"
            })
        } else {
            formattedAuthors.push({
                full: author,
                type: "Organization"
            })
        }
    }

    return formattedAuthors
}

export default processAuthors

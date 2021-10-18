const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        "SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2",
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {
        page,
    };

    return {
        data,
        meta,
    };
}

async function getPageCount() {
    const rows = await db.query("select count(1) from quote");
    let pageCount = 1;
    const data = helper.emptyOrRows(rows);
    try {
        rowCount = parseInt(data[0].count, 10);
        pageCount = Math.ceil(rowCount / config.listPerPage);
    } catch (err) {
        console.log("error fetching page count: " + err);
    }
    return pageCount;
}

function validateCreate(quote) {
    let messages = [];

    console.log(quote);

    if (!quote) {
        messages.push("No object is provided");
    }

    if (!quote.quote) {
        messages.push("Quote is empty");
    }

    if (!quote.author) {
        messages.push("Author is empty");
    }

    if (quote.quote && quote.quote.length > 255) {
        messages.push("Quote cannot be longer than 255 characters");
    }

    if (quote.author && quote.author.length > 255) {
        messages.push("Author name cannot be longer than 255 characters");
    }

    if (messages.length) {
        let error = new Error(messages.join());
        error.statusCode = 400;

        throw error;
    }
}

async function create(quote) {
    validateCreate(quote);

    const result = await db.query(
        "INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *",
        [quote.quote, quote.author]
    );
    let message = "Error in creating quote";

    if (result.length) {
        message = "Quote created successfully";
    }

    return {
        message,
    };
}

module.exports = {
    getMultiple,
    getPageCount,
    create,
};

const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const app = express();
const port = process.env.port || 8000;
const MIN_DELAY_IN_MS = 10;
const MAX_DELAY_IN_MS = 3000;
const SUCCESS_THRESHOLD = 0.75;

const users = require("./users.json");
const user_logins = require("./user_logins.json");

const responseDelay = () => {
    let delay = 0;

    return {
        set: (_delay) => (delay = _delay),
        get: () => delay,
    };
};

const delay = responseDelay();

const iShouldRandomlyActUp = () => Math.random() >= SUCCESS_THRESHOLD;

const randomDelayInMilliSeconds = () =>
    Math.floor(
        Math.random() * (MAX_DELAY_IN_MS - MIN_DELAY_IN_MS) + MIN_DELAY_IN_MS
    );

const responseMiddleware = (req, res, next) => {
    delay.set(randomDelayInMilliSeconds());

    if (iShouldRandomlyActUp()) {
        return setTimeout(
            () =>
                res.status(500).send({
                    message: "Something went wrong.",
                }),
            delay.get()
        );
    }

    return setTimeout(() => next(), delay.get());
};

app.use(cors());

app.use(
    morgan(
        (tokens, req, res) => {
            const status = res.statusCode;
            const responseTime = tokens["response-time"](req, res);

            /**
             * In morgan, the response time is `undefined` if the
             * request/response cycle was completed _before_ anything was sent
             * (zero milliseconds wouldn't make sense.)
             */
            const responseChunk = responseTime
                ? `${responseTime}ms`
                : "(interrupted)";

            return [
                chalk.yellow(`[${tokens.date(req, res, "iso")}]`),
                chalk.blue(`${tokens.method(req, res)}`),
                tokens.url(req, res),
                status === 200 || status === 304
                    ? chalk.green(status)
                    : chalk.red(status),
                chalk.gray(`${responseChunk}`),
                delay.get() > 0 ? chalk.gray("(delayed)") : "",
            ].join(" ");
        },
        {
            skip: (req, res) => req.url === "/favicon.ico",
        }
    )
);

app.get("/", (_, res) =>
    res.send({
        message: "Why hello! Have you read the README?",
    })
);

app.use(responseMiddleware);

app.get("/users", (req, res) => res.send(users));

app.get("/users/:id/relationships/logins", (req, res) => {
    const { id } = req.params;

    if (id < 0 || id > user_logins.length) {
        return res.status(404).send({
            message: `Could not find a user with ID '${id}'`,
        });
    }

    return res.send(user_logins[id - 1]);
});

app.use((_, res) =>
    res.status(404).send({
        message: "Could not find that resource.",
    })
);

app.listen(port, () =>
    console.log(`🚀 The Fake Users API is listening on port ${port}`)
);

const logging = (request, response, next) => {
    console.log(`Middleware logging! [Request method]: ${request.method} [Request original URL]:  ${request.originalUrl}`);
    return next();
};

module.exports = logging;
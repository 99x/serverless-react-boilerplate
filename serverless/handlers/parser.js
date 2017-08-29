module.exports.parseEvent = (event) => {
    return {
        data: JSON.parse(event.body || "{}"),
        path: event.requestContext.resourcePath,
        stage: event.requestContext.stage,
        params: event.pathParameters,
        queryParams: event.queryStringParameters
    }
};
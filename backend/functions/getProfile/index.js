exports.handler = async (event) => {
    console.log("getProfile called", event);
  
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "getProfile works!",
        userId: event.pathParameters?.userId || "test-user"
      })
    };
  };
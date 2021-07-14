const errorHandler = (err: any) => {
  if (err.graphQLErrors) {
    const errorMessage = err.graphQLErrors[0].message;
    const errorCode = err.graphQLErrors[0].extensions.code;
    return { message: errorMessage, code: errorCode };
  }
  return { message: "Network Error", code: "500" };
};

export default errorHandler;

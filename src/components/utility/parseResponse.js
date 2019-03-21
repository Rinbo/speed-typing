export const parseErr = err => {
  const message = err.response.data.message.split('"')[1];
  const statusCode = parseInt(err.response.data.message.match(/\d+/g)[0]);
  return [message, statusCode];
};

export const parseResponse = response => {
  const message = response.data.split('"')[1];
  const statusCode = parseInt(response.data.match(/\d+/g)[0]);
  return [message, statusCode];
};

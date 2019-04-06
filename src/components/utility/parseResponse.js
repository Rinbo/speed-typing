export const parseErr = err => {
  try {
    const message = err.response.data.message.split('"')[1];
    const status = parseInt(err.response.data.message.match(/\d+/g)[0]);
    return [message, status];
  } catch (e) {
    console.log(e);
  }
};

export const parseResponse = response => {
  const message = response.data.split('"')[1];
  const status = parseInt(response.data.match(/\d+/g)[0]);
  return [message, status];
};

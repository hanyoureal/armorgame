import crypto from 'crypto';
const LEN = 16;

function generateToken(randomBytes, callback) {
  if (typeof randomBytes === 'function') {
    callback = randomBytes;
    randomBytes = LEN;
  }

  // We will return the token in `hex`
  randomBytes = randomBytes / 2;

  crypto.randomBytes(randomBytes, (err, buf) => {
    if (err) {
      return callback(err);
    }

    var token = buf.toString('hex');

    callback(null, token);
  });
};

module.exports = {
  generateToken
};

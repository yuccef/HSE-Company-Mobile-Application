const crypto = require('crypto');

const text = 'Un obscur message venant du système S-K, votre majesté. Ses habitants le nomment la planète Terre.';

async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return buffer;
}

(async () => {
  const digestBuffer = await digestMessage(text);
  console.log(digestBuffer.byteLength);
})();

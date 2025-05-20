const ngrok = require('ngrok');

(async function() {
  try {
    const url = await ngrok.connect({
      addr: 3000,
      proto: 'http', // http|tcp|tls
    });
    console.log('Public URL:', url);
  } catch (e) {
    console.error('Error starting ngrok:', e);
  }
})();

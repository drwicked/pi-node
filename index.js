const { json, createError } = require('micro');
const { exec } = require('child_process');

const runScripts = (url) => exec(`youtube-dl -o '/media/easystore/Cthulhu/youtube/%(title)s.%(ext)s' ${url}`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      // return;
  }
  console.log(`stdout: ${stdout}`);
});

module.exports = async (req) => {
  if (req.method !== 'POST') {
    throw createError(404, 'Not Found');
  }
  const { url } = await json(req);
  if (url) {
    runScripts(url);
  }
  return {
    message: `${url} downloading`
  };
};

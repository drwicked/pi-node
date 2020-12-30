const micro = require('micro');
const { exec } = require('child_process');

const { json, createError } = micro;

const runScripts = (url) => exec(`youtube-dl -f best -o '/media/easystore/Cthulhu/youtube/%(uploader)s - %(title)s.%(ext)s' ${url}`, (error, stdout, stderr) => {
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
console.log('process.env.SECURITY_KEY', process.env.SECURITY_KEY);

const server = micro(async (req) => {
  if (req.method !== 'POST') {
    throw createError(404, 'Not Found');
  }
  const { url, auth } = await json(req);
  if (auth !== process.env.SECURITY_KEY) {
    return {
      message: 'not allowed!'
    };
  }
  if (url) {
    console.log(`Starting download of ${url}`);
    runScripts(url);
  } else {
    return {
      message: 'no url'
    }
  }
  return {
    message: `${url} downloading`
  };
});

server.listen(3636)

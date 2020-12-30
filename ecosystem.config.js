module.exports = {
  apps : [{
    name: 'ytdl-node',
    script: 'index.js',
    watch: '.',
    env: {
      SECURITY_KEY: 'replaceme'
    }
  }]
};

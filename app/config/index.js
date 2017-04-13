const config = {
  development: {
    dbUri: 'mongodb://localhost/evernote_dev',
    port: 3000,
  },
  production: {
    dbUri: 'mongodb://localhost:3001/evernote_production',
  },
};

export default config[process.env.NODE_ENV];

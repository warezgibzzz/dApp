const ENV = {
  PRODUCTION: 'production',
  TEST: 'test',
  PROD: {
    GOOGLE_ANALYTICS: 'UA-114752952-2',
    URL: 'dapp.marketprotocol.io'
  },
  STAGING: {
    GOOGLE_ANALYTICS: 'UA-118445796-2',
    URL: 'dev.dapp.marketprotocol.io'
  },
  getNodeEnv: () => process.env.NODE_ENV
};

export default ENV;

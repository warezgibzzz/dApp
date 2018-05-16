import * as React from 'react';
import GoogleAnalytics from 'react-ga';
import { getLocationOrigin } from '../util/utils';
import ENV from '../environment';

const isClient = typeof window !== 'undefined';
const isProduction = ENV.getNodeEnv() === ENV.PRODUCTION;

export const initializeGoogleAnalytics = () => {
  const origin = getLocationOrigin();

  if (origin.indexOf(ENV.STAGING.URL) !== -1) {
    GoogleAnalytics.initialize(ENV.STAGING.GOOGLE_ANALYTICS);
  } else if (origin.indexOf(ENV.PROD.URL) !== -1) {
    GoogleAnalytics.initialize(ENV.PROD.GOOGLE_ANALYTICS);
  }
};

export const trackPage = page => {
  GoogleAnalytics.set({ page });
  GoogleAnalytics.pageview(page);
};

export const initializeTracking = props => {
  const location = props.history.location;
  if (location) {
    let page = location.pathname;

    if (location.search) {
      page += location.search;
    }

    trackPage(page);
  }
};

const withGAPageView = WrappedComponent => {
  let gaInitialised = false;

  const HOC = props => {
    if (isClient && isProduction) {
      if (!gaInitialised) {
        gaInitialised = true;
        initializeGoogleAnalytics();
      }

      initializeTracking(props);
    }

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withGAPageView;

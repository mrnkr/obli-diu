/* eslint-disable react/display-name */
import React from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';

const withRouterParams = (Component) => (props) => {
  const router = useRouter();
  return !isEmpty(router.query) ? (
    <Component {...props} params={router.query} />
  ) : null;
};

export default withRouterParams;

import { ReactElement } from 'react';
import { connect } from 'react-redux';

interface Props {
  children?: ReactElement<any> | null;
  authority?: string | string[];
  noMatch?: ReactElement<any> | null;
  currentAuthority: string[];
}

export function Authorized(props: Props) {
  const { children, authority, noMatch, currentAuthority } = props;

  let target = noMatch;

  if (!authority) {
    target = children;
  }

  if (Array.isArray(authority)) {
    if (authority.some(auth => currentAuthority.indexOf(auth) >= 0)) {
      target = children;
    }
  }

  if (typeof authority === 'string') {
    if (currentAuthority.indexOf(authority) >= 0) {
      target = children;
    }
  }

  if (target === undefined) target = null;

  return target;
}

export default connect((state: ReduxState) => {
  return {
    currentAuthority: state.user.authorities
  };
})(Authorized);

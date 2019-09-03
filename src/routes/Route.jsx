// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import omit from '@tinkoff/utils/object/omit';

import type { ComponentType } from 'react';

type Props = {
    needRedirect?: boolean,
    redirectTo?: string,
    component: ComponentType<Object>,
    children?: Element
}

const PrivateRoute = ({ needRedirect, redirectTo, component: NewComponent, ...rest }: Props) => (
    <Route
        {...rest}
        render={props =>
            (needRedirect ? (
                <Redirect to={{ pathname: redirectTo }} />
            ) : (
                <NewComponent {...props} {...omit(['children'], rest)}>{rest.children}</NewComponent>
            ))
        }
    />
);

PrivateRoute.defaultProps = {
    needRedirect: false,
    redirectTo: window.location.pathname,
};

PrivateRoute.propsType = {
    needRedirect: PropTypes.bool,
    redirectTo: PropTypes.string,
    component: PropTypes.element.isRequired,
    children: PropTypes.node,
};

export default PrivateRoute;

// @flow
import { isMobile } from 'Utils/deviceDetector';

import type { Dispatch } from 'redux';

import { DETECT_MOBILE } from 'Actions/constants/tracking';
import dispatchAction from '../core/dispatchAction';


const detectMobile = () => (dispatch: Dispatch) =>
{
    dispatchAction(dispatch, DETECT_MOBILE, isMobile());
};

export default detectMobile;

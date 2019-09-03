// @flow
import type { ComponentType } from 'react';

import type { MatchParams } from 'Stores/ApplicationStore.flow';

export type MenuCallbackParams = MatchParams;
export type MenuCallback = (params: MenuCallbackParams) => string;

export type MenuItem = {
    icon: ComponentType<*>,
    text: string,
    link: string,
    linkReceiver: MenuCallback,
}

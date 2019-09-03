// @flow

import IS_SERVER_RUNTIME from 'Utils/isServerRuntime';

function isMobile(): boolean {
    // Для серверерного рендеринга возвращаем всегда false
    if (IS_SERVER_RUNTIME)
    {
        return !IS_SERVER_RUNTIME;
    }

    return Boolean(
        navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/Windows Phone/i)
    );
}

export {
    isMobile,
};

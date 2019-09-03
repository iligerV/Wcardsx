// @flow
const authorize = () => new Promise(resolve =>
{
    const clientSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    const windowSize = {
        width: 550,
        height: 725,
    };

    const windowInstance = window.open(
        `https://trello.com/1/authorize?response_type=token&key=ba448235518a8e58003896aecc9c3b57&callback_method=postMessage&scope=read&expiration=never&name=wcards&return_url=${window.location.origin}`,
        'WCards',
        `width=${windowSize.width},height=${windowSize.height},left=${clientSize.width / 2 - windowSize.width / 2},top=${clientSize.height / 2 - windowSize.height / 2}`
    );

    resolve(windowInstance);
});

export default authorize;

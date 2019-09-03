// @flow
import classNames from 'classnames';

const getClassForMaterial = (classes: {
        [string]: boolean | string
    }) =>
    ({
        root: classNames(classes),
    });

export default getClassForMaterial;

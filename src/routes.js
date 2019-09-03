// @flow
import PageSetsList from 'Containers/PageSetsListContainer.jsx';
import PageSet from 'Containers/PageSetContainer.jsx';
import TestDrawer from '../app/components/organisms/set/Set.jsx';

type
    RouteItem = {
        id: string,
        path: string,
        component: mixed,
        exact?: boolean,
    }

const routes: RouteItem[] = [
    {
        id: 'setitem',
        path: '/sets/:id',
        component: PageSet,
    },
    {
        id: '/test',
        path: '/test',
        component: TestDrawer,
    },
    {
        id: 'root',
        path: '/',
        component: PageSetsList,
    },
];

export default routes;

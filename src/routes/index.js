import Search from '~/layouts/Content/component/Search';
import Library from '~/layouts/Content/component/Library';
import Home from '~/layouts/Content/component/Home';
import Playlists from '~/layouts/Content/component/Library/component/Playlists';

export const contenRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/library', component: Library },
    { path: '/library/playlists', component: Playlists },
];

import Search from '~/layouts/Content/component/Search';
import Library from '~/layouts/Content/component/Library';
import Home from '~/layouts/Content/component/Home';
import Playlists from '~/layouts/Content/component/Library/component/Playlists';
import Podcast from '~/layouts/Content/component/Library/component/Podcast';
import Artist from '~/layouts/Content/component/Library/component/Artist';
import Album from '~/layouts/Content/component/Library/component/Album';

export const contenRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/library', component: Library },
    { path: '/library/Playlists', component: Playlists },
    { path: '/library/Podcast', component: Podcast },
    { path: '/library/Artist', component: Artist },
    { path: '/library/Album', component: Album },
];

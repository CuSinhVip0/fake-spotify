import Search from '~/layouts/Content/component/Search';
import Library from '~/layouts/Content/component/Library';
import Home from '~/layouts/Content/component/Home';
import MyPlaylists from '~/layouts/Content/component/Library/component/MyPlaylists';
import MyPodcast from '~/layouts/Content/component/Library/component/MyPodcast';
import MyArtist from '~/layouts/Content/component/Library/component/MyArtist';
import MyAlbum from '~/layouts/Content/component/Library/component/MyAlbum';
import Categories from '~/components/Categories';
import Playlist from '~/components/Playlist';
import Track from '~/components/Track';

export const contenRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/library', component: Library },
    { path: '/library/MyPlaylists', component: MyPlaylists },
    { path: '/library/MyPodcast', component: MyPodcast },
    { path: '/library/MyArtist', component: MyArtist },
    { path: '/library/MyAlbum', component: MyAlbum },
    { path: '/categories', component: Categories },
    { path: '/playlist', component: Playlist },
    { path: '/track', component: Track },
];

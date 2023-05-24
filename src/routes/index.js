import Search from '~/layouts/Content/component/Search';
import Library from '~/layouts/Content/component/Library';
import Home from '~/layouts/Content/component/Home';
import MyPlaylists from '~/layouts/Content/component/Library/component/MyPlaylists';
import MyPodcast from '~/layouts/Content/component/Library/component/MyPodcast';
import MyArtist from '~/layouts/Content/component/Library/component/MyArtist';
import MyAlbum from '~/layouts/Content/component/Library/component/MyAlbum';
import Categories from '~/components/Categories';
import Playlist from '~/components/Playlist';
import Artist from '~/components/Artist';
import Track from '~/components/Track';
import Album from '~/components/Album';
import ShowAll from '~/components/ShowAll';

export const contenRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/library', component: Library },
    { path: '/library/MyPlaylists', component: MyPlaylists },
    { path: '/library/MyPodcast', component: MyPodcast },
    { path: '/library/MyArtist', component: MyArtist },
    { path: '/library/MyAlbum', component: MyAlbum },
    { path: '/categories/:id', component: Categories },
    { path: '/playlist/:id', component: Playlist },
    { path: '/track/:id', component: Track },
    { path: '/artist/:id', component: Artist },
    { path: '/album/:id', component: Album },
    { path: '/artist/:id/discography', component: ShowAll },
];

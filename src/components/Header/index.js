import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header({ isSearchBar = false, isLibraryBar = false }) {
    const clientId = '616f7042b2de43f18af7a77511c94cb5';
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const redirectToAuthCodeFlow = async (clientId) => {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem('verifier', verifier);

        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('response_type', 'code');
        params.append('redirect_uri', 'http://localhost:3000/');
        params.append('scope', 'user-read-private user-read-email');
        params.append('code_challenge_method', 'S256');
        params.append('code_challenge', challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    const getAccessToken = async (clientId, code) => {
        const verifier = localStorage.getItem('verifier');

        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'http://localhost:3000/');
        params.append('code_verifier', verifier);

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
        });

        const { access_token } = await result.json();
        return access_token;
    };

    const token = async () => {
        if (!code) {
            redirectToAuthCodeFlow(clientId);
        } else {
            if (!sessionStorage.getItem('accessToken'))
                sessionStorage.setItem('accessToken', await getAccessToken(clientId, code));
        }
    };

    sessionStorage.getItem('accessToken') || token();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controls')}>
                <span>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </span>
                {isSearchBar && (
                    <div className={cx('container_input')}>
                        <input
                            id="inputSearch"
                            type="text"
                            className={cx('searchbar')}
                            placeholder="Bạn muốn nghe gì?"
                            onChange={(e) => {
                                if (e.target.value) document.querySelector('#icon').style.display = 'block';
                                else document.querySelector('#icon').style.display = 'none';
                            }}
                        ></input>
                        <FontAwesomeIcon className={cx('icon_search')} icon={faSearch}></FontAwesomeIcon>
                        <FontAwesomeIcon
                            id="icon"
                            className={cx('icon_delete')}
                            icon={faXmark}
                            onClick={() => {
                                document.querySelector('#inputSearch').value = '';
                                document.querySelector('#icon').style.display = 'none';
                            }}
                        ></FontAwesomeIcon>
                    </div>
                )}
                {isLibraryBar && (
                    <div className={cx('container_options')}>
                        <NavLink
                            id="playlists"
                            className={({ isActive }) => (isActive ? cx('link', 'focus') : cx('link'))}
                            to={'/library/Playlists'}
                        >
                            Playlist
                        </NavLink>

                        <NavLink
                            id="podcast"
                            className={({ isActive }) => (isActive ? cx('link', 'focus') : cx('link'))}
                            to={'/library/Podcast'}
                        >
                            Podcast
                        </NavLink>

                        <NavLink
                            id="artist"
                            className={({ isActive }) => (isActive ? cx('link', 'focus') : cx('link'))}
                            to={'/library/Artist'}
                        >
                            Artists
                        </NavLink>

                        <NavLink
                            id="album"
                            className={({ isActive }) => (isActive ? cx('link', 'focus') : cx('link'))}
                            to={'/library/Album'}
                        >
                            Album
                        </NavLink>
                    </div>
                )}
            </div>

            <div className={cx('options')}>
                <div className={cx('services')}>
                    <ul>
                        <li>
                            <p href="/">Premium</p>
                        </li>
                        <li>
                            <p href="/">Help</p>
                        </li>
                        <li>
                            <p href="/">Download</p>
                        </li>
                    </ul>
                </div>
                <div className={cx('auth')}>
                    <ul>
                        <li>
                            <p>Sign up </p>
                        </li>
                        <li>
                            <p className={cx('fakebtn')}>Log in</p>
                        </li>
                    </ul>
                </div>
                <div className={cx('logOut')}>
                    <ul>
                        <li>
                            <p href="/">Update Premium</p>
                        </li>
                        <li>
                            <p className={cx('fakebtn')}>Log out</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;

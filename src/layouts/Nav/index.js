import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHeart, faHouse, faSearch, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Nav() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="Spotify"></img>
            </div>

            <div className={cx('menu')}>
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? cx('activeNav', 'link') : cx('link'))} to="/">
                            <span>
                                <FontAwesomeIcon icon={faHouse} />
                            </span>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? cx('activeNav', 'link') : cx('link'))}
                            to="/search"
                        >
                            <span>
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? cx('activeNav', 'link') : cx('link'))}
                            to="/library"
                        >
                            <span>
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                            Library
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className={cx('playlists')}>
                <ul>
                    <li>
                        <a className={cx('link')} href="/">
                            <span>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </span>
                            Create playlist
                        </a>
                    </li>
                    <li>
                        <a className={cx('link')} href="/">
                            <span>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                            Favorite Songs
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;

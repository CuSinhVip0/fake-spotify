import React from 'react';
import Header from '~/components/Header';
import classNames from 'classnames/bind';
import styles from './Playlists.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Playlists() {
    return (
        <React.Fragment>
            <Header isLibraryBar={true}></Header>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <FontAwesomeIcon icon={faSpotify} className={cx('icon')}></FontAwesomeIcon>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Playlists;

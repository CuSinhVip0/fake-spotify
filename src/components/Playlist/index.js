import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from '~/components/Header';

const cx = classNames.bind(styles);

function Playlist() {
    const location = useLocation();
    const { from } = location.state || {};
    const [dataPlaylist, setdataPlaylist] = useState({});

    useEffect(() => {
        const callApiPlaylist = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/playlists/${from}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });
            setdataPlaylist(resuilt.data);
        };

        callApiPlaylist();
    }, [from]);

    const render = (data) => {};

    return (
        <React.Fragment>
            {console.log(dataPlaylist)}
            <Header></Header>
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <img
                        alt="img"
                        className={cx('image')}
                        src={dataPlaylist.images && dataPlaylist.images.length > 0 ? dataPlaylist.images[0].url : null}
                    ></img>
                    <div className={cx('content')}>
                        <p className={cx('categories')}>{dataPlaylist.type}</p>
                        <h1 className={cx('name')}>{dataPlaylist.name}</h1>
                        <p className={cx('discription')}>{dataPlaylist.description}</p>
                    </div>
                </div>
                <div className={cx('songs')}>{render(dataPlaylist)}</div>
            </div>
        </React.Fragment>
    );
}

export default Playlist;

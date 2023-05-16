import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Header from '~/components/Header';

const cx = classNames.bind(styles);

function Playlist() {
    const location = useLocation();
    const { from } = location.state || {};
    const [dataPlaylist, setdataPlaylist] = useState({});

    const convertTime = (duration) => {
        let resuilt = (duration / 1000 / 60).toFixed(2);
        let numArr = resuilt.toString().split('.');

        return `${Math.floor(resuilt)}:${numArr[1]}`;
    };

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

    const render = (data) => {
        return (
            data &&
            data.items.length > 0 &&
            data.items.map((item, index) => {
                return (
                    <div className={cx('song')} key={index}>
                        <div className={cx('col1')}>{index + 1}</div>
                        <div className={cx('col2', 'title')}>
                            <img alt="pic" className={cx('title-image')} src={item.track.album.images[0].url}></img>
                            <div className={cx('title-about')}>
                                <Link to="/track" state={{ from: item.track.id }} className={cx('about-name')}>
                                    {item.track.name}
                                </Link>

                                <p className={cx('about-artist')}>
                                    {item.track.artists.map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {index !== 0 && ', '}
                                                <Link
                                                    to="/artist"
                                                    state={{ from: value.id }}
                                                    className={cx('artist-name')}
                                                    key={index}
                                                >
                                                    {value.name}
                                                </Link>
                                            </React.Fragment>
                                        );
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className={cx('col3')}>{item.track.album.name}</div>
                        <div className={cx('col4')}>{item.added_at.substring(0, 10)}</div>
                        <div className={cx('col5')}>{convertTime(item.track.duration_ms)}</div>
                    </div>
                );
            })
        );
    };

    return (
        <React.Fragment>
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
                <div className={cx('controls')}>
                    <FontAwesomeIcon icon={faCirclePlay} className={cx('icon')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEllipsis} className={cx('icon')}></FontAwesomeIcon>
                </div>

                <div className={cx('songs')}>
                    <div className={cx('genre')}>
                        <div className={cx('col1')}>#</div>
                        <div className={cx('col2')}>Title</div>
                        <div className={cx('col3')}>Album</div>
                        <div className={cx('col4')}>Add day</div>
                        <div className={cx('col5')}>Time</div>
                    </div>

                    {render(dataPlaylist.tracks)}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Playlist;

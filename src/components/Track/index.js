import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Track.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import Header from '~/components/Header';

const cx = classNames.bind(styles);

function Track() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataTrack, setDataTrack] = useState({});
    const lyric = useRef();
    useEffect(() => {
        if (dataTrack)
            document.title = `${dataTrack.name} - song and lyrics by ${
                dataTrack.artists && dataTrack.artists[0].name
            } | Spotify`;
        window.scrollTo(0, 0);
    }, [dataTrack]);

    useEffect(() => {
        const callAPI = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataTrack(resuilt.data);
        };
        const callLyricApi = async () => {
            const resuilt = await axios.get(`https://spotify-lyric-api.herokuapp.com/?trackid=${id}&format=lrc`);
            resuilt.data.lines.map((item) => (lyric.current.innerHTML += `<p>${item.words}</p>`));
        };
        callLyricApi();
        callAPI();
    }, [id]);

    //lấy api lyric

    return (
        <React.Fragment>
            <Header navigate={navigate}></Header>
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <img
                        alt="img"
                        className={cx('image')}
                        src={dataTrack.album && dataTrack.album.images.length > 0 && dataTrack.album.images[0].url}
                    ></img>
                    <div className={cx('content')}>
                        <p className={cx('categories')}>{dataTrack.type}</p>
                        <h1 className={cx('name')}>{dataTrack.name}</h1>
                        <div className={cx('discription')}>
                            <img
                                className={cx('artist')}
                                src={
                                    dataTrack.album &&
                                    dataTrack.album.images.length > 0 &&
                                    dataTrack.album.images[0].url
                                }
                                alt="img"
                            ></img>
                            {[
                                dataTrack.artists && dataTrack.artists[0].name,
                                dataTrack.album && dataTrack.album.release_date,
                            ].join(' , ')}
                        </div>
                    </div>
                </div>
                <div className={cx('controls')}>
                    <FontAwesomeIcon
                        icon={faCirclePlay}
                        className={cx('icon')}
                        onClick={() => {
                            localStorage.setItem('idTrack', dataTrack.id || null);
                        }}
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEllipsis} className={cx('icon')}></FontAwesomeIcon>
                </div>
                <div className={cx('body')}>
                    <div className={cx('lyric')} ref={lyric}>
                        <h3>Lời bài hát</h3>
                    </div>
                    <div className={cx('content_artist')}>
                        <div className={cx('container')}>
                            <img
                                className={cx('img_artist')}
                                src={
                                    dataTrack.album &&
                                    dataTrack.album.images.length > 0 &&
                                    dataTrack.album.images[0].url
                                }
                                alt="img"
                            ></img>
                            <div className={cx('about')}>
                                <p>{dataTrack.artists && dataTrack.artists[0].type}</p>
                                <p>{dataTrack.artists && dataTrack.artists[0].name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Track;

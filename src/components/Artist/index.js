import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Header from '~/components/Header';
import Selection from '~/components/Selection';

const cx = classNames.bind(styles);

function Artist() {
    const location = useLocation();
    const { from } = location.state || {};
    const [dataArtist, setDataArtist] = useState({});
    const [dataArtistTrack, setDataArtistTrack] = useState({});
    const [dataArtistAlbum, setDataArtistAlbum] = useState({});
    const [discography, setDiscography] = useState(null);
    const list = useRef([]);
    const btn = useRef([]);
    const albumType = useRef([]);

    useEffect(() => {
        const callApiArtist = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${from}`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtist(result.data);
        };
        const callApiArtistTrack = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${from}/top-tracks?market=VN`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtistTrack(result.data.tracks);
        };
        const callApiArtistAlbum = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${from}/albums`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });

            setDataArtistAlbum(result.data.items);
        };
        callApiArtist();
        callApiArtistTrack();
        callApiArtistAlbum();
    }, [from]);

    const convertTime = (duration) => {
        let resuilt = (duration / 1000 / 60).toFixed(2);
        let numArr = resuilt.toString().split('.');
        return `${Math.floor(resuilt)}:${numArr[1]}`;
    };

    const handleShowListSongButton = () => {
        btn.current.forEach((item, index) => {
            if (item && item.classList.contains('hide') === true) {
                item && item.classList.remove('hide');
            } else {
                item && item.classList.add('hide');
            }
        });
        list.current.forEach((item, index) => {
            index >= 5 && item && item.classList.toggle('hide');
        });
    };

    const handleFocusAlbumtype = (e) => {
        albumType.current.childNodes.forEach(
            (node) => node.classList.contains('btn_focus') && node.classList.remove('btn_focus'),
        );
        e.target.classList.add('btn_focus');
    };

    const renderTopSong = (data) => {
        return (
            <div className={cx('listSongs')}>
                {data &&
                    data.length > 0 &&
                    data.map((value, index) => {
                        return (
                            //ref
                            <div
                                className={cx('song', index >= 5 ? ' hide' : null)}
                                ref={(el) => list.current.push(el)}
                                key={index}
                            >
                                <div className={cx('left')}>
                                    <div className={cx('col1')}>{index + 1}</div>
                                    <div className={cx('col2')}>
                                        <img
                                            alt="images"
                                            className={cx('song-image')}
                                            src={value.album.images && value.album.images[0].url}
                                        ></img>
                                        <p className={cx('song-name')}>{value.name}</p>
                                    </div>
                                </div>
                                <div className={cx('right')}>{convertTime(value.duration_ms)}</div>
                            </div>
                        );
                    })}
            </div>
        );
    };

    const renderDiscography = (data, type = null) => {
        return (
            <React.Fragment>
                {data &&
                    data.length > 0 &&
                    data.map((value, index) => {
                        return type !== null ? (
                            type === value.album_type && <Selection data={value} key={index}></Selection>
                        ) : (
                            <Selection data={value} key={index}></Selection>
                        );
                    })}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Header></Header>
            <div className={cx('wrapper')}>
                <div className={cx('banner')}>
                    <h1 className={cx('banner-name')}>{dataArtist.name}</h1>
                    <p className={cx('banner-followers')}>
                        {dataArtist.followers && dataArtist.followers.total.toLocaleString('vi-VN')} người theo dõi
                    </p>
                </div>

                <div className={cx('controls')}>
                    <FontAwesomeIcon icon={faCirclePlay} className={cx('icon')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEllipsis} className={cx('icon')}></FontAwesomeIcon>
                </div>
                <div className={cx('topSong')}>
                    <h3>Top songs</h3>
                    {renderTopSong(dataArtistTrack)}
                    <button
                        className={cx('btn')}
                        ref={(el) => btn.current.push(el)}
                        onClick={() => handleShowListSongButton()}
                    >
                        More...
                    </button>
                    <button
                        className={cx('btn', 'hide')}
                        ref={(el) => btn.current.push(el)}
                        onClick={() => handleShowListSongButton()}
                    >
                        Hide...
                    </button>
                </div>

                <div className={cx('album')}>
                    <h2>Playlists </h2>
                    <div className={cx('album-type')} ref={albumType}>
                        <button
                            className={cx('btn', 'btn_focus')}
                            onClick={(e) => {
                                setDiscography(null);
                                handleFocusAlbumtype(e);
                            }}
                        >
                            Popular releases
                        </button>
                        <button
                            className={cx('btn')}
                            onClick={(e) => {
                                setDiscography('album');
                                handleFocusAlbumtype(e);
                            }}
                        >
                            Albums
                        </button>
                        <button
                            className={cx('btn')}
                            onClick={(e) => {
                                setDiscography('single');
                                handleFocusAlbumtype(e);
                            }}
                        >
                            Singles
                        </button>
                    </div>
                    <div className={cx('listAlbum')}>{renderDiscography(dataArtistAlbum, discography)}</div>
                    <p className={cx('btn_more')}>Show all</p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Artist;

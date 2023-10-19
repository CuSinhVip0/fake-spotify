import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ShowAll.module.scss';
import '~/assets/themify-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faList, faHeart, faEllipsis, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import Header from '~/components/Header';
const cx = classNames.bind(styles);

function ShowAll() {
    const navigate = useNavigate();
    const { id } = useParams();
    const control = useRef();
    const [dataArtist, setDataArtist] = useState([]);
    const [dataMore_Albums, setDataMoreAlbums] = useState([]);

    const [dataAlbumTracks, setDataAlbumTracks] = useState([]);

    //set titleWeb
    //title website
    useEffect(() => {
        if (dataArtist.name) {
            document.title = `Spotify - ${dataArtist.name} - Discography`;
        }
        window.scrollTo(0, 0);
    }, [dataArtist]);
    const callApiAlbumTracks = async (ids) => {
        const result = await axios.get(`https://api.spotify.com/v1/albums?ids=${ids}&market=VN`, {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
        });
        setDataAlbumTracks(result.data.albums);
    };
    useEffect(() => {
        const callApiMore = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            const listids = result.data.items && result.data.items.map((item) => item.id);
            callApiAlbumTracks(listids.join(','));
            setDataMoreAlbums(result.data.items);
        };
        const callApiArtist = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtist(result.data);
        };

        callApiMore();
        callApiArtist();
    }, [id]);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset !== 0)
            control.current && (control.current.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.6)');
        else control.current && (control.current.style.boxShadow = '');
    });

    const convertTime = (duration) => {
        let resuilt = (duration / 1000 / 60).toFixed(2);
        let numArr = resuilt.toString().split('.');

        return `${Math.floor(resuilt)}:${numArr[1]}`;
    };

    const render = (data) => {
        return (
            data &&
            data.tracks.items.length > 0 &&
            data.tracks.items.map((item, index) => {
                return (
                    <div className={cx('song')} key={index}>
                        <div className={cx('col1')}>{index + 1}</div>
                        <div className={cx('col2', 'title')}>
                            <div className={cx('title-about')}>
                                <Link to={'/track/' + item.id} className={cx('about-name')}>
                                    {item.name}
                                </Link>

                                <div className={cx('artist')}>
                                    {item &&
                                        item.artists.map((value, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {index !== 0 && ', '}
                                                    <Link to={'/artist/' + value.id} className={cx('about-artist')}>
                                                        {value.name}
                                                    </Link>
                                                </React.Fragment>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className={cx('col3')}>{convertTime(item.duration_ms)}</div>
                    </div>
                );
            })
        );
    };

    const renderDiscography = () => {
        return (
            dataMore_Albums &&
            dataMore_Albums.map((item, index) => {
                return (
                    <div className={cx('discography')} key={index}>
                        <div className={cx('banner')}>
                            <div className={cx('banner_img')}>
                                <img alt="img" className={cx('img')} src={item.images && item.images[0].url}></img>
                            </div>
                            <div className={cx('banner_title')}>
                                <Link to={'/album/' + item.id} className={cx('banner_title-name')}>
                                    {item.name}
                                </Link>
                                <p className={cx('banner_title-des')}>
                                    {[
                                        item.album_type,
                                        item.release_date.slice(0, 4),
                                        item.total_tracks + ' songs',
                                    ].join(' • ')}
                                </p>
                                <div className={cx('controls')}>
                                    <FontAwesomeIcon icon={faCirclePlay} className={cx('icon')}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faHeart} className={cx('icon')}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faEllipsis} className={cx('icon')}></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                        <div className={cx('songs')}>
                            <div className={cx('genre')}>
                                <div className={cx('col1')}>#</div>
                                <div className={cx('col2')}>Title</div>

                                <div className={cx('col3')}>Time</div>
                            </div>
                            {render(dataAlbumTracks[index])}
                        </div>
                    </div>
                );
            })
        );
    };

    return (
        <React.Fragment>
            <Header navigate={navigate}></Header>
            <div className={cx('control')} ref={control}>
                <div className={cx('name-artist')}>{dataArtist.name}</div>
                <div className={cx('options')}>
                    <div className={cx('type-album')}>
                        All <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                    </div>
                    <button className={cx('icon-layout')}>
                        <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                    </button>
                    <button className={cx('icon-layout')}>
                        <span className={'ti-view-grid'}></span>
                    </button>
                </div>
            </div>
            <div className={cx('wrapper')}>{renderDiscography()}</div>
        </React.Fragment>
    );
}

export default ShowAll;

import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment/moment';

import Header from '~/components/Header';
import Selection from '~/components/Selection';

const cx = classNames.bind(styles);

function Album() {
    const { id } = useParams();
    const [dataAlbum, setDataAlbum] = useState([]);
    const [idArtist, setidArtist] = useState(null);
    const [dataArtist, setDataArtist] = useState([]);

    const [dataArtistAlbums, setDataArtistAlbums] = useState([]);

    //title website
    useEffect(() => {
        if (dataAlbum.name) {
            const singles = dataAlbum.artists
                .map((value) => {
                    return value.name;
                })
                .join(', ');
            document.title = `${dataAlbum.name} - Single by ${singles} | Spotify`;
        }
        window.scrollTo(0, 0);
    }, [dataAlbum]);

    //api albums
    useEffect(() => {
        const callApiAlbum = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataAlbum(resuilt.data);
            setidArtist(resuilt.data && resuilt.data.artists[0].id);
        };
        callApiAlbum();
    }, [id]);

    //api artist
    useEffect(() => {
        const callApiArtist = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/artists/${idArtist}`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtist(resuilt.data);
        };
        if (idArtist !== null) {
            callApiArtist();
        }
    }, [idArtist]);

    //api artist albums
    useEffect(() => {
        const callApiArtistAlbums = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/artists/${idArtist}/albums`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtistAlbums(resuilt.data);
        };
        if (idArtist !== null) {
            callApiArtistAlbums();
        }
    }, [idArtist]);

    //tinh thoi gian cua tong cac bai hat trong album
    const total_time = () => {
        const total =
            dataAlbum.tracks &&
            dataAlbum.tracks.items.map((value) => {
                return value.duration_ms;
            });
        const str = (total && total.reduce((sum, value) => sum + value)) / 1000 / 60 / 60;
        return `, ${Math.floor(str)} hr ${Math.floor((str - Math.floor(str)) * 100)} min`;
    };

    const convertTime = (duration) => {
        let resuilt = (duration / 1000 / 60).toFixed(2);
        let numArr = resuilt.toString().split('.');

        return `${Math.floor(resuilt)}:${numArr[1]}`;
    };

    //render list tracks

    const render = (data) => {
        return (
            data &&
            data.items.length > 0 &&
            data.items.map((item, index) => {
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
    const renderRelatedArtists = (data) => {
        return (
            <div className={cx('More_Albums')}>
                <h2 className={cx('title')}>{`More by ${dataArtist.name}`}</h2>
                <div className={cx('listAlbums')}>
                    <React.Fragment>
                        {data &&
                            data.length > 0 &&
                            data.map((value, index) => {
                                return (
                                    index < 8 && (
                                        <Selection
                                            type={value.type}
                                            image={value.images[0].url}
                                            id={value.id}
                                            title={value.name}
                                            des={value.release_date.slice(0, 4)}
                                            key={index}
                                            isAlbum={true}
                                        ></Selection>
                                    )
                                );
                            })}
                    </React.Fragment>
                </div>
                <p className={cx('btn_more')}>Show all</p>
            </div>
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
                        src={dataAlbum.images && dataAlbum.images.length > 0 ? dataAlbum.images[0].url : null}
                    ></img>
                    <div className={cx('content')}>
                        <p className={cx('categories')}>{dataAlbum.type}</p>
                        <h1 className={cx('name')}>{dataAlbum.name}</h1>
                        <div className={cx('description')}>
                            <img
                                alt="artist"
                                className={cx('img-artist')}
                                src={
                                    dataArtist.images && dataArtist.images.length > 0 ? dataArtist.images[0].url : null
                                }
                            ></img>
                            <Link to={'/artist/' + dataArtist.id} className={cx('name-artist')}>
                                {dataArtist.name}
                            </Link>
                            <p className={cx('total-tracks')}>
                                {[
                                    '',
                                    dataAlbum.release_date && dataAlbum.release_date.slice(0, 4),
                                    dataAlbum.total_tracks + ' songs',
                                ].join(' • ')}
                            </p>

                            <p className={cx('time-tracks')}>{total_time()}</p>
                        </div>
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

                        <div className={cx('col3')}>Time</div>
                    </div>

                    {render(dataAlbum.tracks)}
                </div>
                <div className={cx('copyrights')}>
                    <p className={cx('release_date')}>{moment(dataAlbum.release_date).format('LL')}</p>
                    <p className={cx('text')}>
                        <span className={cx('c')}>{dataAlbum.copyrights && dataAlbum.copyrights[0].type}</span>
                        {dataAlbum.copyrights && dataAlbum.copyrights[0].text}
                        <br></br>
                        <span className={cx('c')}>{dataAlbum.copyrights && dataAlbum.copyrights[1].type}</span>
                        {dataAlbum.copyrights && dataAlbum.copyrights[1].text}
                    </p>
                </div>
                {dataArtistAlbums.items &&
                    dataArtistAlbums.items.length > 0 &&
                    renderRelatedArtists(dataArtistAlbums.items)}
            </div>
        </React.Fragment>
    );
}

export default Album;

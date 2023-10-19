import classNames from 'classnames/bind';
import styles from './Music.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Musicbar() {
    const idData = useSelector((state) => state);
    const [data, setDate] = useState();
    const [isPlay, setIsPlaying] = useState(false);

    const ref = useRef();
    useEffect(() => {
        const callApiTrack = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/tracks/${idData}`, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
            });
            setDate(result.data);
            setIsPlaying(true);
        };

        callApiTrack();
    }, [idData]);

    const handlePlayMusic = () => {
        if (isPlay) {
            setIsPlaying(false);
            ref.current.pause();
        }
        if (!isPlay) {
            setIsPlaying(true);
            ref.current.play();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <audio
                ref={ref}
                src={data && data.preview_url}
                onLoadedData={() => {
                    if (isPlay) ref.current.play();
                }}
                onTimeUpdate={() => console.dir(ref.current.currentTime)}
                onEnded={() => setIsPlaying(false)}
            ></audio>
            <div className={cx('left')}>
                <img className={cx('left-image')} alt="hinh" src={data && data.album.images[0].url}></img>
                <div className={cx('left-title')}>
                    <p className={cx('left-title_name')}>{data && data.name}</p>
                    <p className={cx('left-title_artists')}>
                        {data &&
                            data.artists.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {index !== 0 && ' , '}
                                        <Link to={'/artist/' + item.id} className={cx('artist-name')} key={index}>
                                            {item.name}
                                        </Link>
                                    </React.Fragment>
                                );
                            })}
                    </p>
                </div>
                <div className={cx('left-icon')}>
                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </div>
                <div className={cx('left-icon')}>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"></path>
                            <path d="M10 8h4v3h-4z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div className={cx('middle')}>
                <div className={cx('middle-top')}>
                    <button className={cx('middle-top_icon')}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
                                <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
                            </g>
                        </svg>
                    </button>
                    <button className={cx('middle-top_icon')}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                            </g>
                        </svg>
                    </button>
                    <button className={cx('middle-top_icon', 'border-circle')} onClick={handlePlayMusic}>
                        {(() => {
                            if (!isPlay) {
                                return (
                                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="currentColor">
                                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                                        </g>
                                    </svg>
                                );
                            }
                            if (isPlay) {
                                return (
                                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="currentColor">
                                            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                                        </g>
                                    </svg>
                                );
                            }
                        })()}
                    </button>

                    <button className={cx('middle-top_icon')}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                            </g>
                        </svg>
                    </button>
                    <button className={cx('middle-top_icon')}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className={cx('middle-bot')}>
                    <hr className={cx('middle-bot-line')}></hr>
                </div>
            </div>
            <div className={cx('right')}>
                <button className={cx('right-icon')}>
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"></path>
                        </g>
                    </svg>
                </button>
                <button className={cx('right-icon')}>
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
                        </g>
                    </svg>
                </button>
                <button className={cx('right-icon')}>
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"></path>
                            <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </g>
                    </svg>
                </button>
                <button className={cx('right-icon')}>
                    <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <g fill="currentColor">
                            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
                            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                        </g>
                    </svg>
                </button>
                <hr className={cx('right-line')}></hr>
            </div>
        </div>
    );
}

export default Musicbar;

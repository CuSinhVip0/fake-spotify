import classNames from 'classnames/bind';
import styles from './Body.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function Body() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            const resuilt = await axios.get('https://api.spotify.com/v1/albums/0J07JXJLpXwdeg29QMbZRt', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });
            setData(resuilt.data);
        };
        fetchAPI();
    }, []);

    const renderImg = (data) => {
        return (
            <img
                className={cx('image')}
                alt="abc"
                src={data.images && data.images.length > 0 ? data.images[0].url : null}
            ></img>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('img')}>{renderImg(data)}</div>
                <div className={cx('title')}></div>
            </div>
            <div className={cx('controller')}>
                <FontAwesomeIcon
                    icon={faPlayCircle}
                    onClick={() => {
                        console.log(data);
                    }}
                />
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
            </div>
            <div className={cx('tracks')}></div>
        </div>
    );
}

export default Body;

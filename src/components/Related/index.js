import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Related.module.scss';
import axios from 'axios';

import Header from '~/components/Header';
import Selection from '~/components/Selection';

const cx = classNames.bind(styles);

function Related() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataArtist, setDataArtist] = useState([]);

    useEffect(() => {
        if (dataArtist) document.title = `Spotify - Artists Fans of ${dataArtist.name} also like`;
        window.scrollTo(0, 0);
    }, [dataArtist]);

    useEffect(() => {
        const callApiArtistRelated = async () => {
            const result = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
            });
            setDataArtist(result.data.artists);
        };
        callApiArtistRelated();
    }, [id]);

    const renderArtist = () => {
        return (
            dataArtist &&
            dataArtist.map((item, value) => {
                return (
                    <Selection
                        image={item && item.images[0].url}
                        title={item.name}
                        des={item.type}
                        isArtist={true}
                        type={item.type}
                        id={item.id}
                    ></Selection>
                );
            })
        );
    };

    return (
        <React.Fragment>
            <Header navigat={navigate}></Header>
            <div className={cx('wrapper')}>
                <p className={cx('title')}>Fan also like</p>
                <div className={cx('list_artist')}>{renderArtist()}</div>
            </div>
        </React.Fragment>
    );
}

export default Related;

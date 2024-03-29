import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import Header from '~/components/Header';
const cx = classNames.bind(styles);

function Categories() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dataCategories, setdataCategories] = useState();
    const [infoCategories, setinfoCategories] = useState();

    useEffect(() => {
        document.title = `Spotify - ${infoCategories && infoCategories.name}`;
        window.scrollTo(0, 0);
    }, [infoCategories]);

    useEffect(() => {
        const callApi = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });
            setdataCategories(resuilt.data.playlists.items);
        };
        const callApiName = async () => {
            const resuilt = await axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });
            setinfoCategories(resuilt.data);
        };
        callApi();
        callApiName();
    }, [id]);

    const renderCategories = (data) => {
        return (
            <React.Fragment>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        if (item == null) return null;

                        return (
                            <Link to={'/playlist/' + item.id} key={index}>
                                <div className={cx('container')}>
                                    <img className={cx('image')} alt="pic" src={item.images[0].url}></img>
                                    <h5 className={cx('name')}>{item.name}</h5>
                                    <p className={cx('description')}>{item.description}</p>
                                    <div className={cx('btn')}>
                                        <FontAwesomeIcon icon={faCirclePlay} className={cx('icon')}></FontAwesomeIcon>
                                        <span className={cx('iconSub')}></span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Header navigate={navigate}></Header>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h1>{infoCategories && infoCategories.name}</h1>
                </div>
                <div className={cx('list')}>{renderCategories(dataCategories)}</div>
            </div>
        </React.Fragment>
    );
}

export default Categories;

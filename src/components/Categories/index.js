import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Categories.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import Header from '~/components/Header';
const cx = classNames.bind(styles);

function Categories() {
    const location = useLocation();
    const { from } = location.state || {};
    const [dataCategories, setdataCategories] = useState();

    useEffect(() => {
        const callApi = async () => {
            const resuilt = await axios.get(`${from.href || null}/playlists`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                },
            });
            setdataCategories(resuilt.data.playlists.items);
        };
        callApi();
    }, [from.href]);

    const renderCategories = (data) => {
        return (
            <React.Fragment>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <Link to="/playlist" state={{ from: item.id }} key={index}>
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
            <Header></Header>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h1>{from.name}</h1>
                </div>
                <div className={cx('list')}>{renderCategories(dataCategories)}</div>
            </div>
        </React.Fragment>
    );
}

export default Categories;

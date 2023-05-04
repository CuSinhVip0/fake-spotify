import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

import Header from '~/components/Header';

const cx = classNames.bind(styles);

function Search() {
    const [genres, setGenres] = useState({});

    const renderGenres = (data) => {
        return (
            <React.Fragment>
                {data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <Link to="/categories" state={{ from: item }} key={index}>
                                <div className={cx('content')}>
                                    <img
                                        alt="pic"
                                        className={cx('image')}
                                        src={data.length > 0 ? item.icons[0].url : null}
                                    ></img>
                                    <p className={cx('name')}>{data.length > 0 ? item.name : null}</p>
                                </div>
                            </Link>
                        );
                    })}
            </React.Fragment>
        );
    };
    useEffect(() => {
        const fetchGenres = async () => {
            const resuilt = await axios.get(
                'https://api.spotify.com/v1/browse/categories?country=VN&offset=0&limit=40',
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                    },
                },
            );
            setGenres(resuilt.data.categories.items);
        };
        fetchGenres();
    }, []);

    return (
        <React.Fragment>
            <Header isSearchBar={true}></Header>

            <div className={cx('wrapper')}>
                <p className={cx('title')}>Duyệt tìm tất cả</p>
                <div className={cx('genres')}>{renderGenres(genres)}</div>
            </div>
        </React.Fragment>
    );
}

export default Search;

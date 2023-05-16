import classNames from 'classnames/bind';
import styles from './Selection.module.scss';
import React from 'react';

const cx = classNames.bind(styles);

const Selection = React.forwardRef((data, ref) => {
    return (
        <div ref={ref} className={cx('wrapper')}>
            <div className={cx('img')}>
                <img className={cx('image')} src={data.data && data.data.images[0].url} alt="img"></img>
            </div>
            <p className={cx('title')}>{data.data && data.data.name}</p>
            <p className={cx('des')}>
                {data.data && [data.data.release_date.slice(0, 4), data.data.album_type].join(' • ')}
            </p>
        </div>
    );
});

export default Selection;

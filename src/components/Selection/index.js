import classNames from 'classnames/bind';
import styles from './Selection.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Selection({ isAlbum = false, isArtist = false, ...props }) {
    return (
        <Link to={'/' + props.type + '/' + props.id} className={cx('wrapper')}>
            <div className={cx('img')}>
                <img className={cx('image', isArtist && 'image-artists')} src={props.image} alt="img"></img>
            </div>
            <p className={cx('title')}>{props.title}</p>
            <p className={cx('des')}>{props.des}</p>
        </Link>
    );
}

export default Selection;

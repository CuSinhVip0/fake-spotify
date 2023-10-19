import classNames from 'classnames/bind';
import styles from './Library.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

import Header from '~/components/Header';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Library() {
    const navigate = useNavigate();
    return (
        <>
            <Header isLibraryBar={true} navigate={navigate}></Header>
            <div className={cx('wrapper')}>
                <FontAwesomeIcon icon={faSpotify} className={cx('icon')}></FontAwesomeIcon>
                <p className={cx('title')}>Let's create your own world</p>
            </div>
        </>
    );
}

export default Library;

import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { contenRoutes } from '~/routes';

const cx = classNames.bind(styles);
function Content() {
    return (
        <div className={cx('wrapper')}>
            <Routes>
                {contenRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default Content;

import Nav from '~/layouts/Nav';
import Content from '~/layouts/Content';
import { BrowserRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/components/GlobalStyle/GlobalStyle.scss';

const cx = classNames.bind(styles);

function App() {
    return (
        <BrowserRouter>
            <div className={cx('wrapper')}>
                <Nav></Nav>
                <Content />
            </div>
        </BrowserRouter>
    );
}

export default App;

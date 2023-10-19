import Header from '~/components/Header';
import Body from '~/components/Body';

import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header isHome={true} navigate={navigate} />
            <Body />
        </>
    );
}

export default memo(Home);

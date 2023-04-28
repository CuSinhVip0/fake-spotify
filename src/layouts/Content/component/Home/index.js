import Header from '~/components/Header';
import Body from '~/components/Body';

import { memo } from 'react';
function Home() {
    return (
        <>
            <Header />
            <Body />
        </>
    );
}

export default memo(Home);

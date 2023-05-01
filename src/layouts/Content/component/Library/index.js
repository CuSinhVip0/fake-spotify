import { Link } from 'react-router-dom';

import Header from '~/components/Header';

function Library() {
    return (
        <>
            <Header isLibraryBar={true}></Header>
            <p>Hello</p>
        </>
    );
}

export default Library;

import React from 'react';
import Header from '~/components/Header';

function MyAlbum() {
    return (
        <React.Fragment>
            <Header isLibraryBar={true}></Header>
            <p>Album</p>
        </React.Fragment>
    );
}

export default MyAlbum;

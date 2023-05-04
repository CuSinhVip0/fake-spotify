import React from 'react';
import Header from '~/components/Header';

function MyArtist() {
    return (
        <React.Fragment>
            <Header isLibraryBar={true}></Header>
            <p>Artists</p>
        </React.Fragment>
    );
}

export default MyArtist;

import React from 'react';
import Header from '~/components/Header';

function MyPlaylists() {
    return (
        <React.Fragment>
            <Header isLibraryBar={true}></Header>
            <p>Playlists</p>
        </React.Fragment>
    );
}

export default MyPlaylists;

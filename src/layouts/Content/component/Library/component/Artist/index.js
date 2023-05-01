import React from 'react';
import Header from '~/components/Header';

function Artist() {
    return (
        <React.Fragment>
            <Header isLibraryBar={true}></Header>
            <p>Artists</p>
        </React.Fragment>
    );
}

export default Artist;

import React from 'react';
import { Spinner } from 'react-bootstrap'

function LoadingComponent(props) {
    return (
        <React.Fragment>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
        </React.Fragment>
    );
}

export default LoadingComponent;
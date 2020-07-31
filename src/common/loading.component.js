import React from 'react';
import { Spinner } from 'react-bootstrap'

function LoadingComponent(props) {
    return (
        <React.Fragment>
            <div class="col col-md-12 d-flex justify-content-center ">
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
            </div>
        </React.Fragment>
    );
}

export default LoadingComponent;
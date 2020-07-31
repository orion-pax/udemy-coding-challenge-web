import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom";

export default class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.redirectToHome = this.redirectToHome.bind(this)

    }

    redirectToHome(e) {
        this.setState({
            redirect: true
        })

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={
                { pathname: '/quizapp/' }
            }
            />
        }
        return (
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found.</div>
                            <Button onClick={this.redirectToHome} variant="primary" className="">
                                    <span>Back To Home</span>
                                    <FontAwesomeIcon icon={faHome} />
                                </Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
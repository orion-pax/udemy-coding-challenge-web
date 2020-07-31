import React, { Component } from 'react';
import axios from 'axios'
import { Card, Table, Button } from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from '../common/loading.component'

import config from '../config/app.config'

const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.axiosTimeOut,
    headers: { 'Content-Type': 'application/json' }
});

class ResultComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.location.state.user,
            results: {},
            percentage: 0,
            redirect: false,
            isLoading: true,
            tdClassName: ""

        }
        this.redirectToHome = this.redirectToHome.bind(this)
    }
    componentDidMount() {
        axiosInstance.get('/answer_sheets/user/' + this.state.user)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        results: response.data,
                        percentage: response.data.percentage["$numberDecimal"],
                        isLoading: false,
                        tdClassName: response.data.grade == "Fail" ? "td-danger" : "td-success"
                    });
                } else {
                    alert(response.data.message + ". Kindly retry again.")
                    this.setState({
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                this.setState({ isLoading: false })
                alert("Unexpected error occured.Kindly retry again.")

            })
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
            <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                    {this.state.isLoading ? <div className="row justify-content-md-center"> <LoadingComponent /> </div> :
                        <Card>
                            <Card.Header className="purple-card-header"><b> Quiz Results</b></Card.Header>
                            <Card.Body>
                                <Table striped bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td> Overal Score</td>
                                            <td> {this.state.results["finalScore"]}</td>
                                        </tr>
                                        <tr>
                                            <td> Total Marks</td>
                                            <td> {this.state.results["quizTotal"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Percentage</td>
                                            <td>{`${this.state.percentage} %`}</td>
                                        </tr>
                                        <tr>
                                            <td> Remark</td>
                                            <td className={this.state.tdClassName}>{this.state.results["grade"]}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={this.redirectToHome} variant="success" className="float-right float-sm-right">
                                    <span> Take Another Quiz</span>
                                    <FontAwesomeIcon icon={faHome} />
                                </Button>
                            </Card.Footer>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

export default ResultComponent;
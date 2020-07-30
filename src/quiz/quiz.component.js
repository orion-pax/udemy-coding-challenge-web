import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from '../common/loading.component'

const axiosInstance = axios.create({
    baseURL: 'https://<api-url>/',
    timeout: 20000
});

export default class QuizComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizzes: [],
            isLoading: true
        }
    }

    componentDidMount() {
        axiosInstance.get('/quizzes/list')
            .then(response => {
                if (response.status == 200) {
                    this.setState({ quizzes: response.data.quizzes, isLoading: false });
                } else {
                    this.setState({ isLoading: false })
                    alert(response.data.message + ". Kindly retry.")
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ isLoading: false })
                alert("An unexpected error occured. Kindly retry.")
            })
    }
    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                    <Card>
                        <Card.Header className="purple-card-header"> < b> Available Quiz </b></Card.Header> {
                            this.state.isLoading ? < div className="row justify-content-md-center">
                                <LoadingComponent />
                            </div>
                                :
                                <ul className="list-group"> {
                                    this.state.quizzes.map((quiz, index) => {
                                        return (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {quiz["name"]}
                                                <span className="badge badge-primary badge-pill">
                                                    <Link className="white-link" to={`/quiz/${quiz["code"]}`}>
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </Link>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                        }
                    </Card>
                </div>
            </div>
        )
    }
}
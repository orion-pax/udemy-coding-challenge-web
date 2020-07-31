import React from 'react'
import axios from 'axios'
import Question from '../common/question.component'
import { Card, Carousel, Button, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from "react-router-dom";
import LoadingComponent from '../common/loading.component'
import config from '../config/app.config'

const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.axiosTimeOut
});

export default class AnswerSheetComponent extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.match
        this.state = {
            quizCode: params.code,
            quiz: {},
            questions: [],
            numberOfQuestions: 0,
            index: 0,
            isLastIndex: false,
            progress: 0,
            answers: [],
            currentQuestion: "",
            redirect: null,
            user: "",
            isLoading: true
        }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.addAnswers = this.addAnswers.bind(this);
    }
    addAnswers(answer) {
        let answs = this.state.answers

        var index = answs.map(function (answer) {
            return answer.question
        }).indexOf(answer.question);

        if (index != -1) {
            answs.splice(index, 1)
        }

        answs = [...answs, answer]

        this.setState({ answers: answs })

    }
    componentDidMount() {
        const { params } = this.props.match
        axiosInstance.get('/quizzes/code/' + params.code)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        quiz: response.data,
                        questions: response.data.questions,
                        numberOfQuestions: response.data.questions.length,
                        progress: response.data.questions.length == 0 ? 0 : 100 * (1 / response.data.questions.length),
                        currentQuestion: response.data.questions[0]["code"],
                        isLoading: false
                    });
                } else {
                    this.setState({ isLoading: false })
                    alert(response.data.message)
                }
            })
            .catch(error => {
                this.setState({ isLoading: false })
                alert("Unexpected error occured.")
            })

        window.onbeforeunload = function () {
            alert();
            return "";
        }.bind(this);
    }

    handleFinishClick(e) {

        var position = this.state.answers.map(function (answer) {
            return answer.question
        }).indexOf(this.state.currentQuestion);

        if (position == -1) {
            alert("Choose answer before proceeding")
            return
        }

        let data = {
            quiz: this.state.quizCode,
            answers: this.state.answers
        }
        this.setState({
            isLoading: true
        })
        axiosInstance.post('/answer_sheets/', data)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        user: response.data,
                        redirect: true,
                    });
                } else {
                    alert(response.data.message + ". Kindly retry again.")
                    this.setState({
                        isLoading: false
                    })
                }

            })
            .catch(error => {
                alert("Unexpected error occured.Kindly retry again.")
                this.setState({
                    isLoading: false
                })
            })

    }

    handleNextClick(e) {
        var position = this.state.answers.map(function (answer) {
            return answer.question
        }).indexOf(this.state.currentQuestion);

        if (position == -1) {
            alert("Choose answer before proceeding")
            return
        }

        this.setState({
            index: this.state.index + 1,
            progress: 100 * ((this.state.index + 2) / this.state.numberOfQuestions),
            currentQuestion: this.state.questions[this.state.index + 1]["code"]
        })
        if ((this.state.index + 1) == (this.state.numberOfQuestions - 1)) {
            this.setState({ isLastIndex: true })
        }
    }

    render() {
        if (this.state.redirect) {

            return <Redirect to={
                {
                    pathname: '/results',
                    state: {
                        user: this.state.user
                    }

                }
            }
            />

        }
        let button;
        let label;

        if (this.state.isLastIndex) {
            button = <Button onClick={this.handleFinishClick} variant="success" className="float-right float-sm-right">
                <span> Finish </span> <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
        } else {
            button = <Button onClick={this.handleNextClick}
                variant="success"
                className="float-right float-sm-right">
                <span> Next </span> <FontAwesomeIcon icon={faArrowRight} />
            </Button>
        }
        if (this.state.numberOfQuestions != 0) {
            label = <label> {`${this.state.index + 1} / ${this.state.numberOfQuestions} Questions.`} </label>

        } else {
            button = null;
        }
        return (

            <div className="row justify-content-md-center">
                <div className="col col-lg-6"> {
                    this.state.isLoading ? <div className="row justify-content-md-center"> <LoadingComponent /> </div> :
                        <div> <ProgressBar striped animated variant="success" now={this.state.progress} />

                            <Card>
                                <Card.Header> {this.state.quiz["name"]} </Card.Header>
                                <Card.Body>
                                    <Carousel controls={false}
                                        touch={false}
                                        interval={null}
                                        indicators={false}
                                        activeIndex={this.state.index}>

                                        {
                                            this.state.questions.map((qstn, index) => {

                                                return (
                                                    <Carousel.Item key={index}>
                                                        <Question question={qstn} onChoiceChange={this.addAnswers} />

                                                    </ Carousel.Item>
                                                )

                                            })
                                        }

                                    </Carousel>
                                </Card.Body>
                                <Card.Footer className="text-muted"> {label}

                                    {button}

                                </Card.Footer>

                            </Card>
                        </div>
                } </div>
            </div>
        )
    }
}
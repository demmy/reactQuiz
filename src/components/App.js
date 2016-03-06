import React, { Component, PropTypes } from 'react'
import QuestionList from '../containers/QuestionList'
import { connect } from 'react-redux'
import { loadForeign, toNextQuestion } from '../actions'

class App extends Component {
    componentDidMount() {

        let { dispatch } = this.props;
        setTimeout(() => {
            dispatch(loadForeign());
            dispatch(toNextQuestion())
        }, 500)

    }

    render() {
        return (
            <div>
                <QuestionList/>
            </div>
        )
    }
}

export default connect()(App)

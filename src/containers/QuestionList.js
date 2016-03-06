import { connect } from 'react-redux'
import { choiceOption, toNextQuestion } from '../actions'
import Quiz from '../components/Quiz'

const mapStateToProps = (state) => {
    return {
        quiz: state.quiz.currentQuestion
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        next: (id) => {
            dispatch(choiceOption(id));
            setTimeout(() => {
                dispatch(toNextQuestion());
            }, 500)
        }
    }
};

const QuestionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);

export default QuestionList
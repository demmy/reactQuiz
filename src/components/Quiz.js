import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';

const Quiz = ({ quiz, next }) => {

    if (!Object.keys(quiz).length) {
        return <div>loading...</div>
    }

    return (

        <div>
            <h2>{quiz.word}</h2>

            <List>
                {(quiz.options || []).map(option =>
                        <ListItem primaryText={option} leftIcon={<ActionGrade />}/>
                    //<label>
                    //    <input type="radio" name="options" onClick={() => next(option)} key={option}
                    //           value="{option}"/>{option}
                    //</label>
                )}
            </List>
            <RaisedButton label="Next" primary={true} onClick=alert()/>
        </div>
    )
};

Quiz.propTypes = {
    quiz: PropTypes.shape({
        word: PropTypes.string,
        translate: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
    next: PropTypes.func.isRequired
};

export default Quiz
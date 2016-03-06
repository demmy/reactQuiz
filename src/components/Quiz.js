import React, { PropTypes } from 'react'

const Quiz = ({ quiz, next }) => {

    if (!Object.keys(quiz).length) {
        return <div>loading...</div>
    }

    return (

        <div>
            <h2>{quiz.word}</h2>

            <ul>
                {(quiz.options || []).map(option =>
                    <li>
                        <label>
                            <input type="radio" name="options" onClick={() => next(option)} key={option}
                                   value="{option}"/>{option}
                        </label>
                    </li>
                )}
            </ul>
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
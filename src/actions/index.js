export const choiceOption = (text) => {
    return {
        type: 'SELECT_OPTION',
        text
    }
};

export const loadForeign = () => {
    return {
        type: 'LOAD_FOREIGN_LIST'
    }
};


export const toNextQuestion = () => {
    return {
        type: 'TO_NEXT_QUESTION'
    }
};

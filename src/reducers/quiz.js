import {
    shuffle,
    map,
    partial,
    take,
    zipObject,
    union,
    isEqual,
    clone,
    range,
    curry,
    property,
    propertyOf
} from 'lodash';

import { compose } from 'lodash/fp';

const QUIZ_LIST_SIZE = 10;
const QUIZ_OPTIONS_SIZE = 4;

var randomKeys = curry((size, of) => take(shuffle(range(of)), size));

var rename = curry((keys, obj) => zipObject(['word', 'translate', 'options'], map(keys, propertyOf(obj))));

var getNth = curry((list, idx) => list[idx]);


const words = [
    {
        foreign: 'please',
        native: 'пожалуйста'
    },
    {
        foreign: 'name',
        native: 'имя'
    },
    {
        foreign: 'what',
        native: 'что, какой'
    },
    {
        foreign: 'something',
        native: 'что-нубудь'
    },
    {
        foreign: 'people',
        native: 'люди'
    },
    {
        foreign: 'bowl',
        native: 'миска'
    },
    {
        foreign: 'cupboard',
        native: 'сервант'
    },
    {
        foreign: 'family',
        native: 'семья'
    },
    {
        foreign: 'job',
        native: 'работа'
    },
    {
        foreign: 'time',
        native: 'время'
    },
    {
        foreign: 'divide',
        native: 'разделять'
    },
    {
        foreign: 'weather',
        native: 'погода'
    },
    {
        foreign: 'immense',
        native: 'огромный'
    },
    {
        foreign: 'facilities',
        native: 'оборудование'
    },
    {
        foreign: 'purpose',
        native: 'цель'
    },
    {
        foreign: 'city',
        native: 'город'
    },
    {
        foreign: 'police',
        native: 'полиция'
    },
    {
        foreign: 'thing',
        native: 'вещь'
    },
    {
        foreign: 'quality',
        native: 'качество'
    }
];


const _initState = {
    words: words,
    quiz: [],
    currentQuestion: {}
};

const quiz = (state = _initState, action) => {

    switch (action.type) {
        case 'LOAD_FOREIGN_LIST':
            return Object.assign({}, state, {
                quiz: foreignList(state.words)
            });

        case 'SELECT_OPTION':
            // save choice here
            return state;

        case 'TO_NEXT_QUESTION':
            return Object.assign({}, state, {
                currentQuestion: state.quiz[state.quiz.indexOf(state.currentQuestion) + 1]
            });

        default:

            return state
    }
};

export default quiz


function _randomWordsWith(data, size, handle, include) {
    return shuffle(union([handle(include)], _randomWords(data, size - 1, handle, include)));
}

function _randomWords(data, size, handle, exclude) {
    const predicate = partial(isEqual, exclude);

    const iterator = compose(handle, getNth(data));

    return map(randomKeys(size, data.length), iterator);
}

function _detectOptions(data, key, word) {
    word.options = _randomWordsWith(data, QUIZ_OPTIONS_SIZE, property(key), word);
    return word;
}

function foreignList(data) {
    const addOptions = partial(_detectOptions, data, 'native');
    const renameKeys = rename(['foreign', 'native', 'options']);
    const flow = compose(renameKeys, addOptions, clone);

    const words = _randomWords(data, QUIZ_LIST_SIZE, flow);

    return words;
}


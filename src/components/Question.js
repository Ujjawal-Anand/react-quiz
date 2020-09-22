import React from 'react';
import PropTypes from 'prop-types';

/*
    Since this is going to be stateless presentation component
    we don't need to use a class to create the component as it allows
    to eliminate a lot of boilerplate code this way
*/
function Question(props) {
    return (
    <h2 className="question">{props.content}</h2>
    );
}

/*
    used to define the type of prop and what 
    props are required, will warn when there is 
    invalid propType
*/
Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question;

/*
    Compoennets:
        Presentational - defines how things look

        container - should be concerned with how things work
*/
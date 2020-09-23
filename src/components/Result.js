import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
    return (
        <CSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div className="result">
                You score is <strong>{props.score}</strong>
            </div>
        </CSSTransitionGroup>
    );
}

Result.propTypes = {
    score: PropTypes.number.isRequired
};

export default Result;
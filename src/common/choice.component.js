import React, { useState, useEffect, useRef } from 'react';

function Choice(props) {
    return (

        <React.Fragment>
            <div className="form-check">
                <input onClick={onClick} className="form-check-input" type="radio" name={props.name} value={props.option["choice"]} />
                <label className="form-check-label">{props.option["narrative"]}</label>
            </div>
        </React.Fragment>
    )

    function onClick(e) {
        let question = e.target.attributes.getNamedItem('name').value
        let choice = e.target.attributes.getNamedItem('value').value
        let ans = {
            question: question,
            choice: choice
        }

        props.onChoiceChange(ans)


    }


}

export default Choice;
import React from 'react'
import Choice from './choice.component'

function Question(props) {
    return (

        <React.Fragment>
               <h5 className="card-title">{props.question["narrative"]}</h5>
            {                
                props.question["options"].map((optn, index)=>{
                    return(
                        <Choice key={index} onChoiceChange={props.onChoiceChange} name={props.question["code"]} option={optn}/>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Question;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = ({index, sendSubmission, fields}) => {

  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: '',
  });

  const onInputChange = (event) => {
    setFormFields({
      ...formFields, 
      [event.target.name]: event.target.value,
    });
  }


  //line format:
  //"The adjective noun adverb verb the adjective noun"
  const onLineSubmit = (event) => {
    event.preventDefault();
    const newLine = 

    sendSubmission(newLine);

    setFormFields({
      key: `line${index}`,
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: '',
    });
  }

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{  }</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onLineSubmit} >

        <div className="PlayerSubmissionForm__poem-inputs">
          <div>The</div>
          <input 
            type='text' 
            value={formFields.adj1}
            name={fields[1].key} 
            placeholder={fields[1].placeholder}
            // key={`line${props.index}_${fields[1][key]}`}
            onChange={onInputChange}
          />
          <input 
            type='text' 
            value={formFields.noun1}
            name={fields[2].key} 
            placeholder={fields[2].placeholder}
            // key={`line${props.index}_${fields[2][key]}`}
            onChange={onInputChange}
          />
          <input 
            type='text' 
            value={formFields.adv}
            name={fields[3].key} 
            placeholder={fields[3].placeholder}
            // key={`line${props.index}_${fields[3][key]}`}
            onChange={onInputChange}
          />
          <input 
            type='text' 
            value={formFields.verb}
            name={fields[4].key} 
            placeholder={fields[4].placeholder}
            // key={`line${props.index}_${fields[4][key]}`}
            onChange={onInputChange}
          />
          <div>the</div>
          <input 
            type='text' 
            value={formFields.adj2}
            name={fields[6].key} 
            placeholder={fields[6].placeholder}
            // key={`line${props.index}_${fields[6][key]}`}
            onChange={onInputChange}
          />
          <input 
            type='text' 
            value={formFields.noun2}
            name={fields[7].key} 
            placeholder={fields[7].placeholder}
            // key={`line${props.index}_${fields[7][key]}`}
            onChange={onInputChange}
          />
          <div>.</div>
        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn"/>
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;

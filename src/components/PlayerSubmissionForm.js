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

  const onLineSubmit = (event) => {
    event.preventDefault();

    const newLine = fields.map((field)=> {
      if (field.key) {
        return formFields[field.key];
      } else {
        return field;
      }
    }).join(' ');

    sendSubmission(newLine);

    setFormFields({
      adj1: '',
      noun1: '',
      adverb1: '',
      verb1: '',
      adj2: '',
      noun2: '',
    });
  }

  const generateInputFields = (fields) => {
    return( fields.map((field) => {
      if (field.key) {
        return (
          <input 
            type='text' 
            value={formFields[field.key]}
            name={field.key} 
            placeholder={field.placeholder}
            onChange={onInputChange}
          />
        );
      } else {
        return (<div>{field}</div>);
      }
    })
    )
  }

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{index}</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onLineSubmit} >

        <div className="PlayerSubmissionForm__poem-inputs">
          {generateInputFields(fields)}
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

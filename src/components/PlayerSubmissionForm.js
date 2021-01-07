import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = ({index, sendSubmission, fields}) => {

  const generateNewFormFields = () => {
    const newFormFields = {};
    fields.forEach((field) => {
      if (field.key) {
        newFormFields[field.key] = '';
      }
    })

    return newFormFields;
  }

  const [formFields, setFormFields] = useState(generateNewFormFields);

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
    }).join(' ')

    sendSubmission(newLine);

    setFormFields(generateNewFormFields);
  }

  const generateInputFields = (fields) => {
    let i = 1;
    return( fields.map((field) => {
      if (field.key) {
        return (
          <input 
            key={`line${index}_${field.key}`}
            type='text' 
            value={formFields[field.key]}
            name={field.key} 
            placeholder={field.placeholder.substring(0,field.placeholder.length - 1)} //displayed string was changed to exclude number
            onChange={onInputChange}
            className={formFields[field.key] === '' ? 'emptyField' : 'populatedField' }
          />
        );
      } else {
        const element = <div key={`line${index}_string${i}`}>{field}</div>;
        i += 1;
        return element;
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

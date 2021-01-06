import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {

  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: '',
  });

  const onInputChange = (event) {
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
      'The ' + 
      formFields.adj1 + ' ' +
      formFields.noun2 + ' ' +
      formFields.adv + ' ' +
      formFields.verb + ' ' +
      'the ' +
      formFields.adj2 + ' ' +
      formFields.noun2 + '.';
    
    props.sendSubmission(newLine);
  }

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{  }</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={onLineSubmit} >


        <div className="PlayerSubmissionForm__poem-inputs">


          <input 
            type='text' 
            index='1'
            name={FIELDS[1][key]} 
            value={formFields.adj1}
            key={`line${props.index}_adj1`}
            // placeholder={FIELDS[1][placeholder]}
            onChange={onInputChange}
          />

          <input 
            name='line' 
            value='adjective'
            type='text' 
            placeholder='Roses are red...' 
            key=''
          />



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

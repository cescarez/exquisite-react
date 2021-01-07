import React from 'react';
import PropTypes from 'prop-types';
import './FinalPoem.css';

const FinalPoem = ({isSubmitted, submissions, revealPoem}) => {

  const revealButton = () => {
    return (
      <div className="FinalPoem__reveal-btn-container">
        <input type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" onClick={revealPoem} />
      </div>
    );
  }

  const finalPoem = () => {
    let i = 0;
    return (
      <section className="FinalPoem__revealed-poem-retake-btn-container">
        <div className="FinalPoem__revealed-poem-container">
          {
            submissions.map((line) => {
              const element = <p key={`line${i}`}>{line}</p>
              i += 1
              return element;
            })
          }
        </div>
      </section>
    );
  }

  return (
    <div className="FinalPoem">
      <section className="FinalPoem__poem">
        <h3>Final Poem</h3>
      </section>
      { isSubmitted ? finalPoem() : revealButton() }
    </div>
  );
}

FinalPoem.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
  submissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  revealPoem: PropTypes.func.isRequired,
};

export default FinalPoem;

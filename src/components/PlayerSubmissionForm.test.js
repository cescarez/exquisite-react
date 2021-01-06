import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerSubmissionForm from './PlayerSubmissionForm';

describe('Wave 1:  PlayerSubmissionForm', () => {
  // Arrange

  const FIELDS = [
    'The',
    {
      key: 'adj1',
      placeholder: 'adjective1',
    },
    'Test',
    {
      key: 'noun1',
      placeholder: 'noun1',
    },
    'Better',
    {
      key: 'verb1',
      placeholder: 'verb1',
    },
    'Pass',
    {
      key: 'adverb1',
      placeholder: 'adverb1',
    },
  ];
 
  test('renders with the proper input fields and a submit button', () => {
     // Act
    render(<PlayerSubmissionForm
      index={1}
      sendSubmission={() => { }}
      fields={FIELDS}
    />);

    const inputFields = FIELDS.filter((item) => typeof item !== 'string');

    // Assert
    inputFields.forEach(field => {
      const regex = new RegExp('^' + field.placeholder + '$', 'i');
      const inputField = screen.getByPlaceholderText(regex);
      expect(inputField).toBeInTheDocument();
    });
  });

  test('you can enter text in each field', () => {
    // Act
    render(<PlayerSubmissionForm
      index={1}
      sendSubmission={() => { }}
      fields={FIELDS}
    />);
  
  
    const inputFields = FIELDS.filter((item) => typeof item !== 'string');
    let index = 0;
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    // Assert
    inputFields.forEach(async field => {
      // Find the input field
      const regex = new RegExp('^' + field.placeholder + '$', 'i');
      const inputField = screen.getByPlaceholderText(regex)

      // Type in that input field
      userEvent.type(inputField, letters.charAt(index));
      // assert that the field now has the current letter
      expect(inputField).toHaveValue(letters.charAt(index));
      index += 1;
    });
  });

  test('clicking on the button with text "Submit Line" the form will call the callback function', () => {
    // Arrange
    const callBackFunction = jest.fn();
    render(<PlayerSubmissionForm
      index={1}
      sendSubmission={callBackFunction}
      fields={FIELDS}
    />);
    

    // Act
    const submitBtn = screen.getByText(/Submit Line/i);
    userEvent.click(submitBtn);

    // Assert
    expect(callBackFunction).toHaveBeenCalled();
  });

  test('the index prop determines which player\'s turn it is', () => {
    for (let index = 1; index < 5; index += 1) {
      // Arrange-Act

      render(<PlayerSubmissionForm
        index={index}
        sendSubmission={() => { } }
        fields={FIELDS}
      />);

      // Assert
      let playerText = `Player Submission Form for Player #${ index }`
      expect(screen.getByText(new RegExp(playerText, 'i'))).toBeInTheDocument();
      // Clear the dom prior to next loop iteration
      cleanup();
    }
  });
});

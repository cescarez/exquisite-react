import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FinalPoem from './FinalPoem';

describe('FinalPoem', () => {
  describe('before the poem is finished', () => {
    test('it renders with a button when isSubmitted is false', () => {
      // Act
      render(<FinalPoem isSubmitted={false} submissions={[]} revealPoem={() => { }} />);

      // Assert (find the button and assert it's in the document)
      const button = screen.getByText(/We are finished: Reveal the Poem/u);
      expect(button).toBeInTheDocument();
    });

    test('it calls the callback function when the button is clicked on', () => {
      // Arrange
      const callbackFunction = jest.fn();
      // Act
      render(<FinalPoem isSubmitted={false} submissions={[]} revealPoem={callbackFunction} />);
      const button = screen.getByText(/We are finished: Reveal the Poem/u);
      userEvent.click(button);

      expect(callbackFunction).toHaveBeenCalled();
    });
  });

  describe('after the poem is submitted', () => {
    test('it does not render the button if "isSubmitted" is true', () => {
      render(<FinalPoem isSubmitted={true} submissions={[]} revealPoem={() => { }} />);

      const button = screen.queryByText(/We are finished: Reveal the Poem/u);
      expect(button).toBeNull();
    });

    test('it displays the final poem if isSubmitted is true', () => {
      // Arrange
      const poem = [  // From “The Old Pond” by Matsuo Bashō
        'An old silent pond',
        'A frog jumps into the pond—',
        'Splash! Silence again.',
      ]

      // Act
      render(<FinalPoem isSubmitted={true} submissions={poem} revealPoem={() => { }} />);

      //Assert
      poem.forEach((line) => {
        const regex = new RegExp(line, 'i');
        expect(screen.queryByText(regex)).toBeInTheDocument();
      });
    });
  });
});

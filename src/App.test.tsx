import React from 'react';
import { render,cleanup } from '@testing-library/react';
import App from './App';
// import {render,cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'




it('renders', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  
});

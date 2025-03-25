import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import '../src/global.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;

import { render, fireEvent, waitFor } from '@testing-library/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '..';
import { Button } from '../../Button';

describe('DropdownMenu Components', () => {
  it('renders DropdownMenu with trigger and content', () => {
    const { getByRole, getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const openButton = getByRole('button', { name: 'Open' });
    fireEvent.click(openButton);

    waitFor(() => {
      expect(getByText('My Account')).toBeInTheDocument();
    });
  });
});

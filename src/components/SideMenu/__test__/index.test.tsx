import { render } from '@testing-library/react';

// Components
import SideMenu from '..';

const mockTabs = [
  {
    label: 'Personal Details',
    content: (
      <>
        1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
        facere, dolor, rerum iste eveniet voluptatibus soluta sint in delectus
        explicabo asperiores quo aut ad fugit recusandae temporibus. Nam,
        voluptate sed.
      </>
    ),
  },
  {
    label: 'Contact Details',
  },
  {
    label: 'Next of kin Details',
  },
  {
    label: 'Education Qualifications',
  },
  {
    label: 'Guarantor Details',
  },
  {
    label: 'Family Details',
  },
  {
    label: 'Job Details',
    content: (
      <>
        2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
        facere, dolor, rerum iste eveniet voluptatibus soluta sint in delectus
        explicabo asperiores quo aut ad fugit recusandae temporibus. Nam,
        voluptate sed.
      </>
    ),
  },
  {
    label: 'Financial Details',
  },
];

describe('SideMenu component', () => {
  it('should match snapshot', () => {
    const { container } = render(<SideMenu tabs={mockTabs} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

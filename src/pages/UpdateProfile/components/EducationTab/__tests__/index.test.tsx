import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

// Types
import { EducationType } from '@/types';

import EducationTab from '..';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetEducations: () => ({
    educations: [
      {
        id: '1',
        name: 'MIT',
        course: 'Computer Science',
        department: 'Engineering',
        location: 'USA',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2023-01-01'),
        description: 'Some academic education',
        type: EducationType.Academic,
      },
    ],
    isEducationsLoading: false,
  }),
  useDeleteEducation: () => ({
    handleDeleteEducation: jest.fn().mockResolvedValue({}),
    isDeleteLoading: false,
  }),
  useEducationMutation: () => ({
    handleEducationMutation: jest.fn().mockResolvedValue({}),
    isEducationMutationLoading: false,
  }),
  useToast: () => ({ toast: jest.fn() }),
  useConfirm: () => jest.fn(),
}));

describe('EducationTab Integration Test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders both education sections', () => {
    render(<EducationTab />);
    expect(screen.getByText('Academic Records')).toBeInTheDocument();
    expect(screen.getByText('Professional Qualifications')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('opens form when clicking PlusIcon in Academic section', async () => {
    render(<EducationTab />);
    const addButtons = screen.getAllByTitle('add-education-button');
    const plusButton = addButtons.find((btn) => btn.querySelector('svg'));

    expect(plusButton).toBeTruthy();
    userEvent.click(plusButton!);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Enter your institution name'),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Enter your description'),
      ).toBeInTheDocument();
    });
  });

  it('submits create form successfully', async () => {
    render(<EducationTab />);

    userEvent.click(screen.getAllByTitle('add-education-button')[0]);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Enter your institution name'),
      ).toBeInTheDocument();
    });

    userEvent.type(
      screen.getByPlaceholderText('Enter your institution name'),
      'Harvard',
    );
    userEvent.type(
      screen.getByPlaceholderText('Enter your department'),
      'Science',
    );
    userEvent.type(screen.getByPlaceholderText('Enter your course'), 'Math');
    userEvent.type(screen.getByPlaceholderText('Enter your location'), 'USA');
    userEvent.type(
      screen.getByPlaceholderText('Enter your description'),
      'A new description',
    );

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(submitButton).toBeDisabled();
    });
  });

  it('can return from form using Go Back button', async () => {
    render(<EducationTab />);
    userEvent.click(screen.getAllByTitle('add-education-button')[0]);

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: 'Academic Records' }));

    await waitFor(() => {
      expect(screen.getByText('Academic Records')).toBeInTheDocument();
    });
  });
});

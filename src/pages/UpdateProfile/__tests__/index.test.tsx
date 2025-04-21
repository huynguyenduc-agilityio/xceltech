import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useGetInfoUser } from '@/hooks';

import UpdateProfile from '..';

jest.mock('@/hooks', () => ({
  useGetInfoUser: jest.fn(),
}));

jest.mock('@/components/Form/ContactForm', () => () => <div>ContactForm</div>);

jest.mock('@/components', () => {
  const originalModule = jest.requireActual('@/components');
  return {
    ...originalModule,
    Breadcrumb: () => <nav aria-label="Breadcrumb">Breadcrumb</nav>,
    SideMenu: ({
      tabs,
    }: {
      tabs: {
        label: string;
        content: React.ReactNode;
      }[];
    }) => (
      <div>
        {tabs.map((tab) => (
          <section key={tab.label}>
            <h2>{tab.label}</h2>
            <div>{tab.content}</div>
          </section>
        ))}
      </div>
    ),
    Fallback: () => <div>Loading...</div>,
    NextOfKinForm: () => <div>NextOfKinForm</div>,
  };
});

// Mock profile tab components
jest.mock('../components', () => ({
  EducationTab: () => <div>EducationTab</div>,
  FamilyTab: () => <div>FamilyTab</div>,
  FinancialTab: () => <div>FinancialTab</div>,
  GuarantorTab: () => <div>GuarantorTab</div>,
  JobDetailTab: ({ jobInfo }: { jobInfo: { name?: string } }) => (
    <div>JobDetailTab - {jobInfo?.name}</div>
  ),
  PersonalDetailTab: ({ userInfo }: { userInfo: { name?: string } }) => (
    <div>PersonalDetailTab - {userInfo?.name}</div>
  ),
}));

describe('UpdateProfile', () => {
  const tabLabels = [
    'Personal Details',
    'Contact Details',
    'Next of kin Details',
    'Education Qualifications',
    'Guarantor Details',
    'Family Details',
    'Job Details',
    'Financial Details',
  ];

  const renderAndExpectBase = () => {
    render(<UpdateProfile />);
    expect(
      screen.getByRole('navigation', { name: /breadcrumb/i }),
    ).toBeInTheDocument();
    tabLabels.forEach((label) => {
      expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    });
  };

  beforeEach(() => {
    (useGetInfoUser as jest.Mock).mockReturnValue({
      userInfo: {
        name: 'John Doe',
        job: {
          name: 'Developer',
          department: 'Engineering',
          lineManagement: 'Lead',
          description: 'Full-stack developer',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<UpdateProfile />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render without crashing when userInfo is empty', () => {
    (useGetInfoUser as jest.Mock).mockReturnValue({ userInfo: {} });
    renderAndExpectBase();
    expect(screen.getByText('PersonalDetailTab -')).toBeInTheDocument();
    expect(screen.getByText('JobDetailTab -')).toBeInTheDocument();
  });

  it('should render breadcrumb, tabs and lazy-loaded content', async () => {
    renderAndExpectBase();
    expect(await screen.findByText('ContactForm')).toBeInTheDocument();
    expect(
      screen.getByText('PersonalDetailTab - John Doe'),
    ).toBeInTheDocument();
    expect(screen.getByText('JobDetailTab - Developer')).toBeInTheDocument();
  });

  it('should render all tab labels and content', async () => {
    renderAndExpectBase();
    expect(
      screen.getByText('PersonalDetailTab - John Doe'),
    ).toBeInTheDocument();
    expect(screen.getByText('JobDetailTab - Developer')).toBeInTheDocument();
    expect(await screen.findByText('ContactForm')).toBeInTheDocument();
    expect(screen.getByText('EducationTab')).toBeInTheDocument();
    expect(screen.getByText('FamilyTab')).toBeInTheDocument();
    expect(screen.getByText('FinancialTab')).toBeInTheDocument();
    expect(screen.getByText('GuarantorTab')).toBeInTheDocument();
  });

  it('should render and interact with tabs', async () => {
    render(<UpdateProfile />);
    expect(
      screen.getByText('PersonalDetailTab - John Doe'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('heading', { name: 'Contact Details' }));
    await waitFor(() => {
      expect(screen.getByText('ContactForm')).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole('heading', { name: 'Education Qualifications' }),
    );
    await waitFor(() => {
      expect(screen.getByText('EducationTab')).toBeInTheDocument();
    });
  });
});

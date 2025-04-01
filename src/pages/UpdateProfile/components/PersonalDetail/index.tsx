// Icons
import { EditIcon } from '@/icons';

// Components
import { Avatar, Button } from '@/components';

const PersonalTab = () => {
  return (
    <div className="pt-16 text-center relative">
      <Avatar
        size={197}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvtXo0VK1WnuWrlK1tOXQizpHNhvqSJ9hUnQ&s"
        className="mx-auto"
      />
      <Button
        variant="ghost"
        size="fit"
        className="flex flex-col items-center justify-center absolute top-16 right-[123px]"
      >
        <EditIcon />
        <span className="text-lg text-black-default font-normal mr-2">
          Edit
        </span>
      </Button>

      {/* Employee Info */}
      <div className="flex flex-col mt-9 text-black-default text-lg">
        <span className="mb-4">Employee Name</span>
        <span className="text-2xl font-bold">Biruk Dawit</span>
      </div>

      <div className="flex flex-col mt-[60px] text-black-default text-lg">
        <span className="mb-4">Department</span>
        <span className="text-2xl font-bold">Design & Marketing</span>
      </div>

      {/* Job Info */}
      <div className="flex items-center justify-center gap-36 mt-[85px] text-black-default text-lg">
        <div className="flex flex-col">
          <span className="mb-4">Job Title</span>
          <span className="text-2xl font-bold">UI / UX Designer</span>
        </div>
        <div className="flex flex-col">
          <span className="mb-4">Job Category</span>
          <span className="text-2xl font-bold">Full time</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalTab;

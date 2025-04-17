const AdminLeave = () => {
  return (
    <div className="px-12 bg-primary rounded-3xl mt-10 flex justify-between max-h-[422px] overflow-hidden">
      <div className="w-[740px]">
        <img
          src="/assets/images/arrowRight.webp"
          alt="Arrow Right Image"
          className="ml-5 object-cover"
        />

        <p className="text-5xl font-bold text-white">
          Manage ALL <span className="text-secondary">Leave Applications</span>
        </p>
        <p className="text-white text-xl">
          A relaxed employee is a performing employee.
        </p>

        <div className="w-full flex justify-end">
          <img
            src="/assets/images/arrowLeft.webp"
            alt="Arrow Left Image"
            className="object-cover"
          />
        </div>
      </div>

      <img
        src="/assets/images/leaveImage.webp"
        alt="Leave Image"
        className="object-cover"
      />
    </div>
  );
};

export default AdminLeave;

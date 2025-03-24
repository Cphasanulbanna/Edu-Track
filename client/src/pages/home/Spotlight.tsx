const Spotlight = () => {
  return (
       <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/college-bg.jpg')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 flex flex-col gap-3 justify-center items-center h-full text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Where Ambition Meets Opportunity
        </h1>
        <p className="text-white max-w-xl">
          From student success stories to unforgettable campus moments, explore
          the highlights that define who we are and what we strive for every day.
        </p>
      </div>
    </div>
  );
};

export default Spotlight;

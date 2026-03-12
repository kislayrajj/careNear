import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen pb-24 landing_bg pt-12 flex flex-col gap-12 justify-center items-center">
      <div className="py-24 flex flex-col items-center justify-center gap-10">
        {" "}
        <div className="1 bg-white h-8 max-w-fit px-2 flex justify-center items-center gap-2 rounded-2xl text-sm">
          <i className="fa-solid fa-shield text-green-400"></i>Trusted by
          10,000+ patients
        </div>
        <div className="2 text-2xl md:text-7xl flex flex-col justify-center items-center font-bold gap-6">
          <div className=" text-cyan-500">Healthcare</div>{" "}
          <div>That Comes to You</div>
        </div>
        <div className="3 text-center leading-6 text-gray-500 md:text-lg">
          <div>
            Find trusted doctors and pharmacies near you. Book appointments
          </div>
          instantly. Get medicines delivered.
        </div>
        <div className="4 bg-white rounded-2xl p-6 flex flex-col justify-around gap-6 animate-pulse active:animate-none">
          <div className="flex justify-around items-center gap-4">
            <div className="flex justify-center items-center gap-2 md:w-80 bg-cyan-300 rounded-2xl h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-medium py-3 px-6 shadow-lg shadow-cyan-400/40 hover:from-cyan-500 hover:to-cyan-700 transition-all duration-100 transform">
              <span>
                <i className="fa-solid fa-user-doctor"></i>
              </span>
              Find Doctors
            </div>
            <div className="flex justify-center items-center gap-2 md:w-80  rounded-2xl h-12  font-medium py-3 px-6 border border-gray-200">
              <span>
                <i className="fa-solid fa-capsules"></i>
              </span>
              Find Medicines
            </div>
          </div>
          <div className="flex relative items-center justify-between">
            <input
              type="text"
              placeholder="Search doctors, specialists..."
              className="border border-gray-200 rounded-2xl  p-2 h-12 w-[85%] bg-gray-50"
            />
            <span className="absolute right-[17%] top-2">
              <i className="fa-solid fa-location-dot bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent"></i>
            </span>
            <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white font-medium py-3 px-7 shadow-lg shadow-cyan-400/40">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="text-gray-500 text-sm flex justify-start items-center gap-2">
            <i className="fa-solid fa-location-dot"></i>
            Using your location: Mumbai, India
          </div>
        </div>
      </div>
      <div className="pt-12 px-12 flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col gap-2 md:gap-4 justify-center items-center fle">
          <div className="text-2xl md:text-3xl font-bold">
            Why Choose CareNear?
          </div>
          <div className="text-gray-500">
            Premium healthcare experience, simplified
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 justify-between">
          <div className="flex flex-1 md:max-w-96 flex-col justify-center items-start gap-3 bg-white rounded-2xl  p-6 shadow-lg">
            <div className="doctor_icon_bg w-fit p-3 rounded-2xl text-white text-2xl">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div className="font-bold text-lg">Verified Doctors</div>
            <div className="text-sm text-gray-500">
              All doctors are verified professionals with proven credentials and
              patient reviews.
            </div>
          </div>
          <div className="flex flex-1 md:max-w-96 flex-col justify-center items-start gap-3 bg-white rounded-2xl  p-6 shadow-lg">
            <div className="location_icon_bg w-fit p-3 rounded-2xl text-white text-2xl">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="font-bold text-lg">Real-Time Availability</div>
            <div className="text-sm text-gray-500">
              See live availability and book appointments instantly without
              waiting
            </div>
          </div>
          <div className="flex flex-1 md:max-w-96 flex-col justify-center items-start gap-3 bg-white rounded-2xl p-6 shadow-lg">
            <div className="trend_icon_bg w-fit p-3 rounded-2xl text-white text-2xl">
              <i className="fa-solid fa-arrow-trend-up"></i>
            </div>
            <div className="font-bold text-lg">Smart Matching</div>
            <div className="text-sm text-gray-500">
              AI-powered recommendations based on your symptoms and medical
              history
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 bg-white flex flex-col gap-4 justify-center items-center rounded-2xl px-12 py-10">
        <div className="font-bold text-2xl md:text-3xl">Ready to Experience Better Healthcare?</div>
        <div className="text-gray-400">Join thousands of patients who trust CareNear for their healthcare needs</div>
        <div className="flex gap-8 text-center mt-3">
          <div className="w-32 button_1 text-white font-semibold p-3 rounded-2xl">Find a Doctor</div>
          <div className="w-32 button_2 text-white font-semibold p-3 rounded-2xl">Find Medicine</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

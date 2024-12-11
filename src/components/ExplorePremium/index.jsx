// eslint-disable-next-line no-unused-vars
import React from "react";
import { BsSpotify } from "react-icons/bs";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const ExplorePremium = () => {
  return (
    <>
      <Link to="/">
        <FaRegArrowAltCircleLeft className="text-xl lg:text-2xl" />
      </Link>

      <div className="text-white p-8 mt-10 rounded-lg bg-gradient-to-r from-pink-900 to-blue-900">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Listen without limits. Try 2 months of Premium for ₹119.
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-6">
          Only ₹119/month after. Cancel anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 ">
          <button className="bg-white text-xs md:text-sm text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Get Premium Individual
          </button>
          <button className="bg-transparent border text-xs md:text-sm border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300">
            View all Plans
          </button>
        </div>
        <p className="text-xs sm:text-sm md:text-base">
          ₹119 for 2 months, then ₹119 per month after. Offer only available if
          you haven&apos;t tried Premium before.
          <a href="#" className="underline">
            Terms apply.
          </a>
        </p>
      </div>

      <div className="text-center p-4 mt-8 mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Affordable plans for any situation
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-2">
          Choose a Premium plan and listen to ad-free music without limits on
          your phone,
        </p>
        <p className="text-sm sm:text-base md:text-lg mb-6">
          speaker, and other devices. Pay in various ways. Cancel anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <div className="w-14 h-11 p-2 rounded-lg shadow-md bg-white flex items-center justify-center">
            <img
              className="w-10 h-10 object-contain"
              src="https://w7.pngwing.com/pngs/73/360/png-transparent-india-bhim-unified-payments-interface-mobile-phones-india.png"
              alt="BHIM UPI"
            />
          </div>
          <div className="w-14 h-11 p-2 rounded-lg shadow-md bg-white flex items-center justify-center">
            <img
              className="w-10 h-10 object-contain"
              src="https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo.png"
              alt="Google Pay"
            />
          </div>
          <div className="w-14 h-11 p-2 rounded-lg shadow-md bg-white flex items-center justify-center">
            <img
              className="w-10 h-10 object-contain"
              src="https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text.png"
              alt="PhonePe"
            />
          </div>
          <div className="w-14 h-11 p-2 rounded-lg shadow-md bg-white flex items-center justify-center">
            <img
              className="w-10 h-10 object-contain"
              src="https://w7.pngwing.com/pngs/305/719/png-transparent-paytm-ecommerce-shopping-social-icons-circular-color-icon.png"
              alt="Paytm"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap items-center">
        <div className="max-w-xs mx-auto p-4 md:p-6 mb-10 bg-[#242424] shadow-lg text-white">
          <div className="flex items-center mb-4">
            <BsSpotify className="text-lg" />
            <h4 className="text-base md:text-lg font-bold ml-2">Premium</h4>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#d5f261]">
            Mini
          </h1>
          <p className="text-base font-bold mt-4 mb-4">₹29 for 1 week</p>
          <hr className="border-gray-300 mb-4" />
          <ul className="mb-4 space-y-2 list-disc pl-5">
            <li className="text-sm text-white">
              1 mobile-only Premium account
            </li>
            <li className="text-sm text-white">
              Offline listening of up to 30 songs on 1 device
            </li>
            <li className="text-sm text-white">One-time payment</li>
            <li className="text-sm text-white">Basic audio quality</li>
          </ul>
          <button className="w-full  text-xs md:text-sm bg-[#d5f261] text-black font-semibold py-2 md:py-3 rounded-full hover:bg-[#f3ffc2] transition cursor-pointer">
            Get Premium Mini
          </button>
          <a
            href="#"
            className="block text-center text-xs text-gray-400 underline mt-2"
          >
            Terms apply.
          </a>
        </div>

        <div className="max-w-xs mx-auto p-4 md:p-6 mb-10 bg-[#242424] shadow-lg text-white">
          <div className="flex items-center mb-4">
            <BsSpotify className="text-lg" />
            <h4 className="text-base md:text-lg font-bold ml-2">Premium</h4>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#fabbbb]">
            Individual
          </h1>
          <p className="text-base font-bold mt-4 ">₹119 for 2 months</p>
          <p className="text-gray-200 text-xs mb-4 font-bold">
            ₹119 / month after
          </p>
          <hr className="border-gray-300 mb-4" />
          <ul className="mb-4 space-y-2 list-disc pl-5">
            <li className="text-sm text-white">1 Premium account</li>
            <li className="text-sm text-white">Cancel anytime</li>
            <li className="text-sm text-white">
              Subscribe or one-time payment
            </li>
          </ul>
          <button className="w-full  text-xs md:text-sm bg-[#fabbbb] text-black font-semibold py-2 md:py-3 rounded-full hover:bg-[#fcdfe8] transition cursor-pointer">
            Get Premium Individual
          </button>
          <div className="flex flex-col items-center mt-3">
            <p className="text-xs text-center text-gray-400">
              ₹119 for 2 months, then ₹119 per month after. Offer only available
              if you haven&apos;t tried Premium before.
              <a href="#" className="text-xs text-gray-400 underline">
                Terms apply.
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-xs mx-auto p-4 md:p-6 mb-10 bg-[#242424] shadow-lg text-white">
          <div className="flex items-center mb-4">
            <BsSpotify className="text-lg" />
            <h4 className="text-base md:text-lg font-bold ml-2">Premium</h4>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#aedaec]">
            Family
          </h1>
          <p className="text-base font-bold mt-4 ">₹179 for 2 months</p>
          <p className="text-gray-200 text-xs mb-4 font-bold">
            ₹179 / month after
          </p>
          <hr className="border-gray-300 mb-4" />
          <ul className="mb-4 space-y-2 list-disc pl-5">
            <li className="text-sm text-white">Up to 6 Premium accounts</li>
            <li className="text-sm text-white">
              Control content marked as explicit
            </li>
            <li className="text-sm text-white">Cancel anytime</li>
            <li className="text-sm text-white">
              Subscribe or one-time payment
            </li>
          </ul>
          <button className="w-full  text-xs md:text-sm bg-[#aedaec] text-black font-semibold py-2 md:py-3 rounded-full hover:bg-[#d6e0e7] transition cursor-pointer">
            Get Premium Family
          </button>
          <div className="flex flex-col items-center mt-3">
            <p className="text-xs text-center text-gray-400">
              ₹179 for 2 months, then ₹179 per month after. Offer only available
              if you haven&apos;t tried Premium before. For up to 6 family
              members residing at the same address.
              <a href="#" className="text-xs text-gray-400 underline">
                Terms apply.
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-xs mx-auto p-4 md:p-6 mb-10 bg-[#242424] shadow-lg text-white">
          <div className="flex items-center mb-4">
            <BsSpotify className="text-lg" />
            <h4 className="text-base md:text-lg font-bold ml-2">Premium</h4>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#f2c460]">Duo</h1>
          <p className="text-base font-bold mt-4 ">₹149 for 2 months</p>
          <p className="text-gray-200 text-xs mb-4 font-bold">
            ₹149 / month after
          </p>
          <hr className="border-gray-300 mb-4" />
          <ul className="mb-4 space-y-2 list-disc pl-5">
            <li className="text-sm text-white">2 Premium account</li>
            <li className="text-sm text-white">Cancel anytime</li>
            <li className="text-sm text-white">
              Subscribe or one-time payment
            </li>
          </ul>
          <button className="w-full  text-xs md:text-sm bg-[#f2c460] text-black font-semibold py-2 md:py-3 rounded-full hover:bg-[#e7c79c] transition cursor-pointer">
            Get Premium Duo
          </button>
          <div className="flex flex-col items-center mt-3">
            <p className="text-xs text-center text-gray-400">
              ₹149 for 2 months, then ₹149 per month after. Offer only available
              if you haven&apos;t tried Premium before. For couples who reside
              at the same address.
              <a href="#" className="text-xs text-gray-400 underline">
                Terms apply.
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-xs mx-auto p-4 md:p-6 mb-10 bg-[#242424] shadow-lg text-white">
          <div className="flex items-center mb-4">
            <BsSpotify className="text-lg" />
            <h4 className="text-base md:text-lg font-bold ml-2">Premium</h4>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#dabee8]">
            Student
          </h1>
          <p className="text-base font-bold mt-4 ">₹59 for 2 months</p>
          <p className="text-gray-200 text-xs mb-4 font-bold">
            ₹59 / month after
          </p>
          <hr className="border-gray-300 mb-4" />
          <ul className="mb-4 space-y-2 list-disc pl-5">
            <li className="text-sm text-white">1 verified Premium account</li>
            <li className="text-sm text-white">
              Discount for eligible students
            </li>
            <li className="text-sm text-white">Cancel anytime</li>
            <li className="text-sm text-white">
              Subscribe or one-time payment
            </li>
          </ul>
          <button className="w-full  text-xs md:text-sm bg-[#dabee8] text-black font-semibold py-2 md:py-3 rounded-full hover:bg-[#cac1cc] transition cursor-pointer">
            Get Premium Student
          </button>
          <div className="flex flex-col items-center mt-3">
            <p className="text-xs text-center text-gray-400">
              ₹59 for 2 months, then ₹59 per month after. Offer available only
              to students at an accredited higher education institution and if
              you haven&apos;t tried Premium before.
              <a href="#" className="text-xs text-gray-400 underline">
                Terms apply.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePremium;

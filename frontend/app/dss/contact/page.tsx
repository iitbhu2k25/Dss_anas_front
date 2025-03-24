'use client';

import React from 'react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="max-w-[1000px] mx-auto my-16 px-6 border-4 border-[#1A75BB] rounded-[15px] border-ridge">
      <h1 className="text-center text-2xl text-gray-800 mt-8 mb-10 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-[#1A75BB] after:rounded-md">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[600px_350px] gap-6 my-8 justify-center">
        <div className="bg-[rgb(182,219,224)] rounded-lg shadow-md p-4 h-[450px] md:h-auto lg:h-[450px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full">
            {/* Email Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out group-hover:bg-gray-500">
                <Image 
                  src="/images/contact/mail.gif" 
                  alt="Email" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-envelope"></i>
              </div>
                <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                    <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Email Us</h3>
                    <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">coordinator.gtac@itbhu.ac.in</p>
                    <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">slcr.varanasi@gmail.com</p>
                </div>
            </div>

            {/* Call Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out">
                <Image 
                  src="/images/contact/call_logo.png" 
                  alt="Call" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-phone"></i>
              </div>
              <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Call Us</h3>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">+91-542-2575389</p>
              </div>
            </div>

            {/* Visit Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out">
                <Image 
                  src="/images/contact/visit.png" 
                  alt="Visit" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Visit Us</h3>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">
                  Smart Laboratory for Clean Rivers (SLCR) Department of Civil Engineering,
                </p>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">
                  Indian Institute of Technology (BHU) Varanasi 221005
                </p>
              </div>
            </div>

            {/* Working Hours Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out">
                <Image 
                  src="/images/contact/working.png" 
                  alt="Working Hours" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-clock"></i>
              </div>
              <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Working Hours</h3>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">Mon - Fri: 9AM - 6PM</p>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">Sat: 9AM - 1PM</p>
              </div>
            </div>

            {/* Live Chat Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out">
                <Image 
                  src="/images/contact/live_chat.png" 
                  alt="Live Chat" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-comments"></i>
              </div>
              <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Live Chat</h3>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">Available Mon - Fri</p>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">9AM - 5PM IST</p>
              </div>
            </div>

            {/* Support Item */}
            <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-md p-4 h-full transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
              <div className="relative w-[50px] h-[50px] flex items-center justify-center bg-[rgba(26,117,187,0.1)] rounded-full mb-3 text-[#1A75BB] transition-all duration-300 ease-in-out">
                <Image 
                  src="/images/contact/support.png" 
                  alt="Support" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                  width={55}
                  height={55}
                />
                <i className="fas fa-headset"></i>
              </div>
              <div className="flex-grow flex flex-col justify-center transition-all duration-300">
                <h3 className="m-0 mb-2 text-gray-800 text-sm font-semibold transition-all duration-300">Support</h3>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">Technical Help</p>
                <p className="m-0 text-gray-600 text-xs leading-relaxed transition-all duration-300">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[450px] md:h-auto lg:h-[450px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.218529759872!2d82.99154878507075!3d25.26323320476016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e322a6031e99d%3A0x962763bc1a36226!2sDepartment%20of%20Civil%20Engineering%2C%20IIT%20(Banaras%20Hindu%20University)!5e0!3m2!1sen!2sin!4v1739171130935!5m2!1sen!2sin"
            width="600" 
            height="450" 
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}

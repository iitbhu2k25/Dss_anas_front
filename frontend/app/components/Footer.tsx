// components/Footer.js
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center items-center flex-wrap gap-5 mb-6">
          <div className="relative w-32 h-13">
            <Image
              src="/images/footer/logo1.png"
              alt="Partner Logo"
              layout="fill"
              objectFit="contain"
              className="scale-135"                                  // Zooms to 125% size
            />
          </div>

          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/logo2.svg"
              alt="Trusted Brand"
              layout="fill"
              objectFit="contain"
            />
          </div>
          
          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/logo3.gif"
              alt="Company Seal"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/iitbhu.png"
              alt="Certified Mark"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/iitbombay.png"
              alt="Award Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/download.png"
              alt="Company Seal"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/IIT_Madras_Logo.svg.png"
              alt="Company Seal"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="relative w-32 h-16">
            <Image
              src="/images/footer/50.png"
              alt="Company Seal"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
     

      {/* Additional Footer Content */}
      <div className="text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </div>
    </footer >
  );
};

export default Footer;
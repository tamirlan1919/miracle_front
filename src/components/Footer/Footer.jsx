import { Footer } from 'flowbite-react';
import img from './Frame 1 (3).svg';
import './Footer.module.css'
function FooterComp() {
  return (
    <footer className="footer ">
      <div className="container py-5 text-center">
        <div className="flex justify-between items-center">
          <div className="max-w-[150px]">
            {/* Replace the link and alt text with your own */}
            <a href="/">
              <img src={img} alt="Your Logo" />
            </a>
          </div>
          <div className="links">
            <a href="#">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <p>&copy; {new Date().getFullYear()} Flowbite™</p>
        </div>
      </div>
    </footer>
  );
};


export default FooterComp
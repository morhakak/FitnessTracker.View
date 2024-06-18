import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-[#395756] sm:h-[65px] h-[160px] mt-5 pb-3 sm:py-10 text-center text-xs w-full text-white dark:bg-[#10192E]">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Fitness Tracker | All rights
          reserved to Mor Hakak
        </p>
        <div className="flex gap-2">
          <div className="flex text-sm justify-center items-center gap-1">
            <p>Contact us:</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <FontAwesomeIcon icon={faPhone} />
            <p>
              <a href="tel:0526640794">0526640794</a>
            </p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>
              <a href="mailto:morhakwork@gmail.com">morhakwork@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

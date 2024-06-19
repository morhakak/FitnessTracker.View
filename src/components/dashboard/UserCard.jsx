import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEnvelope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { faPersonCircleExclamation } from "@fortawesome/free-solid-svg-icons/faPersonCircleExclamation";
import defaultImage from "../../assets/user.png";

const UserCard = ({ userProp, onDeleteUser }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth();

  function firstLetterToUpperCase(string) {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  console.log(userProp);

  const handleDeleteClick = (userId) => {
    if (user && user.userId == userId) {
      toast.error("You cannot delete yourself.");
      return;
    }
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    onDeleteUser(userProp.userId);
    setModalIsOpen(false);
  };

  const isAdmin = userProp.roles.includes("admin");

  return (
    <div className="relative flex flex-col justify-start items-start mb-4 py-4 h-[180px] gap-3 text-xs sm:text-sm rounded-md p-4 bg-[#395756] text-white w-[350px] sm:w-[400px] shadow-md dark:bg-[#10192E] dark:shadow-slate-800 ">
      {isAdmin && (
        <span className="bg-white absolute font-medium py-1 px-2 left-48 text-black rounded-full">
          Admin
        </span>
      )}
      <div className="flex items-center self-center -mt-2 mb-2 border-b-2 w-full pb-2">
        <img
          className="rounded-full w-10 inline-block mr-2"
          src={user && user.imageUrl ? user.imageUrl : defaultImage}
        />
        <p className="truncate">{firstLetterToUpperCase(userProp.userName)}</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
        <p className="truncate">{userProp.email}</p>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <FontAwesomeIcon icon={faPersonCircleExclamation} className="text-xl" />
        <p className="truncate">
          {firstLetterToUpperCase(userProp.roles.join(", "))}
        </p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <FontAwesomeIcon icon={faCalendar} className="text-xl" />
        <p className="truncate">{user.createdAt}</p>
      </div>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="cursor-pointer self-center text-lg absolute right-4 transition-transform duration-300 hover:scale-110"
        onClick={() => handleDeleteClick(userProp.userId)}
      />
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="h-[12rem] w-[20rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:text-white dark:bg-[#10192E] p-2 rounded shadow-md flex flex-col justify-between"
          overlayClassName="fixed inset-0 bg-black z-20 bg-opacity-50"
        >
          <div className="flex justify-end">
            <button
              className="px-2 font-bold"
              onClick={() => setModalIsOpen(false)}
            >
              X
            </button>
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <h2 className="text-center text-md px-8 mb-2">
              Delete user <span className="italic">{userProp.email}</span>
            </h2>
            <p className="text-lg text-center">Are you sure?</p>
          </div>
          <div className="flex justify-center gap-2 ">
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-blue-500 hover:bg-blue-400 dark:bg-[#0D2247] text-white px-2 py-1 rounded mt-2 text-sm dark:hover:bg-[#0E2855]"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2 text-sm hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );

  // return (
  //   <div className="flex text-xs sm:text-md items-center rounded-md p-4 justify-between bg-[#395756] text-white h-12 w-[400px] sm:w-[500px] shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-[#10192E] dark:shadow-slate-800 ">
  //     <div className="flex items-center flex-1 space-x-4">
  //       <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
  //       <p className="truncate">{userProp.userName}</p>
  //     </div>
  //     <div className="flex items-center flex-1 space-x-4">
  //       <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
  //       <p className="truncate">{userProp.email}</p>
  //     </div>
  //     <div className="flex items-center flex-1 justify-end space-x-4">
  //       <p className="truncate">{userProp.roles.join(", ")}</p>
  //       <FontAwesomeIcon
  //         icon={faTrashCan}
  //         className="text-xl cursor-pointer"
  //         onClick={() => handleDeleteClick(userProp.userId)}
  //       />
  //     </div>
  //     {modalIsOpen && (
  //       <Modal
  //         isOpen={modalIsOpen}
  //         onRequestClose={() => setModalIsOpen(false)}
  //         className="h-[12rem] w-[20rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:text-white dark:bg-[#10192E] p-2 rounded shadow-md flex flex-col justify-between"
  //         overlayClassName="fixed inset-0 bg-black z-20 bg-opacity-50"
  //       >
  //         <div className="flex justify-end">
  //           <button
  //             className="px-2 font-bold"
  //             onClick={() => setModalIsOpen(false)}
  //           >
  //             X
  //           </button>
  //         </div>
  //         <div className="flex-grow flex flex-col justify-center">
  //           <h2 className="text-center text-md px-8 mb-2">
  //             Delete user <span className="italic">{userProp.email}</span>
  //           </h2>
  //           <p className="text-lg text-center">Are you sure?</p>
  //         </div>
  //         <div className="flex justify-center gap-2 ">
  //           <button
  //             onClick={() => setModalIsOpen(false)}
  //             className="bg-blue-500 hover:bg-blue-400 dark:bg-[#0D2247] text-white px-2 py-1 rounded mt-2 text-sm dark:hover:bg-[#0E2855]"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={confirmDelete}
  //             className="bg-red-500 text-white px-2 py-1 rounded mt-2 text-sm hover:bg-red-400"
  //           >
  //             Delete
  //           </button>
  //         </div>
  //       </Modal>
  //     )}
  //   </div>
  // );
};

UserCard.propTypes = {
  userProp: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UserCard;

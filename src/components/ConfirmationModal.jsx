import PropTypes from "prop-types";

export default function ConfirmationModal({
  setOpenModal,
  title,
  content,
  onConfirm,
}) {
  return (
    <div className="w-screen h-screen bg-[rgba(200,200,200)] fixed flex justify-center items-center">
      <div className="w-[500px] h-[500px] rounded-md bg-white shadow-md flex flex-col p-[25px]">
        <div className="flex justify-end">
          <button
            className="bg-transparent border-none text-2xl cursor-pointer"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="inline-block text-center mt-[10px]">
          <h1>{title}</h1>
        </div>
        <div className="flex flex-1 w-1/2 justify-center items-center text-3xl text-center">
          <p>{content}</p>
        </div>
        <div className="flex flex-1 w-1/5 justify-center items-center">
          <button
            className="w-[150px] h-[45px] m-[10px] border-none bg-red-500 text-white rounded-[8px] text-xl cursor-pointer"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            className="w-[150px] h-[45px] m-[10px] border-none bg-blue-500 text-white rounded-[8px] text-xl cursor-pointer"
            onClick={() => {
              onConfirm();
              setOpenModal(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
};

// src/components/Modal.jsx

import React from "react";

const Modal = ({
  isOpen,
  title,
  body,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-red-500 text-white hover:bg-red-600", // New prop with default value
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Body */}
        {body && <p>{body}</p>}

        <div className="mt-6 flex justify-end gap-3">
          {/* Cancel Button */}
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={onClose}>
            {cancelText}
          </button>

          {/* Confirm Button */}
          <button className={`px-4 py-2 ${confirmButtonClass} rounded-md`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import { memo, useEffect } from "react";
import "./modal.css";

function Modal({ isOpen, callBack, isDark }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay">
        <div
          className="modal"
          data-theme={isDark ? "dark" : "light"}
          onClick={(e) => e.stopPropagation()}
        >
          <span>Are you sure you want to clear all list?</span>
          <div className="btn-wrapper">
            <button className="cancle-btn" onClick={() => callBack(false)}>
              Cancle
            </button>
            <button className="yes-btn" onClick={() => callBack(true)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Modal);

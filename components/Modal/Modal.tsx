"use client";

import css from "./Modal.module.css";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  function clickBackdrop(ev: React.MouseEvent) {
    if (ev.target != ev.currentTarget) {
      return;
    }
    onClose();
  }
  useEffect(() => {
    function closeModal(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeModal);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeModal);
      document.body.style.overflow = "";
    };
  }, [onClose, router]);

  return createPortal(
    <div
      onClick={clickBackdrop}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}

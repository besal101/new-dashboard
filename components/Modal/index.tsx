"use client";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { toggleModal } from "@/store/modalSlice";
import { CgClose } from "react-icons/cg";
import dynamic from "next/dynamic";

const AddCategoryModal = dynamic(() => import("./AddCategory"));
const GenerateReport = dynamic(() => import("./GenerateReport"));
const EditCategory = dynamic(() => import("./EditCategory"));
const UploadImage = dynamic(() => import("./UploadImage"));
const UploadVa = dynamic(() => import("./UploadVariation"));

interface ModalProps {}

const Modal: React.FC<ModalProps> = ({}) => {
  const showModal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(toggleModal({ show: false, modal: "" }));
  }, [dispatch]);

  return (
    <Transition appear show={showModal.show} as={Fragment}>
      <Dialog
        as="div"
        open={showModal.show}
        onClose={handleClose}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[black]/60" />
        </Transition.Child>
        <div className="fixed inset-0 z-[999] bg-[black]/60 overflow-auto">
          <div className="flex min-h-screen items-start justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="panel my-8 w-full max-w-7xl rounded-lg text-black dark:text-white-dark">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                  <h5 className="text-lg font-bold">
                    {showModal.modal === "addCategory" && "Add Category"}
                    {showModal.modal === "generateReport" && "Generate Report"}
                  </h5>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-white-dark hover:text-dark"
                  >
                    <CgClose className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5">
                  {showModal.modal === "addCategory" && <AddCategoryModal />}
                  {showModal.modal === "generateReport" && <GenerateReport />}
                  {showModal.modal === "editCategory" && (
                    <EditCategory categoryId={showModal.payload} />
                  )}
                  {showModal.modal === "uploadImage" && (
                    <UploadImage
                      folder="product"
                      mode={showModal.payload}
                      handleClose={handleClose}
                    />
                  )}
                  {showModal.modal === "uploadVariationImage" && (
                    <UploadVa
                      folder="product"
                      value={showModal.payload}
                      handleClose={handleClose}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

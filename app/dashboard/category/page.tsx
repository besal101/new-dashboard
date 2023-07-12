"use client";
import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleModal } from "@/store/modalSlice";
import { LuSearch } from "react-icons/lu";
import {
  useDeactiveCategory,
  useFetchAllCategory,
  useActivateCategory,
} from "@/query/category-queries";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Category } from "@/types";
import Image from "next/image";
import { TbPencil } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrNext, GrPrevious } from "react-icons/gr";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { FcCheckmark } from "react-icons/fc";

const AddCategory: NextPage = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleAddModal = useCallback(() => {
    dispatch(toggleModal({ show: true, modal: "addCategory" }));
  }, [dispatch]);

  const handleEditModal = useCallback((id: number) => {
    dispatch(
      toggleModal({ show: true, modal: "editCategory", payload: { id } })
    );
  }, []);

  const { data, isLoading } = useFetchAllCategory({
    limit: 10,
    page: currentPage,
  });

  const { mutate: deactiveCategory } = useDeactiveCategory();

  const { mutate: activateCategory } = useActivateCategory();

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      text: "Category once uploaded can't be deleted. It will only be deactived and will not be shown in the website.",
      showLoaderOnConfirm: true,
      customClass: "sweet-alerts",
      preConfirm: async () => {
        try {
          deactiveCategory(id);
          Swal.fire({
            icon: "success",
            title: "Category Deactived",
            customClass: "sweet-alerts",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Unable to delete Category",
            customClass: "sweet-alerts",
          });
        }
      },
    });
  };

  const handleActivate = (id: number) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      text: "Once Cateogry is activated it will be shown in the website.",
      showLoaderOnConfirm: true,
      customClass: "sweet-alerts",
      preConfirm: async () => {
        try {
          activateCategory(id);
          Swal.fire({
            icon: "success",
            title: "Category Activated Successfully",
            customClass: "sweet-alerts",
          });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Unable to get your public IP",
            customClass: "sweet-alerts",
          });
        }
      },
    });
  };

  const maxVisiblePages = 2;
  const middlePageIndex = Math.floor(maxVisiblePages / 2);

  let startPageIndex = currentPage - middlePageIndex;
  if (startPageIndex < 1) {
    startPageIndex = 1;
  }

  let endPageIndex = startPageIndex + maxVisiblePages - 1;
  if (data && data.totalPages) {
    if (endPageIndex > data?.totalPages || 1) {
      endPageIndex = data?.totalPages || 1;
      startPageIndex = Math.max(endPageIndex - maxVisiblePages + 1, 1);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">Categories</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddModal}
              >
                <AiOutlinePlus
                  className="ltr:mr-2 rtl:ml-2"
                  width="20"
                  height="20"
                />
                Add Category
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Category"
              className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]"
            >
              <LuSearch size="16" />
            </button>
          </div>
        </div>
      </div>
      <div className="panel mt-5 overflow-hidden border-0 p-0">
        <div className="table-responsive">
          <table className="table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Published</th>
                <th>Type</th>
                <th>Total Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr className="col-span-full">
                  <td colSpan={2}></td>
                  <td
                    colSpan={1}
                    className="flex justify-center items-center h-20"
                  >
                    <div className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10"></div>
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            ) : (
              <>
                <tbody>
                  {data?.categories?.map((cat: Category) => (
                    <React.Fragment key={cat.id}>
                      <tr>
                        <td>
                          <div className="flex w-max items-center">
                            <div className="w-max">
                              <Image
                                src={`https://cdn.lifesmile.ae/ls/category/${cat.image}`}
                                className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                alt="avatar"
                                width="32"
                                height="32"
                              />
                            </div>
                            <div>{cat.name}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            {cat.published ? (
                              <span className="badge bg-secondary">Active</span>
                            ) : (
                              <span className="badge bg-danger">InActive</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="badge badge-outline-secondary">
                              Parent Category
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="badge badge-outline-info">36</span>
                          </div>
                        </td>
                        <td>
                          <Tippy content="Edit">
                            <button
                              type="button"
                              onClick={(e) => handleEditModal(cat.id)}
                            >
                              <TbPencil className="w-5 h-5" />
                            </button>
                          </Tippy>
                          {cat.published ? (
                            <Tippy content="Delete">
                              <button
                                type="button"
                                onClick={(e) => handleDelete(cat.id)}
                                className="ml-3"
                              >
                                <RiDeleteBinLine className="w-5 h-5" />
                              </button>
                            </Tippy>
                          ) : (
                            <Tippy content="Activate">
                              <button
                                type="button"
                                onClick={(e) => handleActivate(cat.id)}
                                className="ml-3"
                              >
                                <FcCheckmark className="w-5 h-5" />
                              </button>
                            </Tippy>
                          )}
                        </td>
                      </tr>
                      {cat?.subcategories?.map((subCat: Category) => (
                        <tr key={subCat.id}>
                          <td>
                            <div className="flex w-max items-center">
                              <div className="w-max">
                                <img
                                  src={`https://cdn.lifesmile.ae/ls/category/${subCat.image}`}
                                  className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                  alt="avatar"
                                />
                              </div>
                              <div>{subCat.name}</div>
                            </div>
                          </td>
                          <td>
                            <div>
                              {subCat.published ? (
                                <span className="badge bg-secondary">
                                  Active
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  InActive
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <span className="badge badge-outline-warning">
                                Sub Category
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span className="badge badge-outline-info">
                                45
                              </span>
                            </div>
                          </td>
                          <td>
                            <Tippy content="Edit">
                              <button
                                type="button"
                                onClick={(e) => handleEditModal(subCat.id)}
                              >
                                <TbPencil className="w-5 h-5" />
                              </button>
                            </Tippy>
                            {subCat.published ? (
                              <Tippy content="Delete">
                                <button
                                  type="button"
                                  onClick={(e) => handleDelete(subCat.id)}
                                  className="ml-3"
                                >
                                  <RiDeleteBinLine className="w-5 h-5" />
                                </button>
                              </Tippy>
                            ) : (
                              <Tippy content="Delete">
                                <button
                                  type="button"
                                  onClick={(e) => handleDelete(subCat.id)}
                                  className="ml-3"
                                >
                                  <RiDeleteBinLine className="w-5 h-5" />
                                </button>
                              </Tippy>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </>
            )}
          </table>
          <ul className="mx-auto flex justify-end items-center pr-6 py-5 space-x-1">
            <li>
              <Button
                type="button"
                variant="button-rounded"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              >
                <GrPrevious className="h-3 w-3" />
              </Button>
            </li>
            {Array.from(
              { length: endPageIndex - startPageIndex + 1 },
              (_, i) => {
                const pageNumber = startPageIndex + i;
                return (
                  <li key={i}>
                    <Button
                      type="button"
                      variant={
                        currentPage === pageNumber
                          ? "button-rounded-active"
                          : "button-rounded"
                      }
                      onClick={() => {
                        setCurrentPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </Button>
                  </li>
                );
              }
            )}
            <li>
              <Button
                type="button"
                variant="button-rounded"
                disabled={currentPage >= (data?.totalPages || 1)}
                onClick={() => {
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, data?.totalPages || 1)
                  );
                }}
              >
                <GrNext className="h-3 w-3" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

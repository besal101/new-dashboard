"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface IProductPageProps {}

const ProductPage: React.FC<IProductPageProps> = (props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">Products</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push("/dashboard/products/add")}
              >
                <AiOutlinePlus
                  className="ltr:mr-2 rtl:ml-2"
                  width="20"
                  height="20"
                />
                Add product
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

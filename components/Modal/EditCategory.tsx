import { useAppDispatch } from "@/hooks/useRedux";
import {
  UploadCategoryType,
  useUpdateCategory,
  useUploadCategory,
} from "@/query/uploadCategory";
import { toggleModal } from "@/store/modalSlice";
import React, { use, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import slugify from "slugify";
import CustomSelect from "../Inputs/CustomSelect";
import ImageUpload from "../Inputs/Media/ImageUpload";
import Input from "../Inputs/input";
import Swal from "sweetalert2";
import Button from "../Button";
import {
  useFetchAllCategory,
  useGetSingleCategory,
} from "@/query/category-queries";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

interface IAddCategoryProps {
  categoryId?: any;
}

const AddCategory: React.FC<IAddCategoryProps> = ({ categoryId }) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(toggleModal({ show: false, modal: "" }));
  }, [dispatch]);

  const { isLoading: loading, data: category } = useFetchAllCategory({});

  const { data: categoryData, isLoading: loadingcategory } =
    useGetSingleCategory(categoryId.id);

  const options = category?.categories?.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }));

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [changeImage, setChangeImage] = useState<boolean>(false);

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  useEffect(() => {
    // Check if categoryData is available and set the default value for 'name'
    if (categoryData && categoryData.category) {
      setValue("name", categoryData.category.name);
      setValue("arName", categoryData.category.arName);
      setValue("description", categoryData.category.description);
      setValue("title", categoryData.category.title);
      setValue("image", categoryData.category.image);
    }
  }, [categoryData, setValue]);

  const {
    mutate: uploadCategory,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateCategory();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (changeImage) {
      data.image = uploadedImage;
    } else {
      data.image = categoryData?.category?.image;
    }

    const slug = slugify(data.name, { lower: true });
    const formData: UploadCategoryType = {
      ...data,
      id: categoryId.id,
      name: data.name,
      parentCategory: data.parentCategory || undefined,
      image: data.image,
      slug: slug,
      published: true,
    };
    uploadCategory(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        text: "Category uploaded successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleClose();
      setUploadedImage(null);
    }

    if (isError) {
      Swal.fire({
        title: "Error",
        text: "Error uploading category",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }, [isSuccess, isError, handleClose]);

  return (
    <div className="p-5">
      {loadingcategory ? (
        <div className="flex items-center justify-center">
          <span className="w-4 h-4 m-auto mb-10">
            <span className="animate-ping inline-flex h-full w-full rounded-full bg-primary"></span>
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5">
            <div className="mb-5">
              <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="text"
                required
              />
            </div>
            <div className="mb-5">
              <Input
                id="arName"
                label="Arabic Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="text"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="number">Parent Category</label>
              {loading === true ? (
                <p>Loading...</p>
              ) : (
                <CustomSelect
                  control={control}
                  name="parentCategory"
                  options={options || []}
                  defaultValue={
                    categoryData?.category?.parentCategoryId || undefined
                  }
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="mb-5 col-span-2">
              <label htmlFor="address">Image Upload</label>
              {changeImage ? (
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  folder="category"
                />
              ) : (
                <div className="w-full h-36 border border-dashed border-gray-400 flex items-center justify-center relative">
                  <Image
                    src={`https://cdn.lifesmile.ae/ls/category/${categoryData?.category?.image}`}
                    alt="Uploaded"
                    height={144}
                    width={144}
                    style={{ filter: "brightness(0.96)" }}
                  />
                  <div
                    className="absolute top-1 right-1"
                    role="button"
                    onClick={(e) => setChangeImage(!changeImage)}
                  >
                    <div className="flex flex-row gap-1 justify-center items-center bg-secondary rounded-md px-2 py-1 text-white cursor-pointer text-xs">
                      <RxCross2 className="w-4 h-4" />
                      <h6>Change</h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <Input
              id="title"
              label="Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="text"
            />
            <span className="text-sm text-pink-500">
              (Not required if it is sub category)
            </span>
          </div>

          <div className="mb-5">
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="text"
            />
            <span className="text-sm text-pink-500">
              (Not required if it is sub category)
            </span>
          </div>
          <div className="mt-8 flex flex-row gap-4 items-center justify-end">
            <button
              onClick={handleClose}
              type="button"
              className="btn btn-outline-danger"
            >
              Discard
            </button>
            <Button variant="primary" type="submit" loading={isLoading}>
              Save Category
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddCategory;

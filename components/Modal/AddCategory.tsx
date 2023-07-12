import { useAppDispatch } from "@/hooks/useRedux";
import { UploadCategoryType, useUploadCategory } from "@/query/uploadCategory";
import { toggleModal } from "@/store/modalSlice";
import React, { use, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import slugify from "slugify";
import CustomSelect from "../Inputs/CustomSelect";
import ImageUpload from "../Inputs/Media/ImageUpload";
import Input from "../Inputs/input";
import Swal from "sweetalert2";
import Button from "../Button";
import { useFetchAllCategory } from "@/query/category-queries";

interface IAddCategoryProps {}

const AddCategory: React.FC<IAddCategoryProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(toggleModal({ show: false, modal: "" }));
  }, [dispatch]);

  const { isLoading: loading, data: category } = useFetchAllCategory({});

  const options = category?.categories?.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }));

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (image: string | null) => {
    setUploadedImage(image);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      arName: "",
      parentCategory: null,
      description: "",
    },
  });

  const {
    mutate: uploadCategory,
    isLoading,
    isSuccess,
    isError,
  } = useUploadCategory();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const slug = slugify(data.name, { lower: true });
    const categoryData: UploadCategoryType = {
      ...data,
      name: data.name,
      parentCategory: data.parentCategory || undefined,
      image: uploadedImage,
      slug: slug,
      published: true,
    };
    uploadCategory(categoryData);
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
              required
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
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="mb-5 col-span-2">
            <label htmlFor="address">Image Upload</label>
            <ImageUpload onImageUpload={handleImageUpload} folder="category" />
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
    </div>
  );
};

export default AddCategory;

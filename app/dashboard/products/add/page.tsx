"use client";
import DraggableImage from "@/components/DraggableImage";
import Input from "@/components/Inputs/input";
import SpecificationForm, {
  SpecificationType,
} from "@/features/Forms/Specification";
import WeightsForm, { WeightsType } from "@/features/Forms/WeightsDimenstion";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useFetchAllCategory } from "@/query/category-queries";
import { useUploadProduct } from "@/query/product-queries";
import { toggleModal } from "@/store/modalSlice";
import { Product, VariationType } from "@/types";
import { ROUTE } from "@/utils/routes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { IoSaveOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { setMedia } from "@/features/MediaManage/UploadMedia";
import MultipleInput from "@/components/Inputs/MultipleInput";
const SizeVariation = dynamic(() => import("@/components/Product/Size"));
const MultiVariation = dynamic(() => import("@/components/Product/Multi"));
const ColorVariation = dynamic(() => import("@/components/Product/Color"));

const AddProduct: NextPage = (props) => {
  const [variationType, setVariationType] = useState<VariationType | "">("");
  const { images, image } = useAppSelector((state) => state.media);
  const [draggedImages, setDraggedImages] = useState<string[] | undefined>(
    images
  );

  const [colorVariation, setColorVariation] = useState<boolean>(false);
  const [sizeVariation, setSizeVariation] = useState<boolean>(false);
  const [multiVariation, setMultiVariation] = useState<boolean>(false);
  const [VariationValue, setVariationValue] = useState<any>([]);
  const [loadingAnalyzer, setLoadingAnalyzer] = useState<boolean>(false);
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const handleColorVariation = (value: any) => {
    setLoadingAnalyzer(true);
    setColorVariation(true);
    setVariationValue(value);
    const lowestPrice = Math.min(
      ...value.map((curr: any) => parseFloat(curr.price))
    );
    setValue("price", lowestPrice);
    const highestQuantity = Math.max(
      ...value.map((curr: any) => parseFloat(curr.quantity))
    );
    setValue("quantity", highestQuantity);

    dispatch(setMedia({ image: value[0].images[0] || null }));
    const excludedFirst = value.slice(1);
    const firstImages = excludedFirst.map((item: any) => item.images[0]);
    dispatch(setMedia({ images: firstImages }));
    setLoadingAnalyzer(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSizeVariation = (value: any) => {
    setLoadingAnalyzer(true);
    setSizeVariation(true);
    setVariationValue(value);
    const lowestPrice = Math.min(
      ...value.map((curr: any) => parseFloat(curr.price))
    );
    setValue("price", lowestPrice);
    const highestQuantity = Math.max(
      ...value.map((curr: any) => parseFloat(curr.quantity))
    );
    setValue("quantity", highestQuantity);
    setLoadingAnalyzer(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMultiVariation = (value: any) => {
    setLoadingAnalyzer(true);
    setMultiVariation(true);
    setVariationValue(value);
    const lowestPrice = value.reduce((min: number, Item: any) => {
      const productMinPrice = Item.size.reduce(
        (minSize: number, size: any) => Math.min(minSize, Number(size.price)),
        Number.MAX_VALUE
      );
      return Math.min(min, productMinPrice);
    }, Number.MAX_VALUE);
    setValue("price", lowestPrice);

    const highestQuantity = value.reduce((max: number, Item: any) => {
      const productMaxStock = Item.size.reduce(
        (maxSize: number, size: any) => Math.max(maxSize, Number(size.stock)),
        Number.MIN_VALUE
      );
      return Math.max(max, productMaxStock);
    }, Number.MIN_VALUE);
    setValue("quantity", highestQuantity);
    dispatch(setMedia({ image: value[0].colorImage || null }));
    const imagesArray = value.map((item: any) => item.colorImage).slice(1);
    dispatch(setMedia({ images: imagesArray }));
    setLoadingAnalyzer(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeywordsSubmit = (keywords: string) => {
    setValue("metaKeywords", JSON.stringify(keywords));
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const newImages = Array.from(draggedImages as any);
    const draggedImage = newImages[dragIndex];

    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);

    setDraggedImages(newImages as any);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    setDraggedImages(images);
  }, [images]);

  const badgeList = [
    { sale: "Sale" },
    { new: "New" },
    { "best-seller": "Best Seller" },
    { "limited-edition": "Limited Edition" },
    { featured: "Featured" },
    { clearance: "Clearance" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    trigger,
  } = useForm<FieldValues>();

  useEffect(() => {
    register("shortDesc", { required: true, minLength: 11 });
    register("longDesc", { required: true, minLength: 20 });
    register("specifications", { required: "Specification is required." });
    register("weightDimension", {
      required: "Weights are required.",
    });
    register("badge", { required: "Select atleast one badge." });
    register("categoryId", { required: "You forgot to select category." });
    register("variationType", { required: "Select atleast one variation." });
  }, [register]);

  const onShortContentChange = (shortContent: string) => {
    setValue("shortDesc", shortContent);
    trigger("shortDesc");
  };

  const onLongContentChange = (longContent: string) => {
    setValue("longDesc", longContent);
    trigger("longDesc");
  };

  const { data, isLoading: LoadingCat } = useFetchAllCategory({});

  const categories = data?.categories;

  const {
    mutate: uploadProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useUploadProduct();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        text: "Product uploaded successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(setMedia({ images: [], image: null }));
      reset();

      setVariationType("");
      setColorVariation(false);
      setSizeVariation(false);
      setVariationValue([]);
    }

    if (isError) {
      Swal.fire({
        title: "Error",
        text: "Error uploading category",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }, [isSuccess, isError]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const product = data;
    product.images = [image, ...(draggedImages ?? [])];
    product.variationType = variationType;
    let variation = [];
    if (variationType === "variationbycolor") {
      if (colorVariation) {
        variation = [...VariationValue];
        product.variation = variation;
      } else {
        Swal.fire({
          title: "Error",
          text: "Please Click Analyze Variation Button",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }
    if (variationType === "variationbysize") {
      if (sizeVariation) {
        variation = [...VariationValue];
        product.variation = variation;
      } else {
        Swal.fire({
          title: "Error",
          text: "Please Click Analyze Variation Button",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }
    if (variationType === "variationbymulti") {
      if (multiVariation) {
        variation = [...VariationValue];
        product.variation = variation;
      } else {
        Swal.fire({
          title: "Error",
          text: "Please Click Analyze Variation Button",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }
    uploadProduct(product as Product);
  };

  const handleSpecificationsChange = (specifications: SpecificationType[]) => {
    setValue("specifications", specifications);
    trigger("specifications");
  };

  const handleWeightsChange = (weights: WeightsType[]) => {
    setValue("weightDimension", weights);
    trigger("weightDimension");
  };

  const handleBadge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue("badge", selectedValue);
    trigger("badge");
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue("categoryId", selectedValue);
    trigger("categoryId");
  };

  const handleVariationTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setVariationType(selectedValue as VariationType);
    setValue("variationType", selectedValue);
    trigger("variationType");

    if (selectedValue === "single") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSingleImageUpload = useCallback(() => {
    dispatch(
      toggleModal({ show: true, modal: "uploadImage", payload: "single" })
    );
  }, [dispatch]);

  const handleMultiImageUpload = useCallback(() => {
    dispatch(
      toggleModal({ show: true, modal: "uploadImage", payload: "multi" })
    );
  }, [dispatch]);

  const shortContent = watch("shortDesc");
  const longContent = watch("longDesc");

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2.5 xl:flex-row">
        <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
          <div className="mt-4 px-4">
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="mb-6 w-full lg:mr-6">
                <div className="mt-4 flex items-center">
                  <Input
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    type="text"
                    required
                    className="form-input flex-1"
                  />
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-full">
                    <label className="form-label" htmlFor="shortDesc">
                      Features
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={shortContent}
                      onChange={onShortContentChange}
                      style={{ height: "200px", borderRadius: "50px" }}
                    />
                    <p className="text-red-500 ml-4">
                      {errors.shortDesc && "Features is required"}
                    </p>
                  </div>
                </div>

                <div className="mt-16 flex items-center">
                  <div className="w-full">
                    <label className="form-label" htmlFor="shortDesc">
                      Long Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={longContent}
                      onChange={onLongContentChange}
                      style={{ height: "200px" }}
                    />
                    <p className="text-red-500 ml-4">
                      {errors.longDesc && "Long Description is required"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-16 border-white-light dark:border-[#1b2e4b]" />
          <div className="mt-8 px-4">
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="mb-6 w-full lg:w-1/3 ltr:lg:mr-6 rtl:lg:ml-6">
                <div className="text-lg">Weight & Dimension</div>
                <div className="mt-4">
                  <WeightsForm onWeightssChange={handleWeightsChange} />
                </div>
                <p className="text-red-500 ml-4">
                  {errors.weightDimension &&
                    (errors.weightDimension.message as string)}
                </p>
              </div>
              <div className="w-full lg:w-2/3">
                <div className="text-lg">Specification:</div>
                <div className="mt-4">
                  <SpecificationForm
                    onSpecificationsChange={handleSpecificationsChange}
                  />
                </div>
                <p className="text-red-500 ml-4">
                  {errors.specifications &&
                    (errors.specifications.message as string)}
                </p>
              </div>
            </div>
          </div>
          <hr className="mt-16 border-white-light dark:border-[#1b2e4b]" />
          <div className="mt-8 px-4">
            <div className="mt-4 flex items-center">
              <label
                htmlFor="variationType"
                className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
              >
                Variation Type
              </label>
              <select
                id="variationType"
                name="variationType"
                className="form-select flex-1"
                onChange={(e) => handleVariationTypeChange(e)}
              >
                <option value="">Choose Variation Type</option>
                <option value="single">Single</option>
                <option value="variationbycolor">Variation By Color</option>
                <option value="variationbysize">Variation By Size</option>
                <option value="variationbymulti">
                  Variation By Size & Color
                </option>
              </select>
            </div>
            <p className="text-red-500 ml-4">
              {errors.variationType && (errors.variationType.message as string)}
            </p>
          </div>

          {variationType === "variationbycolor" && (
            <div className="mt-8 px-4">
              <ColorVariation
                onAnalyze={handleColorVariation}
                loadingAnalyzer={loadingAnalyzer}
              />
            </div>
          )}

          {variationType === "variationbysize" && (
            <div className="mt-8 px-4">
              <SizeVariation
                loadingAnalyzer={loadingAnalyzer}
                onAnalyze={handleSizeVariation}
              />
            </div>
          )}

          {variationType === "variationbymulti" && (
            <div className="mt-8 px-4">
              <MultiVariation
                loadingAnalyzer={loadingAnalyzer}
                onAnalyze={handleMultiVariation}
              />
            </div>
          )}
        </div>
        <div className="mt-6 w-full xl:mt-0 xl:w-96">
          <div className="panel mb-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
              <button type="submit" className="btn btn-success w-full gap-2">
                {isLoading ? (
                  <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />
                ) : (
                  <IoSaveOutline className="h-5 w-5" />
                )}
                Publish
              </button>

              <button type="button" className="btn btn-info w-full gap-2">
                <HiOutlineFolderDownload className="h-5 w-5" />
                Save Draft
              </button>

              <Link
                href="/apps/invoice/preview"
                className="btn btn-primary w-full gap-2"
              >
                <AiOutlineEye className="h-5 w-5" />
                Preview
              </Link>
            </div>
          </div>
          <div className="panel mb-5">
            <label htmlFor="badge">Badge</label>
            <select
              id="badge"
              name="badge"
              className="form-select"
              onChange={(e) => handleBadge(e)}
            >
              <option value="">Select</option>
              {badgeList.map((item, i) => (
                <option key={i} value={Object.keys(item)[0]}>
                  {Object.values(item)[0]}
                </option>
              ))}
            </select>

            <p className="text-red-500 ml-4">
              {errors.badge && (errors.badge.message as string)}
            </p>
            <div className="mt-4">
              <label htmlFor="categories">Categories</label>
              {LoadingCat ? (
                <p>Loading...</p>
              ) : (
                <select
                  id="categories"
                  name="categories"
                  className="form-select"
                  onChange={(e) => handleCategory(e)}
                >
                  {categories?.map((cat) => (
                    <optgroup key={cat.name} label={cat.name}>
                      {cat?.subcategories?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              )}
            </div>
            <p className="text-red-500 ml-4">
              {errors.categoryId && (errors.categoryId.message as string)}
            </p>
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    id="price"
                    label="Price (AED)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    type="number"
                    required
                    className="form-input flex-1"
                  />
                </div>
                <div>
                  <Input
                    id="discountPrice"
                    label="Discount(%)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    type="number"
                    className="form-input flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <Input
                  id="quantity"
                  label="Quantity(PCS)"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  type="number"
                  required
                  className="form-input flex-1"
                />
              </div>
            </div>
            <div className="mt-4">
              <div>
                <Input
                  id="itemSeries"
                  label="Item Series"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  type="string"
                  required
                  className="form-input flex-1"
                />
              </div>
            </div>
            {variationType === "single" && (
              <div className="mt-4">
                <Input
                  id="itemCode"
                  label="ItemCode"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  type="text"
                  required
                  className="form-input flex-1"
                />
              </div>
            )}
          </div>
          <div className="panel mb-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
              <div>
                <label htmlFor="mainimage">Main Image</label>
                <div
                  className="w-full h-36 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
                  id="mainimage"
                  role="button"
                  onClick={handleSingleImageUpload}
                >
                  {image === null ? (
                    <span>Click to upload main Image</span>
                  ) : (
                    <Image
                      src={`${ROUTE.IMAGE_CDN}/product/${image}`}
                      alt="main image"
                      width={120}
                      height={120}
                      style={{
                        filter: "brightness(0.96)",
                      }}
                    />
                  )}
                </div>
              </div>

              <div>
                <DndProvider backend={HTML5Backend}>
                  <label htmlFor="previewimage">Preview Image</label>
                  <div
                    className="w-full h-auto min-h-[200px] py-3 border border-dashed border-gray-400 items-center justify-center cursor-pointer flex flex-row flex-wrap gap-2"
                    id="previewimage"
                    role="button"
                    onClick={handleMultiImageUpload}
                  >
                    {draggedImages && draggedImages.length > 0 ? (
                      draggedImages.map((item, i) => (
                        <div className="" key={i}>
                          <DraggableImage
                            src={`${ROUTE.IMAGE_CDN}/product/${item}`}
                            alt="main image"
                            imageIndex={i}
                            moveImage={moveImage}
                          />
                        </div>
                      ))
                    ) : (
                      <span>Click to upload main Image</span>
                    )}
                  </div>
                </DndProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel mt-5 overflow-hidden border-0 p-0">
        <div className="flex-1 px-4 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
          <div className="mt-4 flex items-center">
            <Input
              id="metaTitle"
              label="Meta Title"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="text"
              required
              className="form-input flex-1"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label
              className="form-label flex justify-start"
              htmlFor="shortDesc"
            >
              Meta keyword
            </label>
            <MultipleInput
              handleKeywordsSubmit={handleKeywordsSubmit}
              placeholder="Hit enter to add more keywords"
            />
          </div>
          <div className="mt-4 flex items-center">
            <Input
              id="metaDescription"
              label="Meta Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="text"
              required
              className="form-input flex-1"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;

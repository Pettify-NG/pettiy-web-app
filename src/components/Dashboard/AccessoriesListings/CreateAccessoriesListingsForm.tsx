"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import { FaX } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Image from "next/image";

import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import { IoIosArrowDown } from "react-icons/io";

interface ProductImage {
  image: File
}

function CustomError({ error }: { error?: string }) {
  if (!error) return;

  return (
    <div className='text-xs font-light ml-1 p-2 absolute -bottom-6'>
      <span className='text-red-600'>
        {error === "Category must be greater than or equal to 1" ? "Category field is required!": error}
      </span>
    </div>
  );
}

const accessoryCategories = ["Feed", "Toy", "Gadgets", "Wearables", "Grooming/Care", "Others"];

const CreateAccessoriesListingForm = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const formik = useFormik({
    initialValues: {
      description: "",
      category: "",
      price: "",
      stock: 0,
      weight: 0,
    },
    validationSchema: Yup.object({
      description: Yup.string().required().label("Description"),
      category: Yup.string().required().label("Category"),
      price: Yup.string().required().label("Price"),
      stock: Yup.number().min(1).required().label("Number in stock"),
      weight: Yup.number().min(1).required().label("Product Weight"),
    }),
    onSubmit: async (values) => {

    },
    validateOnChange: true,
  });

  const removeImage = (index: number) => {
    const updatedImages = productImages.filter((img, i) => i !== index);
    setProductImages(updatedImages);
  };

  const addNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imagesCopy: ProductImage[] = [...productImages];

    if (e.target.files) {
      const fileSizeInBytes = e.target.files[0].size;
      const fileType = e.target.files[0].type;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        toast.error('File type is not supported!');
        return;
      }

      if (fileSizeInMB >= 1) {
        toast.error('File size too large');
        return;
      }

      imagesCopy.push({ image: e.target.files[0] });
    }
    setProductImages(imagesCopy);
  };

  return (
    <form
      className='grid grid-cols-1 lg:grid-cols-6 gap-6'
      onSubmit={formik.handleSubmit}
    >
      {/* Column 1 */}
      <div className='lg:col-span-3'>
        {/* General Information */}
        <div className='p-4'>
          <p className='text-lg font-semibold text-gray-700 mb-2'>
            Accessory Information
          </p>
          <p className='text-xs mb-8'>
            Please ensure you enter the correct product information.
          </p>

          {/* Category */}

          <div className='my-6 relative'>
            <label
                htmlFor='category'
                className='text-sm text-neutral mb-2 block'
            >
                Accessory Category
            </label>

            <select
                name='category'
                id='category'
                className='text-black bg-[#F0F1F3] font-medium'
                onChange={formik.handleChange}
                value={formik.values.category}
            >
                <option value='' defaultChecked disabled>
                    e.g Select a category,
                </option>

                {
                  accessoryCategories.map((category, index) => 
                    <option value={category} key={index}>
                        {category}
                    </option>
                  )
                }
            </select>
            <IoIosArrowDown className={`absolute right-4 ${formik.errors.category ? "top-10" : "bottom-4"}`} />
            <CustomError error={formik.errors.category} />
          </div>

          {/* Product Description */}

          <div className='mb-6'>
            <label
              htmlFor='description'
              className='text-sm text-neutral mb-2 block'
            >
              Product Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder='Type product description here...'
              onChange={formik.handleChange}
              value={formik.values.description}
              className='bg-[#F0F1F3] text-black font-medium'
            ></textarea>

            <CustomError error={formik.errors.description} />
          </div>

          {/* Image(s) */}

          <div className='mb-6'>
            <p className='text-neutral mb-2 text-sm'>Cover Image</p>
            <div className='p-8 bg-[#F0F1F3] flex items-center justify-center flex-col border border-black'>
              <input
                type='file'
                accept='.jpg,.png,.jpeg'
                id='image'
                className='pointer-events-none opacity-0'
                ref={imageInputRef}
                onChange={addNewImage}
              />
              {productImages.length < 1 && <p>Click below to upload an image. Your image should not exceed 1MB and should be either a .jpeg or .png</p>}
              <div className='flex items-center flex-wrap gap-2 mb-4'>
                {productImages &&
                  productImages.map((img, index) => (
                    <div
                      key={`${index}-${img.image.name}`}
                      className='h-28 w-28 relative rounded-xl'
                    >
                      <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                        {index + 1}
                      </span>

                      <Image
                        src={URL.createObjectURL(img.image)}
                        alt={img.image.name}
                        width={100}
                        height={100}
                        className='rounded-lg w-full h-full object-cover'
                      />
                      <button
                        className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                        onClick={() => removeImage(index)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                  ))}
              </div>
              <Button
                size='small'
                onClick={() => imageInputRef.current?.click()}
              >
                Add Image
              </Button>
            </div>
          </div>

          {/* Product Weight */}

          <div className='mb-6'>
            <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
              Product Weight
            </label>
            <TextInput
              placeholder='Enter price...'
              id='price'
              onChange={formik.handleChange}
              value={formik.values.weight}
              error={formik.errors.weight}
            />
          </div>

          {/* Price */}

          <div className='mb-6'>
              <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                Price (Naira)
              </label>
              <TextInput
                placeholder='Enter price...'
                id='price'
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.errors.price}
              />
          </div>

          {/* No. Of Stock */}

          <div className='mb-6'>
            <label htmlFor='stock' className='text-sm text-neutral mb-2 block'>
              No, Of Stock
            </label>
            <TextInput
              placeholder='How many do you have in stock? e.g 5'
              id='stock'
              onChange={formik.handleChange}
              value={formik.values.stock}
              error={formik.errors.stock}
            />
          </div>

        </div>
      </div>

      <div className='fixed right-0 bottom-0 w-full p-4 bg-white flex items-center justify-end'>

          <div className='flex items-center gap-4'>
              <Link href='/dashoard/accessories'>
                <Button variant='outlined' color='dark'>
                  <FaX />
                  Cancel
                </Button>
              </Link>

              <div className='max-w-md w-full'>
                <Button type='submit' block loading={formik.isSubmitting}>
                  Add Listing
                </Button>
              </div>
          </div>
      
      </div>
    </form>
  )
}

export default CreateAccessoriesListingForm;
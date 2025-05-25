"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import { FaX } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import IAccessory from "@/interfaces/accessory";
import nigeriaLocations from "@/data/lgas.json";

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

const EditAccessoryForm = ({ accessory }: { accessory: IAccessory | undefined }) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(accessory!.accessoryImages);

  const router = useRouter();

  // JWT Token gotten from the backend. Not yet implemented from the backend.
  const cookies = new Cookies();
  const token = cookies.get('pettify-token');

  const httpService = new HTTPService();

  const formik = useFormik({
    initialValues: {
      name: accessory?.name ?? "",
      description: accessory?.description ?? " ",
      category: accessory?.category ?? " ",
      price: accessory?.price ?? undefined,
      stock: accessory?.quantity ?? undefined,
      state: accessory?.location?.state ?? "",
      lga: accessory?.location.lga ?? "",
      address: accessory?.location?.address ?? ""
      // weight: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().label("Name"),
      description: Yup.string().required().label("Description"),
      category: Yup.string().required().label("Category"),
      price: Yup.string().required().label("Price"),
      stock: Yup.number().min(1).required().label("Number in stock"),
      state: Yup.string().required().label("State"),
      lga: Yup.string().required().label("LGA"),
      address: Yup.string().required().label("Address"),
      // weight: Yup.number().min(1).required().label("Product Weight"),
    }),
    onSubmit: async (values) => {
      if (productImages.length < 1) {
        toast.error('Please add product images or variations.');
      } else {
        try {
          const promises: Promise<Response>[] = [];

          productImages.forEach((image: ProductImage) => {
            const formdata = new FormData();
            formdata.append('file', image.image);

            const requestOptions = {
              method: 'POST',
              body: formdata,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            promises.push(
              fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
                requestOptions
              )
            );
          });

          const product_images = await Promise.all(promises)
            .then((responses) => {
              const responseData = responses.map(async (response, index) => {
                const fileRes = await response.json();

                return fileRes.data.url;
              });

              return Promise.all(responseData);
            })
            .catch((error) => {
              console.log(error);
            });

          if ((product_images && product_images.length > 0) || (existingImages && existingImages.length > 0)) {
            const data = {
              name: values.name,
              description: values.description,
              category: values.category,
              accessoryImages: [...product_images!, ...existingImages],
              quantity: values.stock,
              price: values.price,
              location: {
                state: values.state,
                lga: values.lga,
                address: values.address
              }
              // weight: values.weight
            };

            console.log('Request Body: ', data);

            httpService
              .patch(
                `${ENDPOINTS.ACCESSORY}/${accessory?._id}`, 
                data, 
                `Bearer ${token}`
              )
              .then((apiRes) => {
                console.log('Response: ', apiRes);

                if (apiRes.data) {
                  formik.resetForm();

                  toast.success('Accessory listing updated.');
                  console.log(apiRes);

                  setTimeout(() => {
                    router.push('/dashboard/accessories');
                  }, 1000);
                }
              });
          } else console.log('Images not provided.');
        } catch (error: any) {
          console.log(error);
          toast.error(error.message);
        }
      }
    },
    validateOnChange: true,
  });

  const removeAlreadyUploadedImage = (image: string) => {
    const updatedImages = accessory?.accessoryImages.filter(img => img !== image);
    setExistingImages(updatedImages!);
  }

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

          {/* Name */}

          <div className='mb-6'>
            <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
              Name
            </label>
            <TextInput
              placeholder='Enter name...'
              id='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
          </div>

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

                                      {accessory && accessory.accessoryImages.length > 0 &&
                                          existingImages?.map((img, index) => (
                                          <div
                                              key={index}
                                              className='h-28 w-28 relative rounded-xl'
                                          >
                                          <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                                              {index + 1}
                                          </span>
                  
                                          <Image
                                              src={img}
                                              alt={"Image"}
                                              width={100}
                                              height={100}
                                              className='rounded-lg w-full h-full object-cover'
                                          />
                                          <button
                                              className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                                              onClick={() => removeAlreadyUploadedImage(img)}
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

          {/* <div className='mb-6'>
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
          </div> */}

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
              Quantity
            </label>
            <TextInput
              placeholder='How many do you have in stock? e.g 5'
              id='stock'
              onChange={formik.handleChange}
              value={formik.values.stock}
              error={formik.errors.stock}
            />
          </div>

                    {/* Location */}
          
                    <label htmlFor='name' className='text-lg text-neutral mb-2 block'>
                      Location
                    </label>
          
                    <div className="my-6 w-full">
                      <div className="flex mb-6 items-center gap-3 w-full">
                          {/* State */}
          
                          <div className='relative w-full'>
                            <label
                                htmlFor='state'
                                className='text-sm text-neutral mb-2 block'
                            >
                                State
                            </label>
          
                            <select
                                name='state'
                                id='state'
                                className='text-black bg-[#F0F1F3] font-medium'
                                onChange={formik.handleChange}
                                value={formik.values.state}
                            >
                                <option value="" defaultChecked disabled>-- Select a State --</option>
                                {Object.keys(nigeriaLocations).map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                            </select>
                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.state ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.state} />
                          </div>
          
                          {/* LGA */}
                
                          <div className='relative w-full'>
                            <label
                                htmlFor='lga'
                                className='text-sm text-neutral mb-2 block'
                            >
                                LGA
                            </label>
          
                            <select
                                name='lga'
                                id='lga'
                                className='text-black bg-[#F0F1F3] font-medium'
                                onChange={formik.handleChange}
                                value={formik.values.lga}
                                disabled={!formik.values.state}
                            >
                                <option value="" defaultChecked disabled>-- Select a LGA --</option>
                                {(nigeriaLocations[formik.values.state as keyof typeof nigeriaLocations] || []).map((state: string, index: number) => (
                                  <option key={index} value={state}>
                                    {state}
                                  </option>
                                ))}
                            </select>
                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.lga ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.lga} />
                          </div>
                      </div>
          
                      {/* Address */}
          
                      <div className='mb-6'>
                          <label htmlFor='address' className='text-sm text-neutral mb-2 block'>
                            Address
                          </label>
                          <TextInput
                            placeholder='Enter address...'
                            id='address'
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            error={formik.errors.address}
                          />
                      </div>
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
                <Button type='submit' disabled={formik.isSubmitting} block loading={formik.isSubmitting}>
                  Add Listing
                </Button>
              </div>
          </div>
      
      </div>
    </form>
  )
}

export default EditAccessoryForm;
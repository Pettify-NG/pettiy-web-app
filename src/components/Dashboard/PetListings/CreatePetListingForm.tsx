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

import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import { TfiSave } from "react-icons/tfi";
import { Calendar } from "primereact/calendar";
import { FiCalendar } from "react-icons/fi";

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

const CreatePetListingForm = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const vaccineImageRef = useRef<HTMLInputElement | null>(null);

  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  // const [vaccineCardImage, setVaccineCardImage] = useState<File | null>(null);
  const [vaccineCardImage, setVaccineCardImage] = useState<ProductImage>();

  // JWT Token gotten from the backend. Not yet implemented from the backend.
  const cookies = new Cookies();
  const token = cookies.get('pettify-token');

  const pettify_details = localStorage.getItem("pettify-details");
  const seller_info = JSON.parse(pettify_details ?? "").user;

  // console.log(pettify_details);
  // console.log(seller_info);

  const httpService = new HTTPService();

  const formik = useFormik({
    initialValues: {
      petBreed: "",
      description: "",
      category: "",
      price: "",
      stock: undefined,
      petColor: "",
      gender: "",
      location: "",
      vaccinationStatus: "",
      dateOfBirth: "",
    },
    validationSchema: Yup.object({
      petBreed: Yup.string().required().label("Pet Breed"),
      description: Yup.string().required().label("Description"),
      category: Yup.string().required().label("Category"),
      price: Yup.string().required().label("Price"),
      stock: Yup.number().min(1).required().label("Number in stock"),
      petColor: Yup.string().required().label("Pet color"),
      gender: Yup.string().required().label("Gender"),
      location: Yup.string().required().label("Location"),
      vaccinationStatus: Yup.boolean().required().label("Vaccination Status"),
      dateOfBirth: Yup.string().required().label("Date of Birth"),
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


          let vaccineCardUrl: string = "";
          if(vaccineCardImage) {
            const formdata = new FormData();
            formdata.append('file', vaccineCardImage?.image);

            const requestOptions = {
              method: 'POST',
              body: formdata,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
              requestOptions
            );

            const data = await response.json();
            vaccineCardUrl = data.url;
            console.log(data);
          }

          if (product_images && product_images.length > 0) {
            const data = {
              description: values.description,
              gender: values.gender,
              vaccine_status: values.vaccinationStatus,
              breed: values.petBreed,
              category: values.category,
              pet_images: product_images,
              vaccine_status_image: vaccineCardUrl,
              quantity: values.stock,
              date_of_birth: values.dateOfBirth,
              color: values.petColor,
              price: values.price,
              location: values.location,
              // owner: "667950aa0c0c062e46a02011",
              owner: seller_info._id ?? "",
            };

            console.log('Request Body: ', data);

            httpService
              .post(
                ENDPOINTS.CREATE_LISTING, 
                data, 
                `Bearer ${token}`
              )
              .then((apiRes) => {
                console.log('Response: ', apiRes);

                if (apiRes.data) {
                  formik.resetForm();

                  toast.success('Pet listing added successfully.');
                  console.log(apiRes);

                  // setTimeout(() => {
                  //   router.push('/dashboard/pet-listings');
                  // }, 1000);
                }
              });
          } else console.log('Products array not provided');
        } catch (error: any) {
          console.log(error);
          toast.error(error.message);
        }
      }
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

  const addNewVaccineCardImage = (e: ChangeEvent<HTMLInputElement>) => {
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

      setVaccineCardImage({ image: e.target.files[0] });
    }
  };

  const removeVaccineCardImage = () => {
    setVaccineCardImage({} as ProductImage);
  };

  return (
    <>
      <div className="mb-8">
        <p className='text-lg font-semibold text-gray-700 mb-2'>
          Pet Information
        </p>

        <p className='text-xs'>
          Please ensure you enter the correct pet/product information.
        </p>
      </div>

      <form
        className='grid grid-cols-1 lg:grid-cols-6 lg:gap-6'
        onSubmit={formik.handleSubmit}
      >
        {/* Column 1 */}
        <div className='lg:col-span-3 p-4'>
          {/* General Information */}
            {/* Category */}

            <div className='mb-6 relative'>
              <label
                  htmlFor='category'
                  className='text-sm text-neutral mb-2 block'
              >
                  Category
              </label>

              <select
                  name='category'
                  id='category'
                  className='text-black bg-[#F0F1F3] font-medium'
                  onChange={formik.handleChange}
                  value={formik.values.category}
              >
                  <option value='' className="text-gray-500" defaultChecked disabled>
                      e.g Dog
                  </option>
                  <option value="Cat">
                      Cat
                  </option>
                  <option value="Dog">
                      Dog
                  </option>
              </select>
              {/* <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} /> */}
              {/* <CustomError error={formik.errors.categoryId} /> */}
            </div>

            {/* Pet Breed */}

            <div className='mb-6'>
              <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                Enter Pet Breed
              </label>
              <TextInput
                placeholder='Enter pet breed...'
                id='petBreed'
                onChange={formik.handleChange}
                value={formik.values.petBreed}
                error={formik.errors.petBreed}
              />
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

            {/* Pet Image */}

            <div className='mb-6'>
              <p className='text-neutral mb-2 text-sm'>Pet Images</p>
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

            {/* Pet Date of Birth */}

            <div className='mb-6'>
              <label
                htmlFor='dateOfBirth'
                className='text-sm text-neutral mb-2 block'
              >
                Pet Date of Birth
              </label>

              {/* <DatePicker handleSelectDate={handleSelectDate} /> */}
              <Calendar
                id='dateOfBirth'
                value={new Date(formik.values.dateOfBirth)}
                onChange={formik.handleChange}
                // showTime
                hourFormat='24'
                placeholder='Select Date'
                className='pl-[16px] text-[12px] bg-transparent h-[40px] w-full'
                icon={<FiCalendar className='text-black h-[20px] w-[20px]'/>}
                showButtonBar
                showIcon
                iconPos='left'
                hideOnDateTimeSelect={true}
              />
            </div>

            {/* Price */}

            <div className='mb-6'>
              <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                Price
              </label>
              <TextInput
                placeholder='Enter price...'
                id='price'
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.errors.price}
              />
            </div>
        </div>

        {/* Column 2 */}
        <div className='lg:col-span-3 p-4'>
          {/* No. Of Stock */}

          <div className='mb-6'>
            <label htmlFor='stock' className='text-sm text-neutral mb-2 block'>
              Number in Stock
            </label>
            <TextInput
              placeholder='How many do you have in stock? e.g 5'
              id='stock'
              onChange={formik.handleChange}
              value={formik.values.stock}
              error={formik.errors.stock}
            />
          </div>

          {/* Pet Color */}

          <div className='mb-6'>
            <label htmlFor='petColor' className='text-sm text-neutral mb-2 block'>
                    Pet Color
            </label>
            <TextInput
              placeholder='What color is the pet? e.g Brown, White'
              id='petColor'
              onChange={formik.handleChange}
              value={formik.values.petColor}
              error={formik.errors.petColor}
            />
          </div>

          {/* Sex */}

          <div className='my-6 relative'>
            <label
                htmlFor='sex'
                className='text-sm text-neutral mb-2 block'
            >
                Sex
            </label>

            <select
                name='gender'
                id='gender'
                className='text-black bg-[#F0F1F3] font-medium'
                onChange={formik.handleChange}
                value={formik.values.gender}
            >
                <option value='' defaultChecked disabled>
                    Select the sex
                </option>
                <option value='Male'>
                    Male
                </option>
                <option value='Female'>
                    Female
                </option>
            </select>
            {/* <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} />
            <CustomError error={formik.errors.categoryId} /> */}
          </div>

          {/* Location */}

          <div className='mb-6'>
            <label htmlFor='stock' className='text-sm text-neutral mb-2 block'>
              Location
            </label>
            <TextInput
              placeholder='Enter location you want your buyers to see.'
              id='location'
              onChange={formik.handleChange}
              value={formik.values.location}
              error={formik.errors.location}
            />
          </div>

          {/* Vaccination Status */}

          <div className='my-6 relative'>
            <label
                htmlFor='vaccinationStatus'
                className='text-sm text-neutral mb-2 block'
            >
                Vaccination Status
            </label>

            <select
                name='vaccinationStatus'
                id='vaccinationStatus'
                className='text-black bg-[#F0F1F3] font-medium'
                onChange={formik.handleChange}
                value={formik.values.vaccinationStatus}
            >
                <option value='' defaultChecked disabled>
                    Is your pet vaccinated?
                </option>
                <option value='true'>
                    Yes
                </option>
                <option value="false">
                    No
                </option>
            </select>
            {/* <IoIosArrowDown onClick={handleSelectProductCategoryClick} className={`absolute right-4 ${formik.errors.categoryId ? "top-10" : "bottom-4"}`} />
            <CustomError error={formik.errors.categoryId} /> */}
          </div>

          {/* Vaccine Card */}

          <div className='mb-6'>
              <p className='text-neutral mb-2 text-sm'>
                Vaccine card
              </p>
              <div className='p-8 bg-[#F0F1F3] border border-black flex items-center justify-center flex-col border-dotted'>
                <input
                  type='file'
                  accept='.jpg,.png,.jpeg'
                  id='image'
                  className='pointer-events-none opacity-0'
                  ref={vaccineImageRef}
                  onChange={addNewVaccineCardImage}
                />
                {!vaccineCardImage && <p>Click below to upload an image. Your image should not exceed 1MB and should be either a .jpeg or .png</p>}
                
                {
                  vaccineCardImage && 
                    <div className='flex items-center flex-wrap gap-2 mb-4'>
                          <div
                            // key={`${index}-${img.image.name}`}
                            className='h-28 w-28 relative rounded-xl'
                          >
                            <Image
                              src={vaccineCardImage !== null ? URL.createObjectURL(vaccineCardImage.image) : ""}
                              alt={vaccineCardImage?.image.name ?? "vaccine card"}
                              width={100}
                              height={100}
                              className='rounded-lg w-full h-full object-cover'
                            />
                            <button
                              className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                              onClick={() => removeVaccineCardImage()}
                            >
                              <RiDeleteBin6Fill />
                            </button>
                          </div>
                    </div>
                }
                <Button
                  size='small'
                  onClick={() => vaccineImageRef.current?.click()}
                >
                  Upload Vaccine Card
                </Button>
              </div>
          </div>

        </div>

        <div className='fixed right-0 bottom-0 w-full p-4 bg-white flex items-center justify-end'>

            <div className='flex items-center gap-4'>
                <Link href='/dashboard/pet-listings'>
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
    </>
  )
}

export default CreatePetListingForm;

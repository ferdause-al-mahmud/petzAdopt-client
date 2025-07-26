/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../Utils/utils";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "fish", label: "Fish" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
];

const UpdatePetForm = ({ petData, isLoading }) => {
  const {
    _id,
    petName,
    description,
    petAge,
    petLocation,
    longDescription: longDes,
    category,
    petImage,
  } = petData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      petName,
      petAge,
      petLocation,
      description,
    },
  });

  const axiosSecure = useAxiosSecure();
  const [selectedOption, setSelectedOption] = useState(null);
  const [longDescription, setLongDescription] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    if (petData) {
      setValue("petName", petName);
      setValue("petAge", petAge);
      setValue("petLocation", petLocation);
      setValue("description", description);
      setSelectedOption(options.find((opt) => opt.value === category));
      setLongDescription(longDes || "");
    }
  }, [
    petData,
    petName,
    petAge,
    petLocation,
    description,
    category,
    longDes,
    setValue,
  ]);

  const { mutateAsync } = useMutation({
    mutationFn: async (addPet) => {
      try {
        const { data } = await axiosSecure.put(`/pets/update/${_id}`, addPet);
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      // console.log('Data Updated Successfully');
      toast.success("Data Updated Successfully!");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = async (data) => {
    if (longDescription > 0) {
      console.log("first");
      return;
    }

    const updatedData = {};

    if (data.petName !== petName) updatedData.petName = data.petName;
    if (data.petAge !== petAge) updatedData.petAge = data.petAge;
    if (data.petLocation !== petLocation)
      updatedData.petLocation = data.petLocation;
    if (data.description !== description)
      updatedData.description = data.description;
    if (selectedOption.value !== category)
      updatedData.category = selectedOption.value;
    if (longDescription !== longDes)
      updatedData.longDescription = longDescription;

    if (data.petImage.length > 0) {
      const imageUrl = await imageUpload(data.petImage[0]);
      updatedData.petImage = imageUrl;
    } else {
      updatedData.petImage = petImage;
    }
    // console.log(updatedData);
    await mutateAsync(updatedData);
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span className=" loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="px-8 mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/2">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Pet Name
            </label>
            <input
              type="text"
              {...register("petName", { required: true })}
              placeholder="Enter pet name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900"
            />
            {errors.petName && (
              <span className="text-red-500">Pet name is required</span>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Pet Age
            </label>
            <input
              type="text"
              {...register("petAge", { required: true })}
              placeholder="Enter pet age"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900"
            />
            {errors.petAge && (
              <span className="text-red-500">Pet age is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/2">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Pet Category
            </label>
            <div className="w-full border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900">
              <Select
                required
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
            </div>
          </div>
          <div className="sm:w-1/2">
            <label
              htmlFor="petImage"
              className="block mt-4 text-sm font-medium sm:text-2xl"
            >
              Select Image:
            </label>
            <input
              type="file"
              id="petImage"
              {...register("petImage")}
              accept="image/*"
              className="w-full px-3 py-[6px] border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900"
            />
            {errors.petImage && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="lg:w-1/2">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Pet Location
            </label>
            <input
              type="text"
              {...register("petLocation", { required: true })}
              placeholder="Enter pet location"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900"
            />
            {errors.petLocation && (
              <span className="text-red-500">Pet location is required</span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Short Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900 resize-none"
              required
              placeholder="Type here"
              rows="4"
            ></textarea>
            {errors.description && (
              <span className="text-red-500">
                Short description is required
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block mt-4 text-sm font-medium sm:text-2xl">
              Long Description
            </label>
            <JoditEditor
              ref={editor}
              value={longDescription}
              onChange={(newContent) => {
                setLongDescription(newContent);
              }}
            ></JoditEditor>
          </div>
        </div>
        {longDescription === "" && (
          <p className="text-red-500">Long description is required</p>
        )}
        <div className="flex flex-col mt-4 sm:flex-row gap-4">
          <div className="w-full">
            <button
              className="btn text-xl bg-rose-100 !text-rose-900 w-full"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePetForm;

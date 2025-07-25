import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useState, useRef } from "react";
import Select from "react-select";
import { useEffect } from "react";
import { imageUpload } from "../../Utils/utils";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

var options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "fish", label: "Fish" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
];

const AddPetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [longDescription, setLongDescription] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [isLongDescriptionFilled, setIsLongDescriptionFilled] = useState(false);
  const editor = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toISOString();
    setDateAdded(currentDate);
  }, []);
  const { mutateAsync } = useMutation({
    mutationFn: async (addPet) => {
      try {
        const { data } = await axiosSecure.post(`/pets`, addPet);
        return data;
      } catch (error) {
        throw new Error("An error occurred");
      }
    },
    onSuccess: () => {
      // console.log('Data Saved Successfully');
      toast.success("Data Saved Successfully!");
      navigate("/dashboard/added-pets");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const onSubmit = async (data) => {
    if (!isLongDescriptionFilled) {
      return;
    }

    const image_url = await imageUpload(data.petImage[0]);
    data.adderEmail = user.email;
    data.category = selectedOption.value;
    data.addedTime = dateAdded;
    data.longDescription = longDescription;
    data.petImage = await image_url;
    data.adopted = false;
    // console.log(data);
    mutateAsync(data);
  };

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
                defaultValue={selectedOption}
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
              {...register("petImage", { required: true })}
              accept="petImage/*"
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
                setIsLongDescriptionFilled(!!newContent);
              }}
            ></JoditEditor>
          </div>
        </div>
        {longDescription === "" ? (
          <p className="text-red-500">Long description is required</p>
        ) : null}
        <div className="flex flex-col mt-4 sm:flex-row gap-4">
          <div className="w-full">
            <button
              className="btn bg-rose-100 !text-rose-900 w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;

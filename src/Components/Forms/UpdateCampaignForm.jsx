/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { useState, useRef, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { imageUpload } from '../../Utils/utils';
const UpdateCampaignForm = ({ campaignData, isLoading }) => {

    const { _id, petName, petImage, maximumAmount, lastDateOfDonation, shortDescription, longDescription: longDes } = campaignData;
    // console.log(campaignData)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            petName,
            maximumAmount,
            lastDateOfDonation,
            shortDescription,
        }
    });

    const axiosSecure = useAxiosSecure()
    const [longDescription, setLongDescription] = useState('');
    const editor = useRef(null);

    useEffect(() => {
        if (campaignData) {
            setValue('petName', petName);
            setValue('maximumAmount', maximumAmount);
            setValue('lastDateOfDonation', lastDateOfDonation ? new Date(lastDateOfDonation).toISOString().split('T')[0] : '');
            setValue('shortDescription', shortDescription);
            setLongDescription(longDes || '');
        }
    }, [campaignData, petName, maximumAmount, shortDescription, lastDateOfDonation, longDes, setValue]);

    const { mutateAsync } = useMutation({
        mutationFn: async updatedData => {
            try {
                const { data } = await axiosSecure.put(`/campaign/update/${_id}`, updatedData);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            console.log('Data Updated Successfully');
            toast.success('Data Updated Successfully!');
        },
        onError: (error) => {
            console.log(error.message);
        }
    });


    const onSubmit = async (data) => {
        if (longDescription > 0) {
            return;
        }
        const date = new Date(data.lastDateOfDonation);
        data.lastDateOfDonation = date.toLocaleDateString();
        const updatedData = {};

        if (data.petName !== petName) updatedData.petName = data.petName;
        if (data.maximumAmount !== maximumAmount) updatedData.maximumAmount = data.maximumAmount;
        if (data.shortDescription !== shortDescription) updatedData.shortDescription = data.shortDescription;
        if (data.lastDateOfDonation !== lastDateOfDonation) updatedData.lastDateOfDonation = data.lastDateOfDonation;
        if (longDescription !== longDes) updatedData.longDescription = longDescription;

        if (data.petImage.length > 0) {
            const imageUrl = await imageUpload(data.petImage[0]);
            updatedData.petImage = imageUrl;
        } else {
            updatedData.petImage = petImage;
        }
        // console.log(updatedData);
        await mutateAsync(updatedData);
    }


    if (isLoading) {
        return <div className='h-[80vh] flex items-center justify-center'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>

    }
    return (
        <div className='px-8 mb-8'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/2">
                        <label className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Pet Name
                        </label>
                        <input
                            type='text'
                            {...register('petName', { required: true })}
                            placeholder="Enter pet name"
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                        />
                        {errors.petName && <span className="text-red-500">Pet name is required</span>}
                    </div>
                    <div className="sm:w-1/2">
                        <label htmlFor='petImage' className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Select Image:
                        </label>
                        <input
                            type='file'
                            id='petImage'
                            {...register('petImage', { required: false })}
                            accept='petImage/*'
                            className='w-full px-3 py-[6px] border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                        />
                        {errors.petImage && <span className="text-red-500">Image is required</span>}
                    </div>

                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/2">
                        <label className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Maximum donation ammout {'($)'}
                        </label>
                        <input
                            type='number'
                            {...register('maximumAmount', { required: true })}
                            placeholder="Enter maximum ammout"
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                        />
                        {errors.maximumAmount && <span className="text-red-500">Maximum donation ammout is required</span>}
                    </div>
                    <div className="sm:w-1/2">
                        <label className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Donation last date
                        </label>
                        <input
                            type='date'
                            {...register('lastDateOfDonation', { required: true })}
                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                        />
                        {errors.lastDateOfDonation && <span className="text-red-500">Last date is required</span>}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <label className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Short Description
                        </label>
                        <textarea
                            {...register('shortDescription', { required: true })}
                            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900 resize-none"
                            required
                            placeholder="Type here"
                            rows="4"
                        ></textarea>
                        {errors.shortDescription && <span className="text-red-500">Short description is required</span>}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <label className='block mt-4 text-sm font-medium sm:text-2xl'>
                            Long Description
                        </label>
                        <div className='border border-[#ff946b]'>
                            <JoditEditor ref={editor} value={longDescription} onChange={(newContent) => {
                                setLongDescription(newContent);

                            }}></JoditEditor>
                        </div>
                    </div>

                </div>
                {!(longDescription.length > 0) ? <p className="text-red-500">Long description is required</p> : null}
                <div className="flex flex-col mt-4 sm:flex-row gap-4">
                    <div className="w-full">
                        <button className='btn bg-[#ff946b] w-full' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCampaignForm;
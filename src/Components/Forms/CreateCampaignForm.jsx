import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { imageUpload } from '../../Utils/utils';
const CreateCampaignForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [longDescription, setLongDescription] = useState('');
    const editor = useRef(null);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();

    const { mutateAsync } = useMutation({
        mutationFn: async campaign => {
            try {
                const { data } = await axiosSecure.post(`/campaign`, campaign);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            // console.log('Data Saved Successfully');
            toast.success('Data Saved Successfully!');
        },
        onError: (error) => {
            console.log(error.message);
        }
    });



    const onSubmit = async (data) => {
        data.longDescription = longDescription;
        const addedTime = new Date();
        data.addedTime = addedTime.toLocaleDateString()
        const date = new Date(data.lastDateOfDonation);
        data.lastDateOfDonation = date.toLocaleDateString();
        data.adderEmail = user.email;
        data.pause = false;
        data.donatedAmount = 0;
        const image_url = await imageUpload(data.petImage[0])
        data.petImage = await image_url;
        // console.log(data);
        await mutateAsync(data);
    };
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
                            {...register('petImage', { required: true })}
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

export default CreateCampaignForm;
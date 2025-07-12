/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdoptModal = ({ setShowModal, detailPet }) => {
    const { _id, petImage, petName, adderEmail } = detailPet;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { mutateAsync } = useMutation({
        mutationFn: async adoptRequest => {
            try {
                const { data } = await axiosSecure.post(`/adopts`, adoptRequest);
                return data;
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    throw new Error("Already exists");
                } else {
                    throw new Error("An error occurred");
                }
            }
        },
        onSuccess: () => {
            // console.log('Data Saved Successfully');
            toast.success('Request sent successfully!');
            setShowModal(false);
        },
        onError: (error) => {
            if (error.message === "Already exists") {
                toast.error('Adoption request already exists!');
            } else {
                console.log("Error occurred");
                toast.error('An error occurred while sending the request.');
            }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = user.email
        const userName = user.displayName;
        const number = form.number.value;
        const address = form.address.value;
        const adoptRequest = {
            email,
            userName,
            number,
            address,
            petId: _id,
            petImage,
            petName,
            ownerEmail: adderEmail
        }
        // console.log(adoptRequest);
        await mutateAsync(adoptRequest)

    }
    return (
        <div className="bg-black  z-10 bg-opacity-30 fixed top-0 w-full  h-[100vh] flex items-center  justify-center">
            <div className="flex flex-col  sm:w-[50vw] bg-white shadow-xl">
                {/*  */}

                <div className="card-body">
                    <h2 className="flex justify-center items-center font-semibold text-3xl">{petName}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">

                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <div className="md:w-1/2">
                                    <label className='block mb-2 text-sm'>
                                        User name
                                    </label>
                                    <input
                                        type='text'
                                        name='username'
                                        value={user.displayName}
                                        readOnly
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <label className='block mb-2 text-sm'>
                                        Email address
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        value={user.email}
                                        readOnly
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-4">
                                <div className="md:w-1/2">
                                    <label className='block mb-2 text-sm'>
                                        Phone number
                                    </label>
                                    <input
                                        type='number'
                                        name='number'
                                        required
                                        placeholder="Enter your number"
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                    />
                                </div>
                                <div className="md:w-1/2">
                                    <label className='block mb-2 text-sm'>
                                        Adress
                                    </label>
                                    <input
                                        type='text'
                                        name='address'
                                        required
                                        placeholder="Enter your address"
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                    />
                                </div>
                            </div>

                        </div>


                        <div className="flex justify-around">
                            <button onClick={() => setShowModal(false)} className="btn w-1/2 bg-[#ff946b]">Close</button>
                            <button type="submit" className="btn w-1/2 bg-green-600">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default AdoptModal;
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UpdatePetForm from '../../Forms/UpdatePetForm';

const Updatepet = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: petData = [], isLoading } = useQuery({
        queryKey: ['update-pet'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/pets/${id}`)
            return data
        },
    })

    return (
        <div className='my-8 sm:mt-12'>
            <h1 className="text-3xl md:text-5xl text-center font-bold">Update pet</h1>
            <UpdatePetForm petData={petData} isLoading={isLoading}></UpdatePetForm>
        </div>
    );
};

export default Updatepet;
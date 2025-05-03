import AddPetForm from "../../../Components/Forms/AddPetForm";

const AddPet = () => {
    return (
        <div className="my-8 sm:mt-12">
            <h1 className="text-3xl md:text-5xl text-center font-bold">Add pet</h1>
            <AddPetForm></AddPetForm>
        </div>
    );
};

export default AddPet;

import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../Utils/utils";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate()
    const {
        createUser,
        updateUserProfile,
        loading,
        logOut,
        setLoading,
        saveUser
    } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form.image.files[0]
        try {
            setLoading(true)
            const image_url = await imageUpload(image)
            const result = await createUser(email, password)
            await updateUserProfile(name, image_url)
            // console.log(result.user?.displayName)
            await saveUser(result?.user)
            logOut()
            navigate('/login')
            toast.success('Signup Successful, please login')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
    }


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>
                        Sign up with your email
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Your name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-[#ff946b] w-full rounded-md py-3 text-white'
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account ?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-[#ff946b] text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Register;
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { signIn, setLoading, loading, signInWithGoogle, saveUser, singInWithGithub } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        try {
            setLoading(true)
            await signIn(email, password);
            navigate(from, { replace: true });
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message.split('/')[1])
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            await saveUser(result?.user)
            // console.log(result)

            navigate(from, { replace: true });
            toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
    }
    const hanldeGithub = async () => {
        try {
            const result = await singInWithGithub()
            await saveUser(result?.user)
            console.log(result)

            navigate(from, { replace: true });
            toast.success('Signup Successful')
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
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
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
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div className='flex gap-8 justify-center mb-3'>
                    <button onClick={handleGoogleSignIn}><FcGoogle className='text-3xl' /></button>
                    <button onClick={hanldeGithub}><BsGithub className='text-3xl' /></button>
                </div>

                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/register'
                        className='hover:underline hover:text-[#ff946b] text-gray-600'
                    >
                        Register
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
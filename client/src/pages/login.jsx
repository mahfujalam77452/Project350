import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '/src/redux/themeConfigSlice.js';
import Dropdown from '/src/components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '/src/components/Icon/IconCaretDown';
import IconMail from '/src/components/Icon/IconMail';
import IconLockDots from '/src/components/Icon/IconLockDots';
import IconInstagram from '/src/components/Icon/IconInstagram';
import IconFacebookCircle from '/src/components/Icon/IconFacebookCircle';
import IconTwitter from '/src/components/Icon/IconTwitter';
import IconGoogle from '/src/components/Icon/IconGoogle';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';

const LoginCover = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = "https://backend350.vercel.app/v1";
  console.log(API_BASE)
  useEffect(() => {
    dispatch(setPageTitle('Login'));
  });

  const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl';
  const themeConfig = useSelector((state) => state.themeConfig);
  const setLocale = (flag) => {
    setFlag(flag);
    if (flag.toLowerCase() === 'ae') {
      dispatch(toggleRTL('rtl'));
    } else {
      dispatch(toggleRTL('ltr'));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      Cookies.set('accessToken', res.data.tokens.access.token,
        {
          expires: new Date(res.data.tokens.access.expires),
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );
      Cookies.set('refreshToken', res.data.tokens.refresh.token,
        {
          expires: new Date(res.data.tokens.refresh.expires),
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(signInStart());
      const res = await axios.post(`${API_BASE}/auth/google`, {
        credential: credentialResponse.credential
      }, { withCredentials: true });

      Cookies.set('accessToken', res.data.tokens.access.token,
        {
          expires: new Date(res.data.tokens.access.expires),
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );
      Cookies.set('refreshToken', res.data.tokens.refresh.token,
        {
          expires: new Date(res.data.tokens.refresh.expires),
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );

      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(signInFailure(error.response.data.message));
    }
  };
  const handleGoogleError = (error) => {
    dispatch(signInFailure(error.response.data.message));
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    });
  };

  return (
    <div>
      {/* <div className="absolute inset-0">
        <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
      </div> */}
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
        <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
        <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
        <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
              <Link to="/" className="w-48 block lg:w-72 ms-10">
                <img src="/assets/images/logo-pink.png" alt="Logo" className="w-full" />
              </Link>
              <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                <img src="/assets/images/auth/login.svg" alt="Cover Image" className="w-full" />
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <Link to="/" className="w-8 block lg:hidden">
                <img src="/favicon.ico" alt="Logo" className="mx-auto w-10" />
              </Link>
              <div className="dropdown ms-auto w-max">
                <Dropdown
                  offset={[0, 8]}
                  placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                  btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                  button={
                    <>
                      <div>
                        <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                      </div>
                      <div className="text-base font-bold uppercase">{flag}</div>
                      <span className="shrink-0">
                        <IconCaretDown />
                      </span>
                    </>
                  }
                >
                  <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    {themeConfig.languageList.map((item) => {
                      return (
                        <li key={item.code}>
                          <button
                            type="button"
                            className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                            onClick={() => {
                              i18next.changeLanguage(item.code);
                              setLocale(item.code);
                            }}
                          >
                            <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
              </div>
              <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div>
                  <label htmlFor="Email">Email</label>
                  <div className="relative text-white-dark">
                    <input onChange={handleChange} id="email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Password">Password</label>
                  <div className="relative text-white-dark">
                    <input
                      onChange={handleChange}
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Enter Password"
                      className="form-input ps-10 pe-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots fill={true} />
                    </span>
                    <span className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="flex cursor-pointer items-center">
                    <Link to="/reset-password" className="text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </label>
                </div>
                <button disabled={loading} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </form>

              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
              </div>
              <div className="mb-10 md:mb-[60px]">
                {/* <ul className="flex justify-center gap-3.5 text-white">
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconFacebookCircle />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconTwitter fill={true} />
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleGoogleSuccess}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconGoogle />
                    </button>
                  </li>
                </ul> */}
                <div className="flex justify-center">
                 <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={true}
                  scope="profile email"
                />
                </div>
              </div>
              <div className="text-center dark:text-white">
                Do not have an account?&nbsp;
                <Link to="/signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;

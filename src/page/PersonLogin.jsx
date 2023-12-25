import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const PersonLogin = ({setIsPersonLogin}) => {

    const [ personData, setPersonData] = useState({
        username : "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate();

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
}


const handlePersonLogin = (id) => {
  const correctUsername = "person";
  const correctPassword = "person123";

  const passwordToCheck = showPassword ? personData.password : correctPassword;

  if (personData.username === correctUsername && passwordToCheck === correctPassword) {
      setIsPersonLogin(true);
    navigate("/presonal_list");
  } else {
    alert("Invalid username or password. Please try again.");
  }
}


const handleSubmit = (e) => {
    e.preventDefault();
    handlePersonLogin();
}

const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

    return (
        <div>
      <div className="font-[sans-serif] text-[#333] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <form className="max-w-lg max-md:mx-auto w-full p-6" onSubmit={handleSubmit}>
          <div className="mb-10">
            <h3 className="text-4xl font-extrabold">Sign in</h3>
          </div>
          <div>
            <label className="text-[15px] mb-3 block">user name</label>
            <div className="relative flex items-center">
              <input name="username" type="text" value={personData.username} onChange={handleInputChange} required className="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600" placeholder="user name" />
            </div>
          </div>
          <div className="mt-6">
            <label className="text-[15px] mb-3 block">Password</label>
            <div className="relative flex items-center">
              <input name="password" type={showPassword ? "text" : "password" } value={personData.password} onChange={handleInputChange} required className="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" onClick={togglePasswordVisibility} fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          <div className="mt-10">
            <button type="button" onClick={handlePersonLogin} className="w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Log in
            </button>
          </div>
        </form>
        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img src="https://readymadeui.com/photo.webp" className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative" alt="Dining Experience" />
        </div>
      </div>
    </div>
        </div>
    );
}

export default PersonLogin;

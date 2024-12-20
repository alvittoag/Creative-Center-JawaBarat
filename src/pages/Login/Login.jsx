import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";

export default function Login() {
  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", inputValue.email)
        .eq("password", inputValue.password);

      const dataSingle = data[0];

      if (dataSingle?.is_authenticated === false) {
        localStorage.setItem("user_email", JSON.stringify(dataSingle.email));

        return Swal.fire({
          title: "Harap melakukan verifikasi terlebih dahulu",
          icon: "info",
        }).then(() => navigate("/verification"));
      }

      if (Object.keys(inputValue).some((key) => inputValue[key] === "")) {
        return Swal.fire({
          title: "Harap isi semua field",
          icon: "error",
        });
      }

      if (error) {
        throw error;
      }

      if (data.length === 0) {
        return Swal.fire({
          title: "Email atau Password Salah",
          icon: "error",
        });
      }

      Swal.fire({
        title: "Login Berhasil",
        icon: "success",
      });

      localStorage.setItem("user", JSON.stringify(data[0]));

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal Login",
        icon: "error",
      });
    }
  };

  return (
    <div className="h-screen  grid justify-items-center place-content-center bg-white">
      <div className=" ">
        <div className="grid grid-cols-2 gap-8  bg-white rounded-lg shadow-sm h-100 border border-gray-200 items-center">
          <div className="p-10 bg-[#fdf8f8] flex flex-col text-black font-semibold text-3xl">
            <p>
              Sign In to <br /> Creative Center Jawa Barat
            </p>
            <div className="flex flex-col mt-10">
              <label className="input input-bordered flex items-center gap-2 mb-2 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  value={inputValue.email}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  value={inputValue.password}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </label>

              <button
                onClick={handleLogin}
                className="btn mt-10 border border-white text-white"
              >
                Login
              </button>
            </div>
            <div className="divider"></div>
            <p className="text-[12px] text-center font-light">
              Belum punya akun?
              <NavLink to="/BuatAkun">
                <a href="" className="font-bold hover:underline">
                  {" "}
                  Buat akun
                </a>
              </NavLink>
            </p>
          </div>

          <div className="">
            <img src="src\assets\login.png" alt="" className="w-96" />
          </div>
        </div>
      </div>
    </div>
  );
}

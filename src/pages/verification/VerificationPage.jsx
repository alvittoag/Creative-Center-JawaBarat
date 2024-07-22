import React from "react";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VerificationPage() {
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");

  const userLcl = localStorage.getItem("user_email");

  const userEmail = JSON.parse(userLcl);

  console.log(userEmail);

  const navigate = useNavigate();

  const handleVerif = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", userEmail)
        .eq("verification_code", parseInt(token));

      if (error) {
        throw error;
      }

      if (data.length === 0) {
        Swal.fire({
          title: "Kode Verifikasi Salah",
          icon: "error",
        });
      }

      if (data.length > 0) {
        let { data, error } = await supabase
          .from("users")
          .update({ is_authenticated: true, verification_code: null })
          .eq("email", userEmail);

        if (!error) {
          Swal.fire({
            title: "Berhasil melakukan verifikasi",
            icon: "success",
          });

          localStorage.clear();

          navigate("/login");
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Gagal verifikasi",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-2xl">
        Harap masukan verification code yang telah dikirim di email anda
      </h1>

      <div className="space-x-5">
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
          placeholder="Masukan code"
          className="bg-white w-96 p-4 rounded-md"
        />

        <button
          disabled={loading}
          onClick={handleVerif}
          className="bg-yellow-600 text-white p-4 rounded-md w-28"
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}

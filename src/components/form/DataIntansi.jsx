import TextInput from "../../components/globals/TextInput";
import TextArea from "../../components/globals/TextArea";
import { NavLink, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validation = Yup.object().shape({
  namaIntansi: Yup.string()
    .required("Nama Intansi Harus Diisi")
    .min(2, "Nama Intansi Minimal Terdiri Dari 2 Karakter"),
  alamatIntansi: Yup.string().required("Alamat Intansi Harus Diisi"),
  noTelpIntansi: Yup.string().required("No Telepon Intansi Harus Diisi"),
  emailIntansi: Yup.string().required("Email Intnasi Harus Diisi"),
  statusIntansi: Yup.string().required("Status Intansi Harus Diisi"),
});

export default function DataIntansi({ setDataSend, setActive }) {
  const { state } = useLocation();
  const formik = useFormik({
    initialValues: {
      namaIntansi: state?.namaIntansi || "",
      alamatIntansi: state?.alamatIntansi || "",
      noTelpIntansi: state?.noTelpIntansi || "",
      emailIntansi: state?.emailIntansi || "",
      statusIntansi: state?.statusIntansi || "",
    },
    validationSchema: validation,
  });

  const handleOnChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
    console.log(target.name + target.value);
  };

  const handleSubmit = () => {
    const isError =
      Object.keys(formik.errors).length !== 0 ||
      Object.values(formik.values).some((value) => value === "");

    if (isError) {
      return Swal.fire({
        title: "Data Intansi",
        text: "Harap lengkapi semua data",
        icon: "error",
      });
    }

    setDataSend((prev) => ({ ...prev, intansi: formik.values }));
    setActive("Data Acara");
  };
  return (
    <div className="flex flex-col bg-[#fcfcfc] w-[40%] m-7 rounded-lg border justify-center">
      <TextInput
        label={"Nama Intansi/Pribadi"}
        placeholder={"Nama Intansi/Pribadi"}
        id={"namaIntansi"}
        nama={"namaIntansi"}
        type={"text"}
        value={formik.values.namaIntansi}
        onChange={handleOnChange}
      />

      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.namaIntansi}</p>
      </div>

      <TextArea
        label={"Alamat Intansi"}
        placeholder={"Alamat Intansi"}
        id={"alamatIntansi"}
        nama={"alamatIntansi"}
        type={"text"}
        value={formik.values.alamatIntansi}
        onChange={handleOnChange}
      />

      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.alamatIntansi}
        </p>
      </div>

      <TextInput
        label={"No Telepon "}
        placeholder={"No Telepon Intansi"}
        id={"noTelpIntansi"}
        nama={"noTelpIntansi"}
        type={"number"}
        value={formik.values.noTelpIntansi}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.noTelpIntansi}
        </p>
      </div>

      <TextInput
        label={"Alamat Email"}
        placeholder={"Email Intansi"}
        id={"emailIntansi"}
        nama={"emailIntansi"}
        type={"text"}
        value={formik.values.emailIntansi}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">{formik.errors.emailIntansi}</p>
      </div>

      <TextInput
        label={"Status dalam Intansi/Pribadi"}
        placeholder={"Status dalam Intansi/Pribadi"}
        id={"statusIntansi"}
        nama={"statusIntansi"}
        type={"text"}
        value={formik.values.statusIntansi}
        onChange={handleOnChange}
      />
      <div className="ml-[85px]">
        <p className="text-red-500 text-[13px]">
          {formik.errors.statusIntansi}
        </p>
      </div>

      <div className="grid place-content-end px-14 my-5">
        <button
          onClick={handleSubmit}
          className="btn w-20 bg-[#1A8C44] border-white text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

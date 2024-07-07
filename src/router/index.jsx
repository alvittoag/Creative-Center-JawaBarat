import { BrowserRouter, Route, Routes } from "react-router-dom";
import Jadwal from "../pages/Jadwal/Jadwal";
import LandingPage from "../pages/Landing Page/LandingPage";
import Login from "../pages/Login/Login";
import BCC from "../pages/Bogor Creative Center/BCC";
import PCC from "../pages/Purwakarta Creative Center/PCC";
import AhmadDjuhara from "../pages/Ruang Kreatif Ahmad Djuhara/AhmadDjuhara";
import PeminjamanRuangan from "../pages/Peminjaman Ruangan/PeminjamanRuangan";
import DataIntansi from "../pages/Peminjaman Ruangan/DataIntansi";
import DataAcara from "../pages/Peminjaman Ruangan/DataAcara";
import BuatAkun from "../pages/Buat Akun/BuatAkun";
import Profile from "../pages/Profile/Profile";
import JadwalAD from "../pages/Jadwal/JadwalAD";
import JadwalPCC from "../pages/Jadwal/JadwalPCC";
import DetailPermohonan from "../pages/Profile/Detail Permohonan/DetailPermohonan";
import UploadLaporan from "../pages/Upload Laporan/UploadLaporan";
import EditPermohonan from "../pages/Profile/Edit Permohonan/EditPermohonan";
import DetailPermohonanDitolak from "../pages/Profile/Detail Permohonan/DetailPermohonanDitolak";
import DetailKerusakanFasilitas from "../pages/Profile/Detail Kerusakan Fasilitas/DetailKerusakanFasilitas";
import PrivateRoute from "../components/private-route/PrivateRoute";
import PrivateRouteAuth from "../components/private-route/PrivateRouteAuth";
import Peminjaman from "../pages/peminjaman/Peminjaman";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouteAuth />}>
            <Route path="/BuatAkun" Component={BuatAkun} />
            <Route path="/login" Component={Login} />
          </Route>

          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/" exact Component={LandingPage} />
            <Route path="/jadwal" Component={Jadwal} />
            <Route path="/jadwalAD" Component={JadwalAD} />
            <Route path="/jadwalPCC" Component={JadwalPCC} />
            {/* <Route path="/peminjaman" Component={PeminjamanRuangan} /> */}
            <Route path="/peminjaman" Component={Peminjaman} />
            <Route path="/BogorCreativeCenter" Component={BCC} />
            <Route path="/PurwakartaCreativeCenter" Component={PCC} />
            <Route path="/AhmadDjuhara" Component={AhmadDjuhara} />
            <Route path="/DataIntansi" Component={DataIntansi} />
            <Route path="/DataAcara" Component={DataAcara} />
            <Route path="/Profile" Component={Profile} />
            <Route path="/detailPermohonan" Component={DetailPermohonan} />
            <Route path="/editPermohonan" Component={EditPermohonan} />
            <Route path="/uploadLaporan" Component={UploadLaporan} />
            <Route
              path="/detailPermohonann"
              Component={DetailPermohonanDitolak}
            />
            <Route
              path="/detailKerusakanFasilitas"
              Component={DetailKerusakanFasilitas}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

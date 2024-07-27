import convertStringify from "./convertStringify";

export const getRuangan = ({ data, ruangan }) => {
  return data?.length
    ? {
        ruangan: { ruangan },
        pemohon: convertStringify(data[0]?.pemohon)?.namaPemohon,
        tanggal: convertStringify(data[0]?.acara)?.tanggalMulaiAcara,
        nama_acara: convertStringify(data[0]?.acara)?.namaAcara,
        jam_mulai: convertStringify(data[0]?.acara)?.jamMulai,
        jam_selesai: convertStringify(data[0]?.acara)?.jamBerakhir,
      }
    : {};
};

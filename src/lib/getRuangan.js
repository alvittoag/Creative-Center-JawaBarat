import convertStringify from "./convertStringify";

export const getRuangan = ({ data, ruangan }) => {
  return data?.length
    ? {
        ruangan: { ruangan },
        pemohon: convertStringify(data[0]?.pemohon)?.namaPemohon,
        tanggal: convertStringify(data[0]?.acara)?.tanggalMulaiAcara,
      }
    : {};
};

import convertStringify from "./convertStringify";

export const findRuangan = ({ data, namaRuangan }) => {
  return data?.filter((item) => {
    const ruangan = convertStringify(item.acara).ruangan;
    const ruanganParse = convertStringify(ruangan).includes(namaRuangan);

    return ruanganParse;
  });
};

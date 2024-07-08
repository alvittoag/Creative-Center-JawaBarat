import React from "react";

export default function LabelRuangan({ data }) {
  return (
    <p className="text-gray-400 text-sm">
      {data.ruangan
        ? `Pemohon: ${data.pemohon} - ${data.tanggal}`
        : "Jadwal masih kosong"}
    </p>
  );
}

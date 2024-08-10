export function cekValidDate(inputDate) {
  const today = new Date(); // Mendapatkan tanggal hari ini
  today.setHours(0, 0, 0, 0); // Mengatur waktu ke 00:00 untuk perbandingan yang akurat

  const userDate = new Date(inputDate); // Mengonversi input ke objek Date
  userDate.setHours(0, 0, 0, 0); // Mengatur waktu ke 00:00 untuk perbandingan yang akurat

  return userDate.getTime() >= today.getTime();
}

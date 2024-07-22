export function checkMaxValues(obj) {
  let maxValues = {
    "Cafe Indoor": 25,
    "Cafe Outdoor": 30,
    "Ruang Galeri": 20,
    Auditorium: 70,
    "Ruang Fotografi": 25,
    "Ruang Musik": 10,
    "Ruang Flexible": 100,
    Workshop: 50,
    "Ruang Kelas": 20,
    "Ruang Audio": 10,
    Gor: 100,
    "Plaza Terbuka": 60,
    "Co-working Space": 20,
    Kantin: 40,
  };

  let error = [];

  for (let key in obj) {
    if (parseInt(obj[key]) > maxValues[key]) {
      error = [
        ...error,
        `${key} hanya memiliki jumlah maksimum peserta sebanyak ${maxValues[key]}`,
      ];
      console.log(
        `${key} exceeds the maximum value. Current value: ${obj[key]}, Maximum value: ${maxValues[key]}`
      );
    } else {
      console.log(
        `${key} is within the acceptable range. Current value: ${obj[key]}, Maximum value: ${maxValues[key]}`
      );
    }
  }

  return error;
}

// checkMaxValues(cafe, maxValues);

// Semua konten undangan ada di sini. Ganti foto, nama, tanggal, dll tanpa
// perlu nyentuh komponen.

/**
 * Path foto. File lokal (diawali "/") dipakai apa adanya; selain itu dianggap ID
 * foto Unsplash dan diberi parameter ukuran.
 */
export const photo = (src: string, w = 1080, h?: number) =>
  src.startsWith('/')
    ? src
    : `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&q=80&w=${w}${h ? `&h=${h}` : ''}`

/** Foto asli mempelai di public/images (WebP). */
const IMG = {
  drone: '/images/mempelai-bambang-nila-droneview.webp',
  walk: '/images/mempelai-bambang-nila-jalan.webp',
  bride: '/images/mempelai-nila.webp',
  brideWide: '/images/mempelai-nila-wide.webp',
  bouquet: '/images/mempelai-nila-zoom.webp',
  groom: '/images/mempelai-bambang-potrait.webp',
  prewed: '/images/mempelai-prewed.webp',
  groomBatik: '/images/mempelai-bambang-batik.webp',
  brideKebaya: '/images/mempelai-nila-kebaya.webp',
  studioBench: '/images/prewed-studio-bangku.webp',
}

/** Lokasi acara (Kebon Kosong Legend, Jl. Elang II, Sawah Lama, Ciputat) */
const VENUE_MAPS =
  'https://www.google.com/maps/dir//Kebon+Kosong+Legend,+Jl.+Elang+II,+Sawah+Lama,+Kec.+Ciputat,+Kota+Tangerang+Selatan,+Banten+15413/@-6.3010197,106.7337985,18z/data=!4m17!1m7!3m6!1s0x2e69f1006774c79d:0x2931666cf3e34000!2sKebon+Kosong+Legend!8m2!3d-6.3010216!4d106.7354014!16s%2Fg%2F11vk98ggfj!4m8!1m0!1m5!1m1!1s0x2e69f1006774c79d:0x2931666cf3e34000!2m2!1d106.7354014!2d-6.3010216!3e0'
const VENUE_COORDS = '-6.3010216,106.7354014'

export const wedding = {
  bride: {
    nick: 'Nila',
    full: 'Nila Bernadet',
    parents: 'Putri dari Bpk. Wardiyono (Alm) & Ibu Suwarsih (Almh)',
    photo: IMG.brideKebaya,
  },
  groom: {
    nick: 'Bambang',
    full: 'Bambang Joko Irawan',
    parents: 'Putra dari Bpk. Agus Supriadi & Ibu Sofiatun (Almh)',
    photo: IMG.groomBatik,
  },

  /** Tanggal utama (dipakai countdown & cover). Format ISO dengan zona WIB. */
  date: '2026-10-31T08:00:00+07:00',
  dateLabel: 'Sabtu, 31 Oktober 2026',
  dateShort: '31 · 10 · 26',
  dateNumeric: '31.10.2026',
  dayName: 'Sabtu',
  /** Teks badge melingkar di hero */
  dateWords: 'thirty-one october',
  city: 'Ciputat',
  /** Peta yang ditanam di section Acara */
  mapsEmbed: `https://maps.google.com/maps?q=${VENUE_COORDS}&z=17&output=embed`,

  /** Kalimat pembuka & penutup di section Mempelai (sesuai kartu undangan) */
  opening: {
    salam: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    text: 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami:',
    prayer:
      'Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Untuk mengikuti sunnah Rasul-Mu dalam rangka membentuk keluarga yang sakinah, mawaddah, warahmah, maka perkenankanlah kami menikahkan mereka berdua.',
  },

  /** Keluarga yang mengundang (section penutup) */
  families: [
    'Kel. Bpk. Wardiyono (Alm) & Ibu Suwarsih (Almh)',
    'Kel. Bpk. Agus Supriadi (Bpk. Bambang) & Ibu Sofiatun (Almh)',
  ],

  invitedBy: [
    ['Bpk. Erwin Gemala Putra, S.STP., M.Si', 'Camat'],
    ['Bpk. Mega Romala, S.Kom., M.M', 'Lurah'],
    ['Bpk. H. Mamat, S.E., M.M', ''],
    ['Bpk. H. Saifulloh', 'Ketua RW 04'],
    ['Bpk. Massad', 'Ketua RW 01'],
    ['Bpk. Tugiman', 'Ketua RT 04'],
    ['Bpk. Erman Heri Rustaman', 'Ketua RT 02'],
    ['Bpk. Ahmad Safari (Opang)', 'Karang Taruna RW 04'],
    ['Bpk. H. Win Amar', 'Tokoh Masyarakat'],
    ['Bpk. H. Raming R9', 'Tokoh Masyarakat'],
    ['Bpk. Suyoto Jamil', 'Tokoh Masyarakat'],
    ['Bpk. Sugino', 'Ketua IPKM'],
    ['Bpk. Ardo Widianto', 'Kakak Kandung'],
    ['Bpk. Fanny Fiqhi Fahrezy', 'Adik Kandung'],
    ['Bpk. Nuryanto', 'Kakak Kandung'],
    ['Bpk. Yunit Darmanto', 'Kakak Kandung'],
    ['Bpk. Warsiyanto', 'Pakde'],
    ['Bpk. Iriyadi', 'Pakde'],
    ['Bpk. Rono', 'Pakde'],
    ['Keluarga Besar Anggota Arisan IPKM', 'Ikatan Paguyuban Keluarga Mandiri'],
    ['Keluarga Besar Isar', 'Ikatan Scooter Aren'],
  ] as [string, string][],

  photos: {
    cover: IMG.prewed,
    aside: IMG.walk,
    hero: IMG.prewed,
    quote: IMG.brideWide,
    saveTheDate: IMG.bouquet,
    closing: IMG.walk,
  },

  quote: {
    text: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum : 21',
  },

  events: [
    {
      title: 'Akad Nikah',
      date: 'Sabtu, 31 Oktober 2026',
      time: '08.00 WIB',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Elang II No. 3, Ciputat, Tangerang Selatan 15413',
      maps: VENUE_MAPS,
      start: '20261031T010000Z',
      end: '20261031T033000Z',
    },
    {
      title: 'Resepsi',
      date: 'Sabtu, 31 Oktober 2026',
      time: '10.30 WIB — selesai',
      venue: 'Kediaman Mempelai Wanita',
      address: 'Jl. Elang II No. 3, Ciputat, Tangerang Selatan 15413',
      maps: VENUE_MAPS,
      start: '20261031T033000Z',
      end: '20261031T070000Z',
    },
  ],

  // Cerita di bawah masih contoh. Ganti tahun & detailnya dengan kisah asli mereka.
  // `photo` opsional: bab tanpa foto tampil teks saja.
  story: [
    {
      year: '2019',
      title: 'Satu kursi kosong',
      text: [
        'Perpustakaan kampus sedang penuh-penuhnya menjelang ujian. Bambang berkeliling cukup lama mencari tempat duduk, dan satu-satunya kursi yang tersisa ada di depan Nila. Ia bertanya pelan, “Boleh duduk di sini?” Nila mengangguk tanpa banyak berpikir.',
        'Sore itu tidak ada yang benar-benar selesai belajar. Obrolan soal tugas berubah jadi cerita tentang kota asal, makanan kesukaan, dan lagu yang sama-sama sedang mereka putar berulang-ulang. Mereka baru sadar hari sudah gelap ketika petugas mulai mematikan lampu satu per satu.',
      ],
    },
    {
      year: '2021',
      title: 'Pelan-pelan',
      photo: IMG.studioBench,
      text: [
        'Tidak ada pernyataan yang dramatis. Yang ada hanya pesan selamat pagi yang tidak pernah absen, payung yang selalu dibawa dua, dan kebiasaan saling menunggu di depan gerbang kampus.',
        'Mereka mengenal satu sama lain lewat hal-hal kecil: Nila yang selalu minta teh tidak terlalu manis, Bambang yang diam sebentar sebelum menjawab pertanyaan yang penting. Hal-hal kecil itu yang lama-lama terasa seperti rumah.',
      ],
    },
    {
      year: '2023',
      title: 'Dua kota',
      photo: IMG.drone,
      text: [
        'Pekerjaan membawa mereka ke kota yang berbeda. Hari-hari diisi panggilan video yang sering putus karena sinyal, paket berisi camilan dari rumah, dan tiket kereta yang dibeli jauh-jauh hari supaya bisa bertemu di akhir pekan.',
        'Jarak tidak membuat semuanya lebih mudah. Tapi justru dari situ mereka belajar bahwa yang ingin dijaga bukan sekadar perasaan, melainkan satu sama lain.',
      ],
    },
    {
      year: '2026',
      title: 'Lamaran',
      text: [
        'Di ruang tamu yang dipenuhi keluarga, Bambang datang bersama orang tuanya membawa niat yang sudah lama ia simpan. Tidak ada kejutan berlebihan, hanya kalimat yang disusun dengan hati-hati dan jawaban yang membuat dua keluarga tersenyum lega.',
        'Sejak hari itu, mereka mulai menghitung hari menuju 31 Oktober.',
      ],
    },
  ],

  letter: {
    greeting: 'Untuk Anda yang sedang membaca ini,',
    paragraphs: [
      'Kami tidak pernah membayangkan perjalanan kami akan sampai sejauh ini. Selama bertahun-tahun, ada banyak sekali orang yang ikut menjaga cerita kami tetap utuh: keluarga yang tidak pernah lelah mendoakan, sahabat yang menjadi tempat pulang ketika kami ragu, dan orang-orang baik yang mungkin tidak sadar bahwa kebaikan kecilnya sangat berarti bagi kami.',
      'Pernikahan ini bukan garis akhir. Kami tahu akan ada hari-hari yang berat, rencana yang tidak berjalan sesuai harapan, dan perbedaan yang harus diselesaikan dengan sabar. Karena itu, kami ingin memulainya dengan cara yang paling baik: dikelilingi oleh orang-orang yang kami sayangi.',
      'Kehadiran Anda di hari itu akan menjadi bagian dari cerita yang kelak akan kami ceritakan lagi, kepada diri kami sendiri di masa depan, dan mungkin suatu hari kepada anak-anak kami.',
    ],
    closing: 'Dengan hormat dan rasa syukur,',
  },

  promises: [
    'Saling mendengarkan sampai selesai, sebelum terburu-buru menjawab.',
    'Tetap makan malam bersama, sesibuk apa pun harinya.',
    'Mengucapkan terima kasih untuk hal-hal kecil yang sering terlewat.',
    'Meminta maaf lebih dulu, tanpa menghitung siapa yang salah.',
    'Pulang ke rumah yang sama, dalam keadaan apa pun.',
  ],

  prayer: {
    arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    meaning:
      'Semoga Allah memberkahimu di waktu bahagia, memberkahimu di waktu susah, dan mengumpulkan kalian berdua dalam kebaikan.',
    source: 'HR. Abu Dawud & At-Tirmidzi',
  },

  giftAddress: {
    name: 'Nila Bernadet',
    address: 'Jl. Elang II No. 3, Ciputat, Tangerang Selatan 15413',
  },

  playlist: [
    {
      title: 'Clair de Lune',
      artist: 'Claude Debussy',
      src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg.mp3',
      cover: IMG.drone,
    },
    {
      title: 'Gymnopédie No. 1',
      artist: 'Erik Satie · Michael Laucke',
      src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a6/Satie_Gymnopedie_No_1_performed_by_Michael_Laucke.flac/Satie_Gymnopedie_No_1_performed_by_Michael_Laucke.flac.mp3',
      cover: IMG.bride,
    },
    {
      title: 'Canon in D',
      artist: 'Kevin MacLeod (CC BY 3.0)',
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Canon_in_D_Major_%28ISRC_USUAN1100301%29.mp3',
      cover: IMG.groom,
    },
  ],
}

export type Track = (typeof wedding.playlist)[number]

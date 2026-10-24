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
  prewedStudio: '/images/mempelai-prewed-studio.webp',
  groomBatik: '/images/mempelai-bambang-batik.webp',
  brideKebaya: '/images/mempelai-nila-kebaya.webp',
  studioWhisper: '/images/prewed-studio-bisik.webp',
  hiburan: '/images/hiburan-pernikahan.webp',
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
  mapsEmbed: `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${VENUE_COORDS}!6i17!3m1!1sid!5m1!1sid`,

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
    cover: IMG.prewedStudio,
    aside: IMG.walk,
    hero: IMG.studioWhisper,
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
      year: '2023',
      title: 'Maulid Nabi Muhammad SAW',
      text: [
        'Semua berawal dari sebuah pertemuan sederhana di acara Maulid Nabi Muhammad SAW. Saat itu, Nila bertugas sebagai pembawa acara, sementara Bambang hadir sebagai pengajar yang mengisi acara.',
        'Siapa sangka, pertemuan yang awalnya hanya sebatas menjalankan tugas masing-masing itu menjadi awal dari sebuah cerita. Tanpa pernah menyangka, hari itu menjadi langkah pertama dari perjalanan panjang yang kelak mempertemukan dua hati dalam satu tujuan.',
      ],
    },
    {
      year: '2024',
      title: 'Pelan-Pelan',
      photo: IMG.studioWhisper,
      text: [
        'Tidak ada pernyataan cinta yang dramatis, tidak ada janji manis yang berlebihan. Yang ada hanya sapaan sederhana, “Assalamualaikum,” dan perhatian kecil seperti, “Jangan lupa makan.”',
        'Pelan-pelan, percakapan sederhana itu menjadi kebiasaan. Perhatian kecil berubah menjadi rasa nyaman, dan tanpa disadari, dua hati mulai saling menemukan tempat untuk pulang.',
        'Tak perlu terburu-buru, karena ternyata cinta tidak selalu datang dengan cara yang luar biasa. Terkadang, ia tumbuh diam-diam melalui hal-hal sederhana yang dilakukan dengan tulus.',
      ],
    },
    {
      year: '2025',
      title: 'Perbedaan Waktu, Satu Tujuan',
      photo: IMG.drone,
      text: [
        'Tahun ini mengajarkan kami bahwa mencintai bukan berarti harus selalu bersama setiap waktu. Kesibukan pekerjaan dan perbedaan jam aktivitas membuat kami belajar memahami, menunggu, dan saling menguatkan dari kejauhan.',
        'Meski waktu untuk bertemu tak selalu mudah, kami belajar bahwa hubungan bukan hanya tentang seberapa sering bisa bersama, tetapi tentang bagaimana tetap saling menjaga di tengah kesibukan.',
        'Perlahan, kami semakin memahami bahwa cinta bukan sekadar hadir di saat lapang, melainkan tetap memilih untuk bertahan, saling mendukung, dan melangkah bersama menuju tujuan yang sama.',
      ],
    },
    {
      year: '2026',
      title: 'Sebuah Keseriusan',
      text: [
        'Setelah perjalanan panjang yang dipenuhi cerita, doa, dan proses saling memahami, akhirnya kami sampai pada satu langkah yang lebih serius: lamaran.',
        'Bukan karena perjalanan kami selalu mudah, tetapi karena kami percaya bahwa setiap proses telah mengajarkan arti kesabaran, komitmen, dan kesungguhan.',
        'Dengan restu keluarga dan doa yang mengiringi, kami memantapkan hati untuk melangkah ke tahap berikutnya. Bukan lagi sekadar dua orang yang saling menyayangi, melainkan dua hati yang siap menyatukan harapan dan merencanakan masa depan bersama.',
        'Karena pada akhirnya, bukan tentang seberapa cepat kami sampai, melainkan tentang keyakinan untuk memilih satu sama lain.',
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

  /** Hiburan di hari H (sesuai banner dari keluarga) */
  entertainment: {
    banner: IMG.hiburan,
    acts: [
      { time: '09.00 — 12.00 WIB', title: 'Reog Ponorogo', by: 'Roso Jati' },
      { time: '13.00 — 20.00 WIB', title: 'Campursari', by: 'AS Campursari' },
    ],
  },

  /** Rekening untuk tanda kasih */
  banks: [
    { bank: 'BNI', number: '0330853282', name: 'Nila Bernadet', logo: '/images/logo-bni.svg', color: '#f15a22', deep: '#006885' },
    { bank: 'BCA', number: '8780332302', name: 'Nila Bernadet', logo: '/images/logo-bca.svg', color: '#0060af', deep: '#003d73' },
  ],

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

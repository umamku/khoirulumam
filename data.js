const DATA = {
  profile: {
    name: "Khoirul Umam",
    role: "Full-Stack Founder",
    headline: "Building Tech, Growing Business, Empowering People.",
    subheadline: "Menggabungkan Software Development, Strategi Digital Marketing, dan Training Vokasi untuk pertumbuhan bisnis yang berkelanjutan.",
  },
  services: [
    {
      id: 1,
      title: "App Development",
      desc: "Membangun sistem terintegrasi (LMS, POS, SaaS) menggunakan React & Next.js.",
      icon: "Code2"
    },
    {
      id: 2,
      title: "Digital Marketing",
      desc: "Strategi Performance Marketing (Ads/SEO) berbasis data untuk B2B & B2C.",
      icon: "TrendingUp"
    },
    {
      id: 3,
      title: "Corporate Training",
      desc: "Workshop praktis: Fullstack Coding, No-Code Tools, dan Digital Literacy.",
      icon: "Users"
    }
  ],
  links: [
    { id: 1, title: "SmartyBill POS", url: "#", category: "apps", status: "Live", desc: "Kasir Cerdas & Stok Gudang AI" },
    { id: 2, title: "AlumniHub", url: "#", category: "apps", status: "Beta", desc: "Tracer Study Platform" },
    { id: 3, title: "Workshop No-Code", url: "#", category: "training", status: "Open", desc: "Batch Februari 2026" },
    { id: 4, title: "Kelas React Private", url: "#", category: "training", status: "Waitlist", desc: "Mentoring Intensif" },
    { id: 5, title: "Markaz Qur'an", url: "#", category: "community", status: null, desc: "Info Kegiatan Sosial" },
    { id: 6, title: "Lunasin App", url: "#", category: "apps", status: "Coming Soon", desc: "Pencatatan Hutang Piutang" },
  ],
  portfolio: [
    { 
      id: 1, 
      title: "Sistem Manajemen Gudang", 
      tech: ["Next.js", "Supabase", "Tailwind"],
      desc: "Optimasi flow barang masuk/keluar dengan tracking QR Code real-time."
    },
    { 
      id: 2, 
      title: "Platform LMS Corporate", 
      tech: ["Moodle", "React", "AWS"],
      desc: "Learning Management System custom untuk pelatihan 500+ karyawan."
    }
  ]
};

export default DATA;

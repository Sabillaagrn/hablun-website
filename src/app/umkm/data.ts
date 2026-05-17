import { Product } from "./types"

export const categories = [
  "Semua",
  "Makanan",
  "Minuman",
  "Jasa",
  "Fashion",
]

export const products: Product[] = [
  {
    id: 1,
    name: "Pentol Ayam Simarantap Pedas Cijerah Bandung",
    price: 18000,
    category: "Makanan",

    image: "/products/p1.jpg",

    images: [
      "/products/p1.jpg",
      "/products/p1.jpg",
      "/products/p1.jpg",
    ],

    description:
      "Pentol ayam pedas dengan kuah mercon khas Bandung yang gurih, hangat, dan bikin nagih.",

    about:
      "Pentol Ayam Simarantap hadir sebagai pilihan kuliner pedas khas Bandung dengan perpaduan tekstur pentol yang empuk dan kuah mercon yang kaya rempah. Produk ini dibuat menggunakan daging ayam pilihan dan diracik secara higienis agar menghasilkan rasa yang konsisten di setiap sajian.",

    story:
      "Berawal dari usaha rumahan sederhana di kawasan Cijerah Bandung, Simarantap kini menjadi salah satu produk UMKM favorit pecinta makanan pedas. Resep kuah rahasia yang digunakan merupakan racikan turun-temurun yang telah disempurnakan selama bertahun-tahun.",

    detail:
      "Cocok disantap saat cuaca dingin maupun sebagai teman makan siang. Perpaduan rasa gurih, pedas, dan aroma jeruk purut membuat pengalaman menikmati pentol menjadi lebih spesial.",

    benefits: [
      "Menggunakan daging ayam pilihan berkualitas",
      "Kuah mercon khas dengan rempah autentik",
      "Diproduksi higienis oleh UMKM lokal",
      "Cocok untuk pecinta makanan pedas",
    ],

    condition: "Baru",
    origin: "Bandung, Indonesia",
    type: "UMKM Kuliner",

    seller: "Simarantap Bandung",

    sellerPhone: "6287736490305",

    sellerDescription:
      "UMKM kuliner lokal Bandung yang fokus menghadirkan makanan pedas berkualitas dengan cita rasa khas nusantara.",
  },

  {
    id: 2,
    name: "Cobi Kopi Robusta dengan Jahe Asli Khas Magelang",
    price: 18000,
    category: "Minuman",

    image: "/products/p2.jpg",

    images: [
      "/products/p2.jpg",
      "/products/p2.jpg",
      "/products/p2.jpg",
    ],

    description:
      "Kopi robusta asli Magelang dipadukan jahe alami untuk sensasi hangat dan nikmat.",

    about:
      "Cobi Coffee menggunakan biji kopi robusta pilihan khas Magelang yang terkenal memiliki karakter rasa kuat dan aroma khas. Dipadukan dengan jahe alami berkualitas sehingga menghasilkan minuman yang tidak hanya nikmat tetapi juga menghangatkan tubuh.",

    story:
      "Produk ini dikembangkan oleh pelaku UMKM lokal yang ingin menghadirkan kopi sehat dengan sentuhan tradisional Indonesia. Kombinasi kopi dan jahe menjadi solusi minuman modern yang tetap dekat dengan budaya nusantara.",

    detail:
      "Cocok dinikmati pagi hari maupun malam saat cuaca dingin. Aroma kopi yang kuat berpadu sempurna dengan rasa jahe yang menenangkan.",

    benefits: [
      "Menggunakan kopi robusta asli Magelang",
      "Mengandung jahe alami pilihan",
      "Menghangatkan tubuh",
      "Cocok untuk teman santai",
    ],

    condition: "Baru",
    origin: "Magelang, Indonesia",
    type: "UMKM Minuman",

    seller: "Cobi Coffee",

    sellerPhone: "6281312309340",

    sellerDescription:
      "Brand kopi lokal yang menghadirkan inovasi minuman sehat dengan cita rasa khas nusantara.",
  },

  {
    id: 3,
    name: "Jasa Custom Body Motor Bandung Denny Jefstyle",
    price: 55000,
    category: "Jasa",

    image: "/products/p3.jpg",

    images: [
      "/products/p3.jpg",
      "/products/p3.jpg",
      "/products/p3.jpg",
    ],

    description:
      "Jasa custom body motor handmade berkualitas untuk pecinta modifikasi motor.",

    about:
      "Denny Jefstyle menghadirkan jasa pembuatan body motor custom handmade dengan material berkualitas tinggi. Setiap produk dibuat dengan detail dan ketelitian agar menghasilkan tampilan motor yang unik dan eksklusif.",

    story:
      "Berawal dari hobi modifikasi motor, Denny Jefstyle berkembang menjadi workshop custom terpercaya di Bandung yang telah menangani berbagai proyek motor custom dari berbagai daerah.",

    detail:
      "Melayani pembuatan tangki custom, spakbor, knalpot custom, hingga berbagai aksesoris motor handmade lainnya.",

    benefits: [
      "Pengerjaan handmade detail",
      "Material berkualitas tinggi",
      "Desain custom sesuai permintaan",
      "Dikerjakan oleh workshop berpengalaman",
    ],

    condition: "Baru",
    origin: "Bandung, Indonesia",
    type: "UMKM Kerajinan",

    seller: "Denny Jefstyle",

    sellerPhone: "6285965926716",

    sellerDescription:
      "Workshop custom motor Bandung dengan spesialisasi body handmade dan modifikasi motor custom.",
  },

  {
    id: 4,
    name: "Vendor Jersey Custom Printing Sublime Bandung",
    price: 70000,
    category: "Fashion",

    image: "/products/p4.jpg",

    images: [
      "/products/p4.jpg",
      "/products/p4.jpg",
      "/products/p4.jpg",
    ],

    description:
      "Jersey custom printing berkualitas tinggi dengan hasil tajam dan tidak mudah luntur.",

    about:
      "SAFF Project menghadirkan layanan custom jersey dengan teknologi digital printing sublime modern yang menghasilkan warna tajam dan detail presisi.",

    story:
      "Berbasis di Bandung, SAFF Project menjadi partner berbagai komunitas olahraga dan event dalam memproduksi jersey custom berkualitas premium.",

    detail:
      "Menggunakan bahan nyaman dan teknologi printing modern sehingga hasil cetak tahan lama dan nyaman digunakan.",

    benefits: [
      "Printing detail dan tajam",
      "Warna tahan lama",
      "Bahan nyaman digunakan",
      "Bisa custom desain sendiri",
    ],

    condition: "Baru",
    origin: "Bandung, Indonesia",
    type: "UMKM Fashion",

    seller: "SAFF Project",

    sellerPhone: "6282130277707",

    sellerDescription:
      "Vendor jersey custom Bandung dengan teknologi printing modern dan kualitas premium.",
  },

  {
    id: 5,
    name: "Jasa Pembuatan Website SEO UMKM Bandung",
    price: 500000,
    category: "Jasa",

    image: "/products/p5.jpg",

    images: [
      "/products/p5.jpg",
      "/products/p5.jpg",
      "/products/p5.jpg",
    ],

    description:
      "Layanan pembuatan website SEO profesional untuk UMKM dan bisnis agar lebih mudah ditemukan di Google dan meningkatkan penjualan.",

    about:
      "Bikin Website Murah menghadirkan solusi pembuatan website modern yang dirancang khusus untuk membantu UMKM maupun bisnis berkembang secara digital. Website dibuat responsif, ringan, mobile-friendly, dan dioptimasi SEO agar mampu mendatangkan traffic berkualitas dari mesin pencari.",

    story:
      "Berawal dari kebutuhan banyak pelaku usaha lokal yang kesulitan membangun identitas digital profesional, layanan ini hadir untuk memberikan website berkualitas dengan biaya terjangkau. Fokus utama kami bukan hanya membuat tampilan menarik, tetapi juga memastikan website mampu menghasilkan konversi dan mendukung pertumbuhan bisnis jangka panjang.",

    detail:
      "Website dapat digunakan sebagai company profile, katalog produk, landing page promosi, hingga toko online sederhana. Seluruh sistem dirancang user-friendly sehingga mudah dikelola bahkan oleh pengguna yang tidak memiliki latar belakang teknis.",

    benefits: [
      "Website responsive dan mobile-friendly",
      "Optimasi SEO agar mudah ditemukan di Google",
      "Desain profesional dan modern",
      "Mudah dikelola untuk update produk atau konten",
      "Cocok untuk UMKM maupun bisnis profesional",
      "Membantu meningkatkan kredibilitas usaha",
    ],

    condition: "Baru",
    origin: "Bandung, Indonesia",
    type: "UMKM Jasa Digital",

    seller: "Bikin Website Murah",

    sellerPhone: "6285722020965",

    sellerDescription:
      "Jasa pembuatan website SEO profesional untuk UMKM dan bisnis dengan fokus pada desain modern, performa cepat, dan optimasi mesin pencari.",
  },

  {
    id: 6,
    name: "SUSU KEFIR PROBIOTIK BANDUNG JATIHANDAP",
    price: 12000,
    category: "Minuman",

    image: "/products/p6.jpg",

    images: [
      "/products/p6.jpg",
      "/products/p6.jpg",
      "/products/p6.jpg",
    ],

    description:
      "Susu kefir probiotik alami yang baik untuk kesehatan pencernaan dan tubuh.",

    about:
      "Kefir Jatihandap dibuat dari susu sapi murni yang difermentasi menggunakan kefir grains berkualitas premium untuk menghasilkan minuman sehat kaya probiotik.",

    story:
      "Produk ini dikembangkan oleh pelaku kesehatan lokal Bandung yang ingin menghadirkan minuman probiotik alami dengan kualitas terbaik.",

    detail:
      "Membantu menjaga kesehatan pencernaan, meningkatkan imun tubuh, dan cocok dikonsumsi setiap hari.",

    benefits: [
      "Mengandung probiotik alami",
      "Baik untuk pencernaan",
      "Dibuat dari susu sapi murni",
      "Diproduksi higienis",
    ],

    condition: "Baru",
    origin: "Bandung, Indonesia",
    type: "UMKM Minuman Sehat",

    seller: "Kefir Jatihandap",

    sellerPhone: "6282116534311",

    sellerDescription:
      "UMKM kesehatan lokal yang fokus pada produk fermentasi alami berkualitas.",
  },

  {
    id: 7,
    name: "Promo Motor Kawasaki Cimahi Ridhwan",
    price: 35000000,
    category: "Otomotif",

    image: "/products/p7.jpg",

    images: [
      "/products/p7.jpg",
      "/products/p7-2.jpg",
      "/products/p7-3.jpg",
    ],

    description:
      "Layanan penjualan motor Kawasaki wilayah Cimahi dengan promo DP ringan, proses cepat, dan konsultasi pembelian gratis.",

    about:
      "RidhwanKawasaki merupakan layanan konsultan penjualan motor Kawasaki di wilayah Cimahi dan sekitarnya yang membantu konsumen mendapatkan unit motor sport, off-road, hingga adventure dengan proses pembelian yang mudah dan transparan. Seluruh layanan difokuskan untuk memberikan pengalaman membeli motor yang nyaman dengan dukungan edukasi produk secara lengkap.",

    story:
      "Berawal dari pengalaman di dunia otomotif roda dua, RidhwanKawasaki hadir untuk membantu masyarakat mendapatkan motor impian dengan pelayanan yang lebih personal. Fokus utamanya adalah memberikan solusi pembelian motor Kawasaki dengan proses cepat, promo menarik, dan pendampingan hingga unit diterima konsumen.",

    detail:
      "Melayani pembelian berbagai tipe motor Kawasaki seperti Ninja Series, KLX Series, W175, hingga Versys. Tersedia layanan konsultasi gratis, simulasi kredit, proses approval leasing, hingga layanan jemput data ke rumah atau kantor konsumen.",

    benefits: [
      "Proses kredit cepat dan anti ribet",
      "Bekerja sama dengan leasing terpercaya",
      "Tersedia promo DP rendah dan angsuran ringan",
      "Bisa konsultasi motor sesuai kebutuhan",
      "Layanan jemput data ke rumah atau kantor",
      "After sales dan service dealer terjamin",
    ],

    condition: "Baru",
    origin: "Cimahi, Indonesia",
    type: "UMKM Otomotif",

    seller: "Ridhwan Kawasaki",

    sellerPhone: "6282266797911",

    sellerDescription:
      "Konsultan penjualan motor Kawasaki wilayah Cimahi yang membantu pembelian motor sport, adventure, dan off-road dengan proses cepat serta promo terbaik.",
  },
]
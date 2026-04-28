import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.masterPrayer.deleteMany();

  await prisma.masterPrayer.createMany({
    data: [
      {
        judul: "Doa Masuk Rumah",
        doa: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ بِاسْمِ اللهِ وَلَجْنَا، وبِاسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا",
        latin: "Allâhumma innî as’aluka khairal maulaji wa khairal makhraji, bismillâhi walajnâ wa bismillâhi kharajnâ wa ‘ala-Llâhi rabbinâ tawakkalnâ",
        terjemahan: "Ya Allah, aku memohon kepada-Mu sebaik-baik tempat masuk dan sebaik-baik tempat keluar. Atas nama-Mu kami masuk dan atas nama-Mu kami keluar. Dan kepada Allah Tuhan kami, kami bertawakal.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Keluar Rumah",
        doa: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        latin: "Bismillâhi tawakkaltu ‘alallâhi wa lâ haula wa lâ quwwata illâ billâh",
        terjemahan: "Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Sebelum Tidur",
        doa: "اَللّٰهُمَّ بِسْمِكَ أَحْيَا وَبِسْمِكَ أَمُوْتُ",
        latin: "Allâhumma bismika ahyâ wa bismika amût",
        terjemahan: "Ya Allah, dengan Nama-Mu aku hidup dan dengan nama-Mu pula aku mati.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Bangun Tidur",
        doa: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ",
        latin: "Alhamdulillâhil ladzî ahyânâ ba’da mâ amâtanâ wa ilaihin nusyûr",
        terjemahan: "Segala puji bagi Allah yang menghidupkanku kembali setelah mematikanku dan hanya kepada-Nya akan bangkit.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Masuk Kamar Mandi",
        doa: "بِسْمِ اللهِ اَللّٰهُمَّ إِنِّيْ أَعُوْذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        latin: "Bismillâhi allâhumma innî a‘ûdzu bika minal khubutsi wal khabâits",
        terjemahan: "Dengan nama Allah, ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Keluar Kamar Mandi",
        doa: "غُفْرَانَكَ الْحَمْدُ لِلّٰهِ الَّذِيْ أَذْهَبَ عَنِّيْ الْأَذَى وَعَافَانِيْ",
        latin: "Ghufrânaka alhamdulillâhil-ladzî adzhaba ‘annil adzâ wa ‘âfânî",
        terjemahan: "Dengan mengharap ampunan-Mu, segala puji bagi Allah yang telah menghilangkan penyakit dari tubuhku dan menyehatkan aku.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Sebelum Makan",
        doa: "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        latin: "Allâhumma bârik lanâ fîmâ razaqtanâ waqinâ ‘adzâban nâr",
        terjemahan: "Ya Allah, berkahilah apa yang telah Engkau anugerahkan kepada kami dan jagalah kami dari siksa neraka.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Sesudah Makan",
        doa: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَــــانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
        latin: "Alhamdulillâhilladzî ath‘amanâ wa saqânâ wa ja‘alanâ minal muslimîn",
        terjemahan: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami sebagai orang-orang muslim.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Masuk Masjid",
        doa: "اَللّٰهُمَّ اغْفِرْ لِيْ ذُنُوْبِيْ وَافْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ",
        latin: "Allâhummaghfir lî dzunûbî waftah lî abwâba rahmatik",
        terjemahan: "Ya Allah, ampuni segala dosaku dan bukalah bagiku segala pintu rahmat-Mu.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Keluar Masjid",
        doa: "اَللّٰهُمَّ اغْفِرْ لِيْ ذُنُوْبِيْ وَافْتَحْ لِيْ أَبْوَابَ فَضْلِكَ",
        latin: "Allâhummaghfirlî dzunûbî waftah lî abwâba fadhlik",
        terjemahan: "Ya Allah, ampuni segala dosaku dan bukakan bagiku segala pintu anugerah-Mu.",
        category: "sehari-hari"
      },
            {
        judul: "Doa Sesudah Adzan",
        doa: "اَللّٰهُمَّ رَبَّ هٰذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ اٰتِ سَيِّدَنَـا مُحَمَّـدًا الْوَسِيْلَةَ وَالْفَضِيْلَةَ وَالدَّرَجَةَ الرَّفِيْعَةَ وَابْعَثْهُ مَقَامًا مَحْمُوْدًا الَّذِيْ وَعَدْتَهُ",
        latin: "Allâhumma Rabba hâdzihid-da‘watit-tâmmati wash-shalâtil-qâimati âti sayyidanâ Muhammadanil wasîlata wal fadlîlata wad darajatar rafî‘ah wab‘ats-hu maqâman mahmûdan",
        terjemahan: "Ya Allah Tuhan pemilik seruan yang sempurna dan shalat yang didirikan, karuniakan Nabi Muhammad wasilah, keutamaan, dan derajat yang tinggi.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Bercermin",
        doa: "اَللّٰهُمَّ كَمَا حَسَّنْتَ خَلْقِيْ فَحَسِّنْ خُلُقِيْ",
        latin: "Allâhumma kamâ hassanta khalqî fahassin khuluqî",
        terjemahan: "Ya Allah, sebagaimana Engkau baguskan rupaku, maka baguskan pula akhlakku.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Mengenakan Pakaian Baru",
        doa: "اَللّٰهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيْهِ أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ وَأَعُوْذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
        latin: "Allâhumma lakal hamdu anta kasautanîhi as-aluka khairahu wa khaira mâ shuni‘a lahû wa a‘ûdzu bika min syarrihi",
        terjemahan: "Ya Allah bagi-Mu segala puji. Aku memohon kebaikan pakaian ini dan berlindung dari keburukannya.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Memakai Pakaian",
        doa: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا هُوَ لَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا هُوَ لَهُ",
        latin: "Allâhumma innî as’aluka min khairihi wa khairi mâ huwa lahu wa a‘ûdzubika min syarrihi",
        terjemahan: "Ya Allah aku memohon kepada-Mu kebaikan pakaian ini dan berlindung dari keburukannya.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Melepas Pakaian",
        doa: "بِسْمِ اللهِ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ",
        latin: "Bismillâhil ladzî lâ ilâha illâ huwa",
        terjemahan: "Dengan nama Allah yang tiada Tuhan selain Dia.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Saat Turun Hujan",
        doa: "اَللّٰهُمَّ صَيِّبًا نَافِعًا",
        latin: "Allâhummâ shayyiban nâfi‘an",
        terjemahan: "Ya Allah, turunkanlah pada kami hujan yang bermanfaat.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Setelah Hujan Reda",
        doa: "مُطِرْنَا بِفَضْلِ اللهِ وَرَحْمَتِهِ",
        latin: "Muthirnâ bi fadhlillâhi wa rahmatih",
        terjemahan: "Semoga kita dihujani dengan anugerah dan rahmat Allah.",
        category: "sehari-hari"
      },
      {
        judul: "Doa untuk Kedua Orang Tua",
        doa: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
        latin: "Rabbighfir lî wa liwâlidayya warhamhumâ kamâ rabbayânî shaghîrâ",
        terjemahan: "Tuhanku, ampunilah diriku dan kedua orang tuaku, sayangilah mereka sebagaimana mereka menyayangiku di waktu aku kecil.",
        category: "sehari-hari"
      },
      {
        judul: "Doa Masuk Pasar atau Mall",
        doa: "بِاسْمِ اللّٰهِ، اَللّٰهُمَّ إنِّيْ أَسْأَلُكَ خَيْرَ هٰذِهِ السُّوْقِ وَخَيْرَ مَا فِيْهَا",
        latin: "Bismillâh allâhumma innî as-aluka khaira hâdzihis-sûqi wa khaira mâ fîhâ",
        terjemahan: "Ya Allah, aku memohon kebaikan dari pasar ini dan apa yang ada di dalamnya.",
        category: "sehari-hari"
      },

      {
        judul: "Niat Haji",
        doa: "نَوَيْتُ الْحَجَّ وَأَحْرَمْتُ بِهِ لِلّٰهِ تَعَــالَى",
        latin: "Nawaitul hajja wa ahramtu bihî lillâhi ta‘âlâ",
        terjemahan: "Aku niat melaksanakan haji dan berihram karena Allah ta‘ala.",
        category: "haji"
      },
      {
        judul: "Doa Selesai Berihram",
        doa: "اَللّٰهُمَّ أُحَرِّمُ شَعْرِيْ وَبَشَرِيْ وَجَسَدِيْ وَجَمِيْعَ جَوَارِحِيْ",
        latin: "Allâhumma uharrimu sya‘rî wa basyarî wa jasadî wa jamî‘a jawârihî",
        terjemahan: "Ya Allah aku mengharamkan rambut, kulit, tubuh, dan seluruh anggota tubuhku dari semua yang Kauharamkan bagi orang berihram.",
        category: "haji"
      },
      {
        judul: "Lafal Talbiyah",
        doa: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ",
        latin: "Labbaika-llâhumma labbaik, labbaika lâ syarîka laka labbaik",
        terjemahan: "Aku datang memenuhi panggilan-Mu ya Allah, tiada sekutu bagi-Mu.",
        category: "haji"
      },
      {
        judul: "Doa Memasuki Kota Makkah",
        doa: "اَللّٰهُمَّ هٰذَا حَرَمُكَ وَأَمْنُكَ فَحَرِّمْ لَحْمِيْ وَدَمِيْ",
        latin: "Allâhumma hâdzâ haramuka wa amnuka faharrim lahmî wa damî",
        terjemahan: "Ya Allah, ini adalah tanah haram-Mu dan tempat aman-Mu. Haramkanlah dagingku dan darahku dari api neraka.",
        category: "haji"
      },
      {
        judul: "Doa Masuk Masjidil Haram",
        doa: "اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
        latin: "Allâhumma antassalâm waminkas-salâm",
        terjemahan: "Ya Allah Engkaulah Dzat yang memberi keselamatan, dari-Mu keselamatan datang.",
        category: "haji"
      },
            {
        judul: "Doa ketika Melihat Ka'bah",
        doa: "اَللّٰهُمَّ زِدْ هٰذَا الْبَيْتَ تَشْرِيْفًا وَتَعْظِيْمًا",
        latin: "Allâhumma zid hâdzal baita tasyrîfan wa ta‘dhîman",
        terjemahan: "Ya Allah, tambahkanlah kemuliaan, kehormatan, dan keagungan pada Baitullah ini.",
        category: "haji"
      },
      {
        judul: "Doa Tawaf",
        doa: "سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ وَلَا إِلٰهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ",
        latin: "Subhânallâhi walhamdulillâhi wa lâ ilâha illallâhu wallâhu akbar",
        terjemahan: "Mahasuci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, Allah Mahabesar.",
        category: "haji"
      },
      {
        judul: "Doa Sa'i",
        doa: "اَللهُ أَكْبَرُ كَبِيْرًا وَالْحَمْدُ لِلّٰهِ كَثِيرًا",
        latin: "Allâhu akbar kabîran walhamdulillâhi katsîran",
        terjemahan: "Allah Mahabesar, segala puji bagi-Nya sebanyak-banyaknya.",
        category: "haji"
      },
      {
        judul: "Doa Menggunting Rambut",
        doa: "اَللّٰهُمَّ اثْبُتْ لِيْ بِكُلِّ شَعْرَةٍ حَسَنَةً",
        latin: "Allâhumma-tsbut lî bi kulli sya‘ratin hasanatan",
        terjemahan: "Ya Allah, tetapkanlah kebaikan untukku lantaran setiap helai rambut ini.",
        category: "haji"
      },
      {
        judul: "Doa ketika Masuk Arafah",
        doa: "اَللّٰهُمَّ إِلَيْكَ تَوَجَّهْتُ، وَبِكَ اعْتَصَمْتُ، وَعَلَيْكَ تَوَكَّلْتُ",
        latin: "Allâhumma ilaika tawajjahtu wabika‘tashamtu wa‘alaika tawakkaltu",
        terjemahan: "Ya Allah, hanya kepada-Mulah aku menghadap, dengan-Mulah aku berpegang teguh, pada-Mulah aku berserah diri.",
        category: "haji"
      },
      {
        judul: "Doa Wukuf",
        doa: "اَللّٰهُمَّ لَكَ الْحَمْدُ كَالَّذِيْ تَقُوْلُ وَخَيْرًا مِمَّا نَقُوْلُ",
        latin: "Allâhumma lakal hamdu kalladzî taqûlu wa khairan mimmâ naqûlu",
        terjemahan: "Ya Allah, segala puji bagi-Mu seperti Engkau memuji diri-Mu.",
        category: "haji"
      },
      {
        judul: "Doa ketika Sampai di Muzdalifah",
        doa: "اَللّٰهُمَّ إِنَّ هٰذِهِ مُزْدَلِفَةُ جُمِعَتْ فِيْهَا أَلْسِنَةٌ مُخْتَلِفَةٌ",
        latin: "Allâhumma inna hâdzihi muzdalifatu jumi‘at fîhâ alsinatun mukhtalifah",
        terjemahan: "Ya Allah, sesungguhnya di Muzdalifah ini telah berkumpul berbagai bahasa yang memohon kepada-Mu.",
        category: "haji"
      },
      {
        judul: "Doa ketika Sampai di Mina",
        doa: "اَللّٰهُمَّ هٰذَا مِنَى فَامْنُنْ عَلَيَّ",
        latin: "Allâhumma hâdzâ minâ famnun ‘alayya",
        terjemahan: "Ya Allah, tempat ini adalah Mina, anugerahkanlah kepadaku rahmat-Mu.",
        category: "haji"
      },
      {
        judul: "Doa Melontar Jamrah",
        doa: "بِسْمِ اللهِ وَاللهُ أَكْبَرُ رَجْمًا لِلشَّيَاطِيْنِ",
        latin: "Bismillâhi wallâhu akbar rajman lisysyayâthîn",
        terjemahan: "Dengan nama Allah, Allah Mahabesar. Laknat bagi setan dan keridhaan bagi Allah.",
        category: "haji"
      },
      {
        judul: "Doa Masuk Kota Madinah",
        doa: "اَللّٰهُمَّ هٰذَا حَرَمُ رَسُولِكَ",
        latin: "Allâhumma hâdzâ haramu rasûlika",
        terjemahan: "Ya Allah, negeri ini adalah tanah haram Rasul-Mu.",
        category: "haji"
      },
      {
        judul: "Doa Masuk Masjid Nabawi",
        doa: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ أَعُوْذُ بِاللهِ الْعَظِيمِ",
        latin: "Bismillahir rahmânir rahîm a‘ûdzubillâhil ‘adhîm",
        terjemahan: "Dengan nama Allah Yang Maha Pengasih Maha Penyayang, aku berlindung kepada Allah Yang Mahaagung.",
        category: "haji"
      },
      {
        judul: "Doa ketika Pulang Haji/Umrah",
        doa: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        latin: "Lâ ilâha illallâhu wahdahu lâ syarîka lah",
        terjemahan: "Tiada Tuhan kecuali Allah Yang Esa, tiada sekutu bagi-Nya.",
        category: "haji"
      },

      {
        judul: "Niat Umroh",
        doa: "نَوَيْتُ الْعُمْرَةَ وَأَحْرَمْتُ بِهَا لِلّٰهِ تَعَالَى",
        latin: "Nawaitul ‘umrata wa ahramtu bihâ lillâhi ta‘âlâ",
        terjemahan: "Aku niat melaksanakan umrah dan berihram karena Allah ta‘ala.",
        category: "umroh"
      },
      {
        judul: "Lafal Talbiyah",
        doa: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ",
        latin: "Labbaika-llâhumma labbaik",
        terjemahan: "Aku datang memenuhi panggilan-Mu ya Allah.",
        category: "umroh"
      },
      {
        judul: "Doa Memasuki Kota Makkah",
        doa: "اَللّٰهُمَّ هٰذَا حَرَمُكَ وَأَمْنُكَ",
        latin: "Allâhumma hâdzâ haramuka wa amnuka",
        terjemahan: "Ya Allah, ini tanah haram-Mu dan tempat aman-Mu.",
        category: "umroh"
      },
      {
        judul: "Doa Masuk Masjidil Haram",
        doa: "اَللّٰهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
        latin: "Allâhumma antassalâm waminkas-salâm",
        terjemahan: "Ya Allah Engkaulah sumber keselamatan.",
        category: "umroh"
      },
      {
        judul: "Doa ketika Melihat Ka'bah",
        doa: "اَللّٰهُمَّ زِدْ هٰذَا الْبَيْتَ تَشْرِيْفًا",
        latin: "Allâhumma zid hâdzal baita tasyrîfan",
        terjemahan: "Ya Allah tambahkanlah kemuliaan pada Baitullah ini.",
        category: "umroh"
      },
      {
        judul: "Doa Tawaf",
        doa: "سُبْحَانَ اللهِ وَالْحَمْدُ لِلّٰهِ",
        latin: "Subhânallâhi walhamdulillâh",
        terjemahan: "Mahasuci Allah dan segala puji bagi Allah.",
        category: "umroh"
      },
      {
        judul: "Doa Sa'i",
        doa: "اَللهُ أَكْبَرُ كَبِيْرًا",
        latin: "Allâhu akbar kabîran",
        terjemahan: "Allah Mahabesar sebesar-besarnya.",
        category: "umroh"
      },
      {
        judul: "Doa Menggunting Rambut",
        doa: "اَللّٰهُمَّ اثْبُتْ لِيْ بِكُلِّ شَعْرَةٍ حَسَنَةً",
        latin: "Allâhumma-tsbut lî bi kulli sya‘ratin hasanah",
        terjemahan: "Ya Allah tetapkanlah kebaikan untukku pada setiap helai rambut ini.",
        category: "umroh"
      },
      {
        judul: "Doa Masuk Kota Madinah",
        doa: "اَللّٰهُمَّ هٰذَا حَرَمُ رَسُولِكَ",
        latin: "Allâhumma hâdzâ haramu rasûlika",
        terjemahan: "Ya Allah negeri ini adalah tanah haram Rasul-Mu.",
        category: "umroh"
      },
      {
        judul: "Doa Masuk Masjid Nabawi",
        doa: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
        latin: "Bismillahir rahmânir rahîm",
        terjemahan: "Dengan nama Allah Yang Maha Pengasih Maha Penyayang.",
        category: "umroh"
      }
    ],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
"use client";
import { useEffect, useState } from "react";
import { Bookmark, User, Search, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [masterDoa, setMasterDoa] = useState<any[]>([]);
  const [savedBookmarks, setSavedBookmarks] = useState<number[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState("sehari-hari");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const router = useRouter();

  const fetchMasterDoa = async (category: string) => {
    try {
      setCategoryLoading(true);

      const res = await fetch(`/api/master-prayer/${category}`);
      const data = await res.json();
      setMasterDoa(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    const id = Number(localStorage.getItem("userId"));
    setUserId(id);
  }, []);

  useEffect(() => {
    fetchMasterDoa(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (userId !== 0) {
      fetchSavedBookmarks();
    }
  }, [userId]);
  const fetchSavedBookmarks = async () => {
    try {
      const res = await fetch(`/api/bookmark/${userId}`);
      const data = await res.json();

      const ids = data
        .filter((item: any) => item.masterPrayerId)
        .map((item: any) => item.masterPrayerId);

      setSavedBookmarks(ids);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookmark = async (doa: any) => {
    try {
      await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          masterPrayerId: doa.id,
        }),
      });

      await fetchSavedBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDoa = masterDoa.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()) ||
    item.latin.toLowerCase().includes(search.toLowerCase()) ||
    item.terjemahan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] overflow-y-auto shadow-xl relative">

        {/* HEADER */}
        <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-white z-50 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#51309E] rounded-lg flex flex-col items-center justify-center overflow-hidden shrink-0">
              <div className="w-5 h-1.5 bg-[#A6CE39] mb-0.5 rounded-sm"></div>
              <div className="w-5 h-4 bg-[#A6CE39] rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[#51309E]">Holy</span>
              <span className="text-[#A6CE39]">Go</span>
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.75 }}
              onClick={() => router.push("/bookmark")}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Bookmark className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.75 }}
              onClick={() => router.push("/settings")}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <User className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
            </motion.button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-5 pt-6 pb-24">

          {/* SEARCH */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for prayers..."
              className="w-full h-14 bg-[#F3F4F6] rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#51309E]/10 transition-all"
            />
          </div>

          {/* KATEGORI */}
          <div className="mb-10">
            <h2 className="text-[10px] font-black text-[#8E9AAF] uppercase tracking-[0.2em] mb-4 ml-1">
              KATEGORI
            </h2>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                { nama: "Sehari-hari", slug: "sehari-hari", icon: "🌙" },
                { nama: "Haji", slug: "haji", icon: "🕋" },
                { nama: "Umroh", slug: "umroh", icon: "🕌" },
                { nama: "Dzikir", slug: "dzikir", icon: "📿" },
                { nama: "Sholat", slug: "sholat", icon: "🤲" },
              ].map((item, i) => {
                const isActive = activeCategory === item.slug;

                return (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => setActiveCategory(item.slug)}
                    className={`w-[100px] h-[100px] flex-shrink-0 flex flex-col items-center justify-center rounded-[24px] border cursor-pointer transition-all ${isActive
                        ? "bg-[#F3EEFF] border-[#51309E] shadow-sm"
                        : "bg-[#F8F9FB] border-gray-50"
                      }`}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>

                    <span
                      className={`text-[11px] font-bold ${isActive ? "text-[#51309E]" : "text-[#3D4759]"
                        }`}
                    >
                      {item.nama}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* DOA */}
          <div>
            <div className="flex justify-between items-center mb-5 px-1">


              <motion.button
                onClick={() => router.push("/tambah-doa")}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#51309E]"
              >
                <PlusCircle className="w-4 h-4" />
                Tambah Doa
              </motion.button>
            </div>

            {categoryLoading ? (
              <p className="text-center text-gray-400 mt-10">Loading prayers...</p>
            ) : filteredDoa.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm text-center">
                <p className="text-lg font-bold text-[#51309E] mb-2">Doa tidak ditemukan</p>
                <p className="text-gray-400">
                  Coba gunakan kata kunci lain...
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredDoa.map((item, index) => {
                  const isSaved = savedBookmarks.includes(item.id);

                  return (
                    <div
                      key={index}
                      onClick={() => router.push(`/prayer/${item.id}?source=master`)}
                      className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm cursor-pointer active:scale-[0.98] transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="font-bold text-lg">{item.judul}</h2>

                        <button onClick={() => handleBookmark(item)}>
                          <Bookmark
                            className={`w-5 h-5 ${isSaved ? "text-[#51309E] fill-[#51309E]" : "text-black"
                              }`}
                          />
                        </button>
                      </div>

                      <p className="text-right text-2xl leading-loose mb-5 font-serif">
                        {item.doa}
                      </p>

                      <p className="italic text-gray-400 mb-4">{item.latin}</p>

                      <p className="text-[#3D4759]">{item.terjemahan}</p>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
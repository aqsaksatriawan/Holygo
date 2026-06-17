"use client";
import { useEffect, useState } from "react";
import { Bookmark, User, Users, Search, PlusCircle, Clock, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [savedBookmarks, setSavedBookmarks] = useState<number[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const defaultCategories = [
    { nama: "Sehari-hari", slug: "sehari-hari", icon: "🌙" },
    { nama: "Haji", slug: "haji", icon: "🕋" },
    { nama: "Umrah", slug: "umroh", icon: "🕌" },
  ];
  const initialCategories = [
    ...defaultCategories,
    { nama: "Thawaf & Sa'i", slug: "thawaf-sai", icon: "users" },
  ];
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [customCategoriesLoaded, setCustomCategoriesLoaded] = useState(false);
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem("holygo_search_history");
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }
  }, [isSearching]);

  useEffect(() => {
    if (isSearching) {
      const fetchSearchResults = async () => {
        try {
          setSearchLoading(true);
          const res = await fetch(`/api/master-prayer?q=${encodeURIComponent(search)}`);
          const data = await res.json();
          setSearchResults(data);
        } catch (error) {
          console.log(error);
        } finally {
          setSearchLoading(false);
        }
      };

      const delayDebounceFn = setTimeout(() => {
        fetchSearchResults();
      }, 200);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, isSearching]);

  const addToHistory = (prayer: any) => {
    const history = localStorage.getItem("holygo_search_history");
    let currentHistory: any[] = [];
    if (history) {
      try {
        currentHistory = JSON.parse(history);
      } catch (e) {
        console.error(e);
      }
    }
    currentHistory = currentHistory.filter((item: any) => item.id !== prayer.id);
    currentHistory.unshift({
      id: prayer.id,
      judul: prayer.judul,
      category: prayer.category
    });
    currentHistory = currentHistory.slice(0, 5);
    localStorage.setItem("holygo_search_history", JSON.stringify(currentHistory));
    setSearchHistory(currentHistory);
  };

  const clearHistory = () => {
    localStorage.removeItem("holygo_search_history");
    setSearchHistory([]);
  };

  const removeHistoryItem = (id: number) => {
    const history = localStorage.getItem("holygo_search_history");
    if (!history) return;

    let currentHistory: any[] = [];
    try {
      currentHistory = JSON.parse(history);
    } catch (e) {
      console.error(e);
      return;
    }

    const updatedHistory = currentHistory.filter((item: any) => item.id !== id);
    localStorage.setItem("holygo_search_history", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  const handleSelectPrayer = (prayer: any) => {
    addToHistory(prayer);
    router.push(`/prayer/${prayer.id}?source=master`);
  };

  useEffect(() => {
    const id = Number(localStorage.getItem("userId"));
    setUserId(id);
  }, []);

  // load custom categories from localStorage and merge with defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem("holygo_custom_categories");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories([
            ...initialCategories,
            ...parsed.filter((custom: any) => !initialCategories.some((item) => item.slug === custom.slug)),
          ]);
        }
      }
    } catch (e) {
      console.error("Failed to load custom categories", e);
    } finally {
      setCustomCategoriesLoaded(true);
    }
  }, []);

  // ensure activeCategory exists in categories
  useEffect(() => {
    if (!customCategoriesLoaded) return;
    if (activeCategory && !categories.find((c) => c.slug === activeCategory) && categories.length > 0) {
      setActiveCategory(null);
    }
  }, [categories, customCategoriesLoaded, activeCategory]);

  const deleteCategory = (slug: string) => {
    try {
      const stored = localStorage.getItem("holygo_custom_categories");
      const custom = stored ? JSON.parse(stored) : [];
      const updatedCustom = custom.filter((c: any) => c.slug !== slug);
      localStorage.setItem("holygo_custom_categories", JSON.stringify(updatedCustom));
      setCategories([
        ...initialCategories,
        ...updatedCustom.filter((custom: any) => !initialCategories.some((item) => item.slug === custom.slug)),
      ]);
      if (activeCategory === slug) {
        setActiveCategory(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsSearching(true)}
                placeholder="Cari doa..."
                className="w-full h-14 bg-[#F3F4F6] rounded-2xl pl-12 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#51309E]/10 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/50 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {isSearching && (
              <button
                onClick={() => {
                  setIsSearching(false);
                  setSearch("");
                }}
                className="text-sm font-bold text-[#51309E] hover:text-purple-700 active:scale-95 transition-all shrink-0 pr-1"
              >
                Batal
              </button>
            )}
          </div>

          {isSearching ? (
            <div className="animate-fadeIn">
              {/* HEADER PENCARIAN & HAPUS */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider">PENCARIAN</span>
                {searchHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs font-semibold text-blue-500 hover:text-blue-600 active:scale-95 transition"
                  >
                    Hapus Semua
                  </button>
                )}
              </div>

              {/* TERAKHIR DICARI */}
              {searchHistory.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs text-gray-400 font-medium mb-3">Terakhir dicari</h3>
                  <div className="space-y-2.5">
                    {searchHistory.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:scale-[0.98] transition shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHistoryItem(item.id);
                          }}
                          className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                          aria-label={`Hapus histori ${item.judul}`}
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div
                          onClick={() => handleSelectPrayer(item)}
                          className="flex-1 pl-3 pr-2 cursor-pointer"
                        >
                          <span className="font-medium italic text-gray-600 text-[14px]">
                            {item.judul}
                          </span>
                        </div>

                        <Clock className="w-4.5 h-4.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HASIL */}
              {search.length > 0 && (
                <div>
                  <h3 className="text-xs text-gray-400 font-medium mb-3">Hasil</h3>
                  {searchLoading ? (
                    <p className="text-center text-gray-400 py-6 text-sm">Mencari doa...</p>
                  ) : searchResults.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-[28px] p-8 text-center shadow-sm">
                      <p className="text-lg font-bold text-[#51309E] mb-2">Doa tidak ditemukan</p>
                      <p className="text-gray-400">Coba gunakan kata kunci lain...</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectPrayer(item)}
                          className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                        >
                          <span className="font-semibold text-gray-800 text-[14px]">
                            {item.judul}
                          </span>
                          <ArrowRight className="w-4.5 h-4.5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* KATEGORI */}
                <div className="mb-2">
                  <h2 className="text-sm font-semibold text-[#6B7280] mb-2">Kategori</h2>
                  <motion.button
                    onClick={() => router.push("/tambah-doa")}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#51309E] mb-4"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Tambah Doa
                  </motion.button>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  {defaultCategories.map((item, i) => {
                    const isActive = activeCategory === item.slug;

                    return (
                      <motion.div
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        onClick={() => router.push(`/category/${item.slug}`)}
                        className={`relative flex flex-col items-center justify-center rounded-xl border p-4 cursor-pointer transition-all text-center ${isActive
                          ? "bg-[#F3EEFF] border-[#51309E] shadow-sm"
                          : "bg-[#FBFCFD] border-gray-50"
                        }`}
                      >
                        <div className="text-2xl mb-3">{item.icon}</div>
                        <span className={`text-[12px] font-semibold ${isActive ? "text-[#51309E]" : "text-[#3D4759]"}`}>
                          {item.nama}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => router.push(`/category/thawaf-sai`)}
                    className="relative flex flex-col items-center justify-center rounded-xl border p-4 cursor-pointer transition-all text-center bg-[#FBFCFD] border-gray-50"
                  >
                    <div className="w-14 h-14 mb-3">
                      <svg viewBox="0 0 64 64" className="w-full h-full">
                        <rect x="8" y="16" width="48" height="32" rx="9" fill="#111827" />
                        <path d="M8 16L32 4L56 16V20H8V16Z" fill="#111827" />
                        <path d="M12 20H52" stroke="#FBBF24" strokeWidth="4" />
                        <path d="M16 24H48" stroke="#FBBF24" strokeWidth="3" />
                        <path d="M16 36H48" stroke="#F59E0B" strokeWidth="3" />
                        <path d="M20 28C20 24 24 20 32 20C40 20 44 24 44 28" stroke="#FBBF24" strokeWidth="2" fill="none" />
                        <circle cx="24" cy="54" r="5" fill="#2563EB" />
                        <rect x="21" y="44" width="6" height="14" rx="3" fill="#FFFFFF" />
                        <circle cx="40" cy="54" r="5" fill="#2563EB" />
                        <rect x="37" y="44" width="6" height="14" rx="3" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <span className="text-[12px] font-semibold text-[#3D4759]">Thawaf & Sa'i</span>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => router.push("/bookmark")}
                    className="flex flex-col items-center justify-center rounded-xl border p-4 cursor-pointer transition-all text-center bg-[#FBFCFD] border-gray-50"
                  >
                    <div className="text-2xl mb-3">
                      <Bookmark className="w-6 h-6 text-[#51309E]" />
                    </div>
                    <span className="text-[12px] font-semibold text-[#3D4759]">Bookmark</span>
                  </motion.div>

                  <div></div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}
import DetectorCard from "../components/DetectorCard";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">
      
      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />

      <DetectorCard />
    </main>
  );
}

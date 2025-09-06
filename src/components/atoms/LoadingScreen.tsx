import { Loader2 } from "lucide-react"; // from lucide-react


export const LoadingScreen2 = () => {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Floating Blobs */}
        <div className="absolute h-72 w-72 rounded-full bg-blue-300/20 blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute h-60 w-60 rounded-full bg-purple-300/20 blur-3xl animate-pulse delay-200 top-1/3 right-1/3"></div>
        <div className="absolute h-80 w-80 rounded-full bg-pink-300/20 blur-3xl animate-pulse delay-500 bottom-1/4 left-1/3"></div>
  
        {/* Content */}
        <div className="z-10 flex flex-col items-center gap-4">
          <div className="text-3xl font-extrabold text-indigo-700">Formify</div>
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-sm text-gray-600">Getting things ready for you...</p>
        </div>
      </div>
    );
  };
  
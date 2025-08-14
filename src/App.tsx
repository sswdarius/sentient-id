import { useState, useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
import Form from "./components/Form";
import IDCard from "./components/IDCard";
import flags from "emoji-flags";

let debounceTimer: NodeJS.Timeout;

function App() {
  const [fullName, setFullName] = useState("");
  const [xHandle, setXHandle] = useState("");
  const [role, setRole] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [countryName, setCountryName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [offset, setImageOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isManualUpload, setIsManualUpload] = useState(false);

  const countryData = (flags.data as any[]).find((c) =>
    c.name.toLowerCase() === countryName.toLowerCase()
  );

  const country = {
    name: countryName,
    code: countryData?.code || "",
  };

  useEffect(() => {
    if (!xHandle || isManualUpload) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const imageUrl = `/api/unavatar-proxy?handle=${xHandle}`;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          setProfileImage(dataURL);
        }
      };
      img.onerror = (err) => {
        console.error("Image load error:", err);
        setProfileImage("");
      };
    }, 300);
  }, [xHandle, isManualUpload]);

  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    domtoimage
      .toPng(cardRef.current)
      .then((dataUrl: string) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${fullName || "sentient-id"}.png`;
        link.click();
      })
      .catch((err: any) => {
        console.error("Download error", err);
      });
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] p-6 overflow-hidden flex flex-col justify-between relative">


      
      <img
        src="/logo.png"
        alt="Logo"
        className="absolute z-50"
        style={{
          top: "-20px",
          left: "5px",
          width: "200px",
          opacity: 1,
          pointerEvents: "none",
        }}
      />

      <div>
        <h1 className="text-3xl font-bold text-center text-neutral-800 mt-6 mb-10">
          Sentient ID Card Generator
        </h1>

        <div className="flex flex-row gap-10 max-w-7xl mx-auto">
          
          
          <div className="relative w-[400px] flex-shrink-0 transform -translate-x-32">

            
  <img
  src="/dobby.png"
  alt="Dobbyyyyyyyyyyyyy"
  className="absolute hover:animate-bounce"
  style={{
    top: "-86px",
    left: "260px", 
    width: "196px", 
    height: "196px",
    cursor: "pointer"
  }}
/>


            
            <div className="bg-white p-6 mt-16 rounded-xl shadow-md h-fit">
              <Form
                fullName={fullName}
                setFullName={setFullName}
                xHandle={xHandle}
                setXHandle={(val) => {
                  setXHandle(val);
                  setIsManualUpload(false);
                }}
                role={role}
                setRole={setRole}
                joinDate={joinDate}
                setJoinDate={setJoinDate}
                country={countryName}
                setCountry={setCountryName}
                setProfileImage={(val) => {
                  setProfileImage(val);
                  setIsManualUpload(true);
                }}
                setImageOffset={setImageOffset}
                setZoom={setZoom}
              />
            </div>
          </div>

          
          <div className="flex-1 flex flex-col items-center transform translate-x-0">
            <div
              ref={cardRef}
              className="w-[1011px] h-[639px] relative"
              style={{
                transform: "scale(1)",
                transformOrigin: "top left",
                WebkitFontSmoothing: "antialiased",
                boxSizing: "border-box",
                backgroundColor: "transparent",
              }}
            >
              <IDCard
                fullName={fullName}
                xHandle={xHandle}
                role={role}
                joinDate={joinDate}
                country={country}
                profileImage={profileImage}
                offsetX={offset.x}
                offsetY={offset.y}
                zoom={zoom}
              />
            </div>

            <button
              className="mt-7 px-6 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-800 transition"
              onClick={downloadCard}
            >
              Download Card
            </button>
          </div>
        </div>
      </div>

      
      <footer className="text-center text-base text-gray-500 py-1">
        <p>
          Built by{" "}
          <a
            href="https://x.com/fuwiadsad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @dsad
          </a>{" "}
          &{" "}
          <a
            href="https://x.com/0xMaje"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @Maje
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

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
      const imageUrl = `https://unavatar.io/twitter/${xHandle}`;

      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setProfileImage(base64data);
          };
          reader.readAsDataURL(blob);
        })
        .catch((err) => {
          console.error("Image fetch error:", err);
          setProfileImage("");
        });
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mt-10 mb-14">
        Sentient ID Generator
      </h1>

      <div className="flex flex-row gap-10 max-w-7xl mx-auto">
        {/* Form panel */}
        <div className="w-[400px] flex-shrink-0 bg-white p-6 rounded-xl shadow-md transform -translate-x-32 h-fit">
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

        {/* Kart panel */}
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
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            onClick={downloadCard}
          >
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

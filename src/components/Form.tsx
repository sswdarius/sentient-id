import React, { useState, useRef } from "react";
import flags from "emoji-flags";

interface FormProps {
  fullName: string;
  setFullName: (val: string) => void;
  xHandle: string;
  setXHandle: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  joinDate: string;
  setJoinDate: (val: string) => void;
  country: string;
  setCountry: (val: string) => void;
  setProfileImage: (val: string) => void;
  setImageOffset: (val: { x: number; y: number }) => void;
  setZoom: (val: number) => void;
}

const Form: React.FC<FormProps> = ({
  fullName,
  setFullName,
  xHandle,
  setXHandle,
  role,
  setRole,
  joinDate,
  setJoinDate,
  country,
  setCountry,
  setProfileImage,
  setImageOffset,
  setZoom,
}) => {
  const countryList = (flags.data as any[]).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setUploadedImage(result);
      setProfileImage(result);
      setImageOffset({ x: offsetX, y: offsetY });
      setZoom(zoomLevel);
    };
    reader.readAsDataURL(file);
  };

  const startDrag = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX - offsetX;
    startY.current = e.clientY - offsetY;
  };

  const duringDrag = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const newX = e.clientX - startX.current;
    const newY = e.clientY - startY.current;
    setOffsetX(newX);
    setOffsetY(newY);
    setImageOffset({ x: newX, y: newY });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);
    setZoom(newZoom);
  };

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* X Handle */}
      <div>
        <label className="block text-sm font-medium text-gray-700">X Handle</label>
        <input
          type="text"
          value={xHandle}
          onChange={(e) => setXHandle(e.target.value.replace(/^@/, ""))}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          <option value="">Select Role</option>
          <option>Artist L1</option>
          <option>Artist L2</option>
          <option>Artist L3</option>
          <option>Builder L1</option>
          <option>Builder L2</option>
          <option>Builder L3</option>
          <option>Helper L1</option>
          <option>Helper L2</option>
          <option>Helper L3</option>
          <option>Educator L1</option>
          <option>Educator L2</option>
          <option>Educator L3</option>
          <option>Early AGI</option>
          <option>Advanced AGI</option>
          <option>Sentient AGI</option>
        </select>
      </div>

      {/* Join Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Join Date</label>
        <input
          type="date"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          <option value="">Select a country</option>
          {countryList.map((c: any) => (
            <option key={c.code} value={c.name}>
              {c.name} {c.emoji}
            </option>
          ))}
        </select>
      </div>

      {/* Alternative Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alternative Profile Picture (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-white hover:file:bg-gray-100"
        />

        {uploadedImage && (
          <div className="mt-4">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-400 bg-gray-100 cursor-move mx-auto"
              onMouseDown={startDrag}
              onMouseMove={duringDrag}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="absolute pointer-events-none"
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`,
                  transformOrigin: "top left",
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>

            {/* Zoom slider */}
            <div className="mt-2 flex flex-col items-center">
              <label className="text-sm text-gray-600 mb-1">Zoom</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.01"
                value={zoomLevel}
                onChange={handleZoomChange}
                className="w-32"
              />
            </div>

            <p className="text-xs text-gray-500 text-center mt-1">
              Drag image to reposition within the circle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;

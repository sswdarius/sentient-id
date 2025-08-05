import React from "react";

interface IDCardProps {
  fullName: string;
  xHandle: string;
  role: string;
  joinDate: string;
  country: {
    name: string;
    code: string;
  };
  profileImage: string;
  offsetX: number;
  offsetY: number;
  zoom: number;
}

const getTemplateByRole = (role: string): string => {
  if (role === "Early AGI") return "/template-purple.png";
  if (role === "Advanced AGI") return "/template-green.png";
  if (role === "Sentient AGI") return "/template-gold.png";
  return "/template-gray.png";
};

const IDCard: React.FC<IDCardProps> = ({
  fullName,
  xHandle,
  role,
  joinDate,
  country,
  profileImage,
  offsetX,
  offsetY,
  zoom,
}) => {
  const backgroundImage = getTemplateByRole(role);

  return (
    <div
      className="w-[1011px] h-[639px] relative rounded-xl shadow overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        transform: "translateZ(0)",
        willChange: "transform",
        fontSmooth: "always",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {profileImage && (
        <div className="absolute top-[245px] left-[120px] w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white">
          <img
            src={profileImage}
            alt="Profile"
            className="absolute"
            style={{
              left: offsetX,
              top: offsetY,
              width: 150 * zoom,
              height: 150 * zoom,
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Full Name */}
<p className="absolute top-[229px] left-[450px] text-white text-xl font-inter font-bold">
  {fullName}
</p>

{/* X Handle */}
<p className="absolute top-[292px] left-[493px] text-white text-xl font-inter font-bold">
  @{xHandle}
</p>

{/* Role */}
<p className="absolute top-[357px] left-[438px] text-white text-xl font-inter font-bold">
  {role}
</p>

{/* Join Date */}
<p className="absolute top-[423px] left-[500px] text-white text-xl font-inter font-bold">
  {joinDate}
</p>

{/* Country */}
<div className="absolute top-[486px] left-[490px] text-white text-xl font-inter font-bold flex items-center gap-2">
  {country.code && (
    <img
      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
      alt={country.name}
      style={{ width: "20px", height: "15px", borderRadius: "2px" }}
    />
  )}
  <span>{country.name}</span>
</div>
    </div>
  );
};

export default IDCard;

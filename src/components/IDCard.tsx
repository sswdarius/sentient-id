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
  if (role === "Homo Sentient") return "/homosentient.png";
  if (role === "Early AGI") return "/earlyagi.png";
  if (role === "Advanced AGI") return "/advancedagi.png";
  if (role === "Sentient AGI") return "/sentientagi.png";
  if (role === "Moderator") return "/moderator.png";
  if (role === "Sentient Team") return "/sentientteam.png";
  return "/homosentient.png";
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
        <div className="absolute top-[205px] left-[70px] w-[230px] h-[230px] rounded-full overflow-hidden border-4 border-white">
          <img
            src={profileImage}
            alt="Profile"
            className="absolute"
            style={{
              left: offsetX,
              top: offsetY,
              width: 225 * zoom,
              height: 225 * zoom,
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Full Name */}
<p className="absolute top-[239px] left-[525px] text-white text-xl font-inter font-bold">
  {fullName}
</p>

{/* X Handle */}
<p className="absolute top-[302px] left-[470px] text-white text-xl font-inter font-bold">
  @{xHandle}
</p>

{/* Role */}
<p className="absolute top-[363px] left-[414px] text-white text-xl font-inter font-bold">
  {role}
</p>

{/* Join Date */}
<p className="absolute top-[424px] left-[470px] text-white text-xl font-inter font-bold">
  {joinDate}
</p>

{/* Country */}
<div className="absolute top-[485px] left-[460px] text-white text-xl font-inter font-bold flex items-center gap-2">
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

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
     <div style={{ fontFamily: 'power' }}>
  <p
    className="absolute top-[230px] left-[525px]"
    style={{ fontSize: "32px", color: "white" }}
  >
    {fullName}
  </p>

  <p
    className="absolute top-[297px] left-[470px]"
    style={{ fontSize: "32px", color: "white" }}
  >
    @{xHandle}
  </p>

  <p
    className="absolute top-[354px] left-[414px]"
    style={{ fontSize: "32px", color: "white" }}
  >
    {role}
  </p>

  <p
    className="absolute top-[416px] left-[470px]"
    style={{ fontSize: "32px", color: "white" }}
  >
    {joinDate}
  </p>

  <div
    className="absolute top-[477px] left-[456px] flex items-center gap-3"
    style={{ fontSize: "32px", color: "white" }}
  >
    <span>{country.name}</span>
    {country.code && (
      <img
        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
        alt={country.name}
        style={{ width: "40px", height: "27px", borderRadius: "2px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IDCard;

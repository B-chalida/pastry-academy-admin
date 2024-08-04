import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Programmes List", path: "/" },
    { name: "Create Programmes", path: "/admin/create" },
  ];

  const handleMenuClick = (item) => {
    setSelectedMenu(item.name);
    navigate(item.path);
  };

  return (
    <div>
      <div className="pt-10 bg-[#1a2232] border w-80 h-full">
        <div className="flex flex-col justify-start items-center">
          <div className="pb-10 border-b">
            <span className="text-2xl font-extrabold text-white">
              Admin Dashboard
            </span>
          </div>
          <div className="mt-10">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className={`cursor-pointer w-64 h-20 rounded-3xl flex items-center justify-center text-center px-2 my-2 ${
                  selectedMenu === item.name
                    ? "bg-[#cbcaca] shadow-md"
                    : "bg-white"
                }`}
              >
                <span
                  className={`text-xl font-semibold ${
                    selectedMenu === item.name
                      ? "text-gray-800"
                      : "text-gray-800"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

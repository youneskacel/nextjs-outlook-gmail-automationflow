import {
  FaHouseChimney,
  FaClipboardList,
  FaTachographDigital,
  FaPeopleGroup,
  FaBriefcase,
  FaCubesStacked,
  FaAutoprefixer,
} from "react-icons/fa6";

export const navData = [
  {
    groupLabel: null,
    subItems: [
      {
        label: "Home",
        icon: <FaHouseChimney />,
        path: "/apps/home",
      },
    ],
  },
  {
    groupLabel: "Campaigns",
    subItems: [
      {
        label: "Campaign",
        icon: <FaTachographDigital />,
        path: "/apps/${accountId}/campaigns/",
      },
      {
        label: "Automation",
        icon: <FaAutoprefixer />,
        path: "/apps/automation",
      },
    ],
  },
  {
    groupLabel: "Collections",
    subItems: [
      {
        label: "Contact",
        icon: <FaPeopleGroup />,
        path: "/apps/${accountId}/collections/contact",
      },
    ],
  },
];

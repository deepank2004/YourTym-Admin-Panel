import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

import {
  MdDashboard,
  MdPeople,
  MdEventNote,
  MdSubscriptions,
  MdLocalOffer,
  MdNotificationsActive,
  MdLocationOn,
  MdRateReview,
  MdOutlinePrivacyTip,
  MdSupervisorAccount,
} from "react-icons/md";

import {
  FaUsers,
  FaExchangeAlt,
  FaWallet,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaRegCalendarCheck,
  FaBuilding,
} from "react-icons/fa";

import { BiSupport, BiCalendarX } from "react-icons/bi";
import { GiSkills, GiReceiveMoney } from "react-icons/gi";
import { TbUserPlus } from "react-icons/tb";
import { RiAdvertisementLine, RiChat1Line } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { useAdmin } from "../../pages/Admin Profile/AdminContext";

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(null);
  const { adminProfile } = useAdmin();

  const userType = adminProfile?.data?.userType;
  const permissions = adminProfile?.data?.permission || [];

  const sidebarItems = [
    { name: "Dashboard", icon: <MdDashboard />, link: "/dashboard" },
    { name: "Users Lists", icon: <FaUsers />, link: "/userslists" },
    { name: "Partners Lists", icon: <MdPeople />, link: "/partnerlists" },
    { name: "Bookings", icon: <MdEventNote />, link: "/allbookings" },

    {
      name: "Transaction Lists",
      icon: <FaExchangeAlt />,
      subItems: [
        {
          name: "User Transaction",
          icon: <IoIosArrowForward />,
          link: "/transaction-lists/user-transaction",
        },
        {
          name: "Partner Transaction",
          icon: <IoIosArrowForward />,
          link: "/transaction-lists/partner-transaction/subscription-transaction",
        },
        {
          name: "Admin Transaction",
          icon: <IoIosArrowForward />,
          link: "/transaction-lists/admin-transaction",
        },
      ],
    },

    {
      name: "Services Management",
      icon: <GiSkills />,
      subItems: [
        {
          name: "Main Category",
          icon: <IoIosArrowForward />,
          link: "/service-management/main-category",
        },
        {
          name: "Main Category Types",
          icon: <IoIosArrowForward />,
          link: "/service-management/main-category-types",
        },
        {
          name: "Categories",
          icon: <IoIosArrowForward />,
          link: "/service-management/all-category",
        },
        {
          name: "SubCategories",
          icon: <IoIosArrowForward />,
          link: "/service-management/all-subcategory",
        },
        {
          name: "All Services",
          icon: <IoIosArrowForward />,
          link: "/service-management/all-services",
        },
      ],
    },

    { name: "Packages", icon: <FaBoxOpen />, link: "/allpackages" },
    { name: "Slot", icon: <MdEventNote />, link: "/slot" },

    {
      name: "Booked Sessions",
      icon: <FaRegCalendarCheck />,
      link: "/booked-sessions",
    },

    {
      name: "Payout Management",
      icon: <FaFileInvoiceDollar />,
      link: "/payout-management/payoutlist",
    },

    { name: "Wallet", icon: <FaWallet />, link: "/user/wallet" },

    {
      name: "Monthly Subscription",
      icon: <MdSubscriptions />,
      link: "/monthlysubscription",
    },

    {
      name: "Referral History",
      icon: <TbUserPlus />,
      link: "/referral-history",
    },

    {
      name: "Banners",
      icon: <RiAdvertisementLine />,
      subItems: [
        { name: "All Banner", icon: <IoIosArrowForward />, link: "/banners" },
        {
          name: "Main Category Banner",
          icon: <IoIosArrowForward />,
          link: "/main-category/banners",
        },
        {
          name: "Category Banner",
          icon: <IoIosArrowForward />,
          link: "/category/banners",
        },
      ],
    },

    {
      name: "Offers & Coupons",
      icon: <MdLocalOffer />,
      link: "/offers_coupons/offers",
    },

    {
      name: "Push Notification",
      icon: <MdNotificationsActive />,
      link: "/push-notification",
    },

    { name: "Location", icon: <MdLocationOn />, link: "/location/cities" },

    {
      name: "Hubs",
      icon: <FaBuilding />,
      subItems: [
        {
          name: "Get Hubs",
          icon: <IoIosArrowForward />,
          link: "/hub/get-hubs",
        },
        {
          name: "Create Hub",
          icon: <IoIosArrowForward />,
          link: "/hub/create-hub",
        },
        {
          name: "Update Hub",
          icon: <IoIosArrowForward />,
          link: "/hub/update-hub",
        },
      ],
    },

    { name: "Charges", icon: <GiReceiveMoney />, link: "/charges" },
    { name: "Training Videos", icon: <CiVideoOn />, link: "/training-videos" },
    { name: "Testimonials", icon: <MdRateReview />, link: "/testimonial" },
    { name: "All Leaves", icon: <BiCalendarX />, link: "/leaves" },

    {
      name: "Credit Recharge",
      icon: <IoDocumentTextOutline />,
      link: "/insurance-plans",
    },

    {
      name: "Consent Forms",
      icon: <IoDocumentTextOutline />,
      link: "/consent-forms",
    },

    {
      name: "Traning Report",
      icon: <IoDocumentTextOutline />,
      link: "/traning-reports",
    },

    {
      name: "Policy Setting",
      icon: <MdOutlinePrivacyTip />,
      subItems: [
        {
          name: "Privacy Policy",
          icon: <IoIosArrowForward />,
          link: "/privacy-policy",
        },
        {
          name: "Terms & Condition",
          icon: <IoIosArrowForward />,
          link: "/terms-and-conditions",
        },
        {
          name: "About Us",
          icon: <IoIosArrowForward />,
          link: "/about-us",
        },
      ],
    },

    { name: "Live Chat", icon: <RiChat1Line />, link: "/live-chat/user" },

    {
      name: "Help & Support",
      icon: <BiSupport />,
      link: "/help-Support/support-faq",
    },

    { name: "Sub admin", icon: <MdSupervisorAccount />, link: "/subadmin" },
  ];

  const toggleExpand = (itemName) => {
    setExpanded((prev) => (prev === itemName ? null : itemName));
  };

  const isActivePath = (item) => {
    if (location.pathname.includes(item.link)) return true;

    if (item.subItems) {
      return item.subItems.some((subItem) =>
        location.pathname.includes(subItem.link)
      );
    }

    return false;
  };

  const filteredSidebarItems =
    userType === "ADMIN"
      ? sidebarItems
      : sidebarItems.filter((item) => {
          if (permissions.includes(item.name)) {
            return true;
          }

          if (item.subItems) {
            item.subItems = item.subItems.filter((sub) =>
              permissions.includes(sub.name)
            );
            return item.subItems.length > 0;
          }

          return false;
        });

  return (
    <div className="sidebarcontainer">
      <div className="sidelogo">
        <div className="sidelogo1">
          <h1>Y</h1>
          <h1>T</h1>
        </div>
      </div>

      <div className="sideitems">
        {filteredSidebarItems.map((item) => (
          <div key={item.name}>
            <NavLink
              to={item.link}
              className={isActivePath(item) ? "sideitemactive" : "sideitem"}
              onClick={() => item.subItems && toggleExpand(item.name)}
            >
              {item.icon}
              <p>{item.name}</p>

              {item.subItems && (
                <span>
                  {expanded === item.name ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </NavLink>

            {item.subItems && expanded === item.name && (
              <div className="subitems">
                {item.subItems.map((sub) => (
                  <NavLink
                    key={sub.name}
                    to={sub.link}
                    className={
                      location.pathname.includes(sub.link)
                        ? "sidesubitemactive"
                        : "sidesubitem"
                    }
                  >
                    {sub.icon}
                    <p>{sub.name}</p>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
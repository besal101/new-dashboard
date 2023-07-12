"use client";
import { IRootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { AiFillApple } from "react-icons/ai";
import {
  BsCalendarDateFill,
  BsFillCartCheckFill,
  BsCartXFill,
} from "react-icons/bs";
import { FaSms, FaStickyNote, FaUserSecret } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import {
  MdCategory,
  MdLocalShipping,
  MdMarkEmailUnread,
  MdSpaceDashboard,
} from "react-icons/md";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentMenu, setCurrentMenu] = useState<string>("");

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, themeConfig.sidebar]);

  return (
    <div className="">
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 `}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/dashboard"
              className="main-logo flex shrink-0 items-center"
            >
              <Image
                className="ml-[8px] w-8 flex-none"
                src="/images/logo.svg"
                alt="logo"
                width={32}
                height={32}
              />
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                LIFESMILE
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="m-auto h-5 w-5"
              >
                <path
                  d="M13 19L7 12L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.5"
                  d="M16.9998 19L10.9998 12L16.9998 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex flex-row gap-2">
                    <MdSpaceDashboard className="group-hover:!text-primary w-5 h-5" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      Dashboard
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu === "dashboard"
                        ? "rotate-90"
                        : "rtl:rotate-180"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/dashboard">Sales</Link>
                    </li>
                    <li>
                      <Link href="/">Analytics</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <span>CRM (Customer Relation)</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <IoChatbubblesSharp className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          Chat
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <MdMarkEmailUnread className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          Mailbox
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <FaSms className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          SMS Service
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <FaUserSecret className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          Customers
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <FaStickyNote className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          Notes
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/" className="group">
                      <div className="flex items-center">
                        <BsCalendarDateFill className="w-5 h-5 group-hover:!text-primary" />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          Calendar
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <span>Inventory management</span>
              </h2>
              <li className="nav-item active">
                <Link href="/dashboard/orders" className="group">
                  <div className="flex items-center">
                    <BsFillCartCheckFill className="w-5 h-5 group-hover:!text-primary" />
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      Orders
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item active">
                <Link href="/dashboard/category" className="group">
                  <div className="flex items-center">
                    <MdCategory className="w-5 h-5 group-hover:!text-primary" />
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      Categories
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item active">
                <Link href="/dashboard/products" className="group">
                  <div className="flex items-center">
                    <AiFillApple className="w-5 h-5 group-hover:!text-primary" />
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      Products
                    </span>
                  </div>
                </Link>
              </li>
              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <span>Shipping & Distribution</span>
              </h2>
              <li className="nav-item">
                <Link href="/" className="group">
                  <div className="flex items-center">
                    <MdLocalShipping className="w-5 h-5 group-hover:!text-primary" />
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      Shipping Status
                    </span>
                  </div>
                </Link>
              </li>
              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-7 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <span>Abandoned & Recovery</span>
              </h2>
              <li className="nav-item">
                <Link href="/" className="group">
                  <div className="flex items-center">
                    <BsCartXFill className="w-5 h-5 group-hover:!text-primary" />
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      Abandoned Cart
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

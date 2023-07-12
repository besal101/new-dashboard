"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "@/store";
import { toggleSidebar, toggleTheme } from "@/store/themeConfigSlice";
import Image from "next/image";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { SlLock } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  function createMarkup(messages: any) {
    return { __html: messages };
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: "Congratulations!",
      message: "Your OS has been updated.",
      time: "1hr",
    },
    {
      id: 2,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: "Did you know?",
      message: "You can switch between artboards.",
      time: "2hr",
    },
    {
      id: 3,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: "Something went wrong!",
      message: "Send Reposrt",
      time: "2days",
    },
    {
      id: 4,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: "Warning",
      message: "Your password strength is low.",
      time: "5days",
    },
  ]);

  const removeMessage = (value: number) => {
    setMessages(messages.filter((user) => user.id !== value));
  };

  const [search, setSearch] = useState(false);
  const [flag, setFlag] = useState("");

  return (
    <header className={themeConfig.menu === "horizontal" ? "dark" : ""}>
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <Image
                className="inline w-8 ltr:-ml-1 rtl:-mr-1"
                src="/images/logo.svg"
                alt="logo"
                width={32}
                height={32}
              />
              <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">
                LIFESMILE
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7L4 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  opacity="0.5"
                  d="M20 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 17L4 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="hidden ltr:mr-2 rtl:ml-2 sm:block">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
              <li>
                <Link
                  href="/"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M7 4V2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M17 4V2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      opacity="0.5"
                      d="M2 9H22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      r="3"
                      transform="matrix(-1 0 0 1 19 5)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${
                  search && "!block"
                } absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
              >
                <div className="relative">
                  <input
                    type="text"
                    className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pr-9 rtl:pl-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                    placeholder="Search..."
                  />
                  <button
                    type="button"
                    className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto"
                  >
                    <svg
                      className="mx-auto"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11.5"
                        cy="11.5"
                        r="9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                      <path
                        d="M18.5 18.5L22 22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden"
                    onClick={() => setSearch(false)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.5"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
              >
                <svg
                  className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11.5"
                    cy="11.5"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <path
                    d="M18.5 18.5L22 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className={`${
                    themeConfig.theme === "light" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("dark"))}
                >
                  <MdOutlineLightMode className="mx-auto h-5 w-5 dark:text-[#d0d2d6]" />
                </button>
              ) : (
                ""
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className={`${
                    themeConfig.theme === "dark" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("light"))}
                >
                  <FaRegMoon className="mx-auto h-5 w-5 dark:text-[#d0d2d6]" />
                </button>
              )}
            </div>

            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <IoMailUnreadOutline className="mx-auto h-5 w-5 dark:text-[#d0d2d6]" />
                }
              >
                <ul className="w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
                  <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md p-5 text-white hover:!bg-transparent">
                      <div className="bg- absolute inset-0 h-full w-full bg-[url(/images/menu-heade.jpg)] bg-cover bg-center bg-no-repeat"></div>
                      <h4 className="relative z-10 text-lg font-semibold">
                        Messages
                      </h4>
                    </div>
                  </li>
                  {messages.length > 0 ? (
                    <>
                      <li onClick={(e) => e.stopPropagation()}>
                        {messages.map((message) => {
                          return (
                            <div
                              key={message.id}
                              className="flex items-center py-3 px-5"
                            >
                              <div
                                dangerouslySetInnerHTML={createMarkup(
                                  message.image
                                )}
                              ></div>
                              <span className="px-3 dark:text-gray-500">
                                <div className="text-sm font-semibold dark:text-white-light/90">
                                  {message.title}
                                </div>
                                <div>{message.message}</div>
                              </span>
                              <span className="whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-dark/60 ltr:ml-auto ltr:mr-2 rtl:mr-auto rtl:ml-2 dark:text-white-dark">
                                {message.time}
                              </span>
                              <button
                                type="button"
                                className="text-neutral-300 hover:text-danger"
                                onClick={() => removeMessage(message.id)}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    opacity="0.5"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </li>
                      <li className="mt-5 border-t border-white-light text-center dark:border-white/10">
                        <button
                          type="button"
                          className="group !h-[48px] justify-center !py-4 font-semibold text-primary dark:text-gray-400"
                        >
                          <span className="group-hover:underline ltr:mr-1 rtl:ml-1">
                            VIEW ALL NOTIFICATIONS
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="mb-5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent"
                      >
                        <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="#a9abb6"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-info rounded-full bg-primary"
                          >
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>

            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="relative group block"
                button={
                  <Image
                    className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/images/user-profile.jpeg"
                    alt="userProfile"
                    width={36}
                    height={36}
                  />
                }
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <Image
                        className="h-10 w-10 rounded-md object-cover"
                        src="/images/user-profile.jpeg"
                        alt="userProfile"
                        width={36}
                        height={36}
                      />
                      <div className="ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">{session?.user?.name}</h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {session?.user?.email}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/users/profile"
                      className="dark:hover:text-white"
                    >
                      <FiUser className="mr-2 w-5 h-5" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/apps/mailbox"
                      className="dark:hover:text-white"
                    >
                      <IoMailUnreadOutline className="mr-2 w-5 h-5" />
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/boxed-lockscreen"
                      className="dark:hover:text-white"
                    >
                      <SlLock className="mr-2 w-5 h-5" />
                      Lock Screen
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <div
                      className="!py-3 text-danger flex items-center px-4 cursor-pointer dark:hover:text-white"
                      onClick={() =>
                        signOut({ callbackUrl: "http://localhost:3000" })
                      }
                    >
                      <FiLogOut className="mr-2 w-5 h-5" />
                      Sign Out
                    </div>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

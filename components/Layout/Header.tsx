import Logo from "../Common/Logo";
import { HeaderProps } from "@/types/props/layout";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { BiUser, BiSearch, BiSupport, BiWorld, BiHeart } from "react-icons/bi";
import ShoppingCart from "./ShoppingCart";
import AllCategoriesDrawer from "./AllCategoriesDrawer";

export default function Header({
  categories,
  session,
  headerDictionary,
}: HeaderProps) {
  return (
    <header className="mx-auto flex flex-col">
      <div className="container mx-auto flex items-center justify-between py-3 gap-12">
        <div className="">
          <Logo />
        </div>
        <form className="grow">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-main-500 focus:border-main-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main-500 dark:focus:border-main-500"
              placeholder="Search for products"
              required
            />
            <button
              type="submit"
              className="rounded-full text-white absolute end-2.5 bottom-2.5 bg-main-500 hover:bg-main-700 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium text-sm p-2 dark:bg-main-600 dark:hover:bg-main-700 dark:focus:ring-main-800"
            >
              <BiSearch />
            </button>
          </div>
        </form>
        <div className="child:text-gray-700 flex items-center gap-5">
          <div className="flex gap-2 items-center px-4 py-2 border border-solid shadow-sm rounded-lg hover:bg-slate-100 cursor-pointer transition-colors duration-150">
            <BiSupport className="text-2xl" />
            <div className="text-sm">
              <div>
                <p>Support 24/7</p>
              </div>
              <a href="mailto:nicotordev@gmail.com" className="text-main-500">
                nicotordev@gmail.com
              </a>
            </div>
          </div>
          <div className="flex gap-2  items-center px-4 py-2 border border-solid shadow-sm rounded-lg hover:bg-slate-100 cursor-pointer transition-colors duration-150">
            <BiWorld className="text-2xl" />
            <div className="text-sm">
              <div>
                <p>Instant shipping</p>
              </div>
              <a href="mailto:nicotordev@gmail.com" className="text-main-500">
                nicotordev@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-main-100 flex items-center py-2">
        <Navbar
          theme={{
            root: {
              base: "container mx-auto",
              rounded: {
                on: "rounded",
                off: "",
              },
              bordered: {
                on: "border",
                off: "",
              },
              inner: {
                base: "mx-auto flex flex-wrap items-center justify-between",
                fluid: {
                  on: "",
                  off: "container",
                },
              },
            },
            brand: {
              base: "flex items-center",
            },
            collapse: {
              base: "flex items-center gap-0",
              list: "flex items-center font-medium",
              hidden: {
                on: "",
                off: "",
              },
            },
            link: {
              base: "flex px-4 rounded-full transition-colors duration-150",
              active: {
                on: "bg-main-600 text-white md:text-main-700",
                off: "text-gray-700 hover:bg-main-600 hover:text-white",
              },
              disabled: {
                on: "text-gray-400 hover:cursor-not-allowed ",
                off: "",
              },
            },
            toggle: {
              base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden",
              icon: "h-6 w-6 shrink-0",
            },
          }}
        >
          <NavbarCollapse>
            <AllCategoriesDrawer categories={categories} />
            {categories.slice(0, 4).map((category) => (
              <NavbarLink as={Link} key={category.slug} href="#" className="w-32">
                <div className="flex items-center justify-center w-full py-1.5 bg-transparent gap-2">
                  <span className="inline-block">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </span>
                  <p className="text-sm font-semibold">{category.name}</p>
                </div>
              </NavbarLink>
            ))}
          </NavbarCollapse>
          {session ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://via.placeholder.com/50"
                    rounded
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">{}</span>
                </DropdownHeader>
                <DropdownItem>{headerDictionary.navBar.profile}</DropdownItem>
                <DropdownDivider />
                <DropdownItem>{headerDictionary.navBar.logout}</DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </>
          ) : (
            <NavbarCollapse
              theme={{
                list: "flex items-center flex-row gap-3",
              }}
            >
              <NavbarLink
                as={Link}
                href="/api/auth/signin"
                className="bg-white rounded-full shadow-sm aspect-square max-w-9 flex items-center justify-center p-0 hover:text-white text-gray-900"
              >
                <BiHeart className="text-4xl p-2" />
              </NavbarLink>
              <NavbarLink
                as={Link}
                href="/api/auth/signin"
                className="bg-white rounded-full shadow-sm aspect-square max-w-9 flex items-center justify-center p-0 hover:text-white text-gray-900"
              >
                <BiUser className="text-4xl p-2" />
              </NavbarLink>
              <NavbarLink
                as={"button"}
                className="bg-main-500 rounded-full shadow-sm aspect-square max-w-9 flex items-center justify-center p-0 hover:text-white text-white"
              >
                <ShoppingCart />
              </NavbarLink>
            </NavbarCollapse>
          )}
        </Navbar>
      </div>
    </header>
  );
}

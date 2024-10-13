"use client";
import { AllCategoriesDrawerProps } from "@/types/props/layout";
import { Drawer, NavbarLink, Sidebar } from "flowbite-react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
export default function AllCategoriesDrawer({
  categories,
}: AllCategoriesDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  return (
    <>
      <NavbarLink
        as="button"
        onClick={handleOpen}
        theme={{
          base: "block pl-0 pr-3.5 rounded-full bg-white transition-colors duration-150 mr-3",
          active: {
            on: "bg-main-700 text-white md:text-main-700",
            off: "text-gray-700 hover:text-slate-500",
          },
        }}
      >
        <div className="flex items-center gap-2 rounded-full">
          <span className="inline-block bg-main-500 px-3 py-2 rounded-tl-full rounded-bl-full">
            <FaBars className="text-base text-white" />
          </span>
          <p className="text-sm font-semibold">All Categories</p>
        </div>
      </NavbarLink>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        theme={{
          root: {
            base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 !ml-0 !max-w-[250px]",
          },
        }}
      >
        <Drawer.Items>
          <button
            className="flex items-center gap-2 rounded-full bg-main-500 w-full"
            onClick={handleClose}
          >
            <span className="inline-block px-3 py-2">
              <FaBars className="text-base text-white" />
            </span>
            <p className="text-sm font-semibold text-white">All Categories</p>
          </button>
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    {categories.map((category) => (
                      <Sidebar.Item key={category.slug} href="/e-commerce/products" icon={FaBars}>
                        {category.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

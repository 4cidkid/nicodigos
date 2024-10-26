"use client";
import clsx from "clsx";
import Image from "next/image";
import { AllCategoriesDrawerProps } from "@/types/props/layout";
import { Drawer, NavbarLink, Sidebar } from "flowbite-react";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
export default function AllCategoriesDrawer({
  categories,
}: AllCategoriesDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAllCategoriesActive, setIsAllCategoriesActive] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState<
    AllCategoriesDrawerProps["categories"][number]["subCategories"] | null
  >(null);
  const [inProp, setInProp] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleAllCategories = () => setIsAllCategoriesActive(true);
  const handleCategory = () => setIsAllCategoriesActive(false);

  const handleEnter = () => setInProp(true);
  const handleExit = () => setInProp(false);

  const handleActiveCategory = (
    subCategory: AllCategoriesDrawerProps["categories"][number]["subCategories"]
  ) => {
    handleCategory();
    handleEnter();
    setActiveSubcategory(subCategory);
  };

  const handleCategoryDeactivate = () => {
    handleAllCategories();
    handleExit();
  };

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
          <span className="inline-block bg-main-600 px-3 py-2 rounded-tl-full rounded-bl-full">
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
            base: "fixed z-40 bg-white p-4 transition-transform dark:bg-gray-800 !ml-03",
          },
        }}
      >
        <div className="contents relative">
          <div
            className={clsx(
              "absolute top-0 left-full h-full bg-white transition-opacity duration-300 border-l py-6 px-3",
              {
                "opacity-0": !inProp,
                "opacity-100": inProp,
                hidden: !isOpen,
              }
            )}
          >
            {activeSubcategory && activeSubcategory.filter((subCategory) => subCategory.image !== null).map((subCategory) => (
              <div key={subCategory.slug} className="flex items-center gap-2">
                <Image
                  src={subCategory.name}
                  alt={subCategory.image as string}
                  width={16}
                  height={16}
                />
                <p className="text-sm font-semibold">{subCategory.name}</p>
              </div>
            ))}
          </div>
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0 w-full"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <div className="contents">
                        <Sidebar.Item
                          icon={() => (
                            <FaBars
                              className={clsx("text-base", {
                                "text-white": isAllCategoriesActive,
                                "text-gray-700": !isAllCategoriesActive,
                              })}
                            />
                          )}
                          className={clsx(
                            "pl-2.5 font-semibold text-sm hover:text-white rounded-full transition-colors cursor-pointer hover:bg-main-600",
                            {
                              "bg-main-600 text-white": isAllCategoriesActive,
                              "bg-transparent text-gray-700":
                                !isAllCategoriesActive,
                            }
                          )}
                        >
                          All Categories
                        </Sidebar.Item>
                      </div>
                      {categories.map((category) => (
                        <div
                          className="contents"
                          key={category.slug}
                          onMouseEnter={() =>
                            handleActiveCategory(category.subCategories)
                          }
                          onMouseLeave={handleCategoryDeactivate}
                        >
                          <Sidebar.Item
                            icon={() => (
                              <Image
                                src={category.icon}
                                alt={category.name}
                                width={16}
                                height={16}
                              />
                            )}
                            className="pl-2.5 font-semibold text-sm text-gray-700 hover:bg-main-600 hover:text-white rounded-full transition-colors"
                          >
                            {category.name}
                          </Sidebar.Item>
                        </div>
                      ))}
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </div>
      </Drawer>
    </>
  );
}

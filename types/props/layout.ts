import { Session } from "next-auth";
import { HeaderDictionary } from "../dictionaries";
type HeaderProps = {
  categories: {
    name: string;
    slug: string;
    icon: string;
    subCategories: {
      name: string;
      slug: string;
    }[];
  }[];
  session: Session | null;
  headerDictionary: HeaderDictionary;
};
type AllCategoriesDrawerProps = {
  categories: {
    name: string;
    slug: string;
    icon: string;
    subCategories: {
      name: string;
      slug: string;
    }[];
  }[];
};

export type { HeaderProps, AllCategoriesDrawerProps };

import { Session } from "next-auth";
import { HeaderDictionary } from "../dictionaries";
import { Category, Subcategory } from "@prisma/client";

type HeaderCategory = Partial<Category> & Pick<Category, 'name' | 'slug' | 'icon'> & {
  subCategories: (Partial<Subcategory> & Pick<Subcategory, 'name' | 'slug' | 'image'>)[]
}
type HeaderProps = {
  categories: HeaderCategory[];
  session: Session | null;
  headerDictionary: HeaderDictionary;
};
type AllCategoriesDrawerProps = {
  categories: HeaderCategory[];
};

export type { HeaderProps, AllCategoriesDrawerProps };

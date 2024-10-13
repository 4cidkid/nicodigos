import { Category } from "@prisma/client";
import { Session } from "next-auth";
import { HeaderDictionary } from "../dictionaries";
type HeaderProps = {
  categories: Category[];
  session: Session | null;
  headerDictionary: HeaderDictionary;
};

export type { HeaderProps };

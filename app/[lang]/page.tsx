import { auth } from "@/auth";
import Header from "@/components/Layout/Header";
import { prisma } from "@/lib/prisma/prisma";
import { PagePropsCommon } from "@/types/props/pages";
import { getDictionary } from "../../dictionaries/dictionaries";
import { HeaderDictionary, HomeDictionary } from "@/types/dictionaries";
export default async function Home({ params }: PagePropsCommon) {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_homeDictionary, headerDictionary] = await Promise.all([
    getDictionary("home", params.lang) as Promise<HomeDictionary>,
    getDictionary("header", params.lang) as Promise<HeaderDictionary>,
  ]);

  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
      icon: true,
      image: true,
      subCategories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <>
      <Header
        categories={categories}
        session={session}
        headerDictionary={headerDictionary}
      />
      <div className="h-screen bg-gray-100"></div>
    </>
  );
}

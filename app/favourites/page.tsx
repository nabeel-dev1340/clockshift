import { getFavourites } from "./actions";
import NoFavourites from "@/_sections/nofavourites";
import { auth } from "@/auth";
export default async function Favourites() {
  const session = await auth();
  const favourites = await getFavourites(session?.user?.email as string);
  const isFavourites = !!favourites?.length;
  return <div>{!isFavourites && <NoFavourites />}</div>;
}

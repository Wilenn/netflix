import axios from "axios";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FC, useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
interface FavoriteButtonProps {
  movieId: string;
}
const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } }); //only for delete method you have to write data:{movieId}
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  const Icon = isFavorite ? BsFillStarFill : BsStar;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item 
    w-6 h-6 lg:w-10 lg:h-10
     border-white border-2 
     rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white"  size={20} />
    </div>
  );
};

export default FavoriteButton;
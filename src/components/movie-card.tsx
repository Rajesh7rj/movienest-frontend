import { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div 
    onClick={onClick}
    className="bg-card rounded-xl p-2 transition-all hover:scale-[1.02] hover:shadow-lg bg-[#092C39] cursor-pointer text-white"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${movie.movie_image}`}
        alt={movie.movie_title}
        className="rounded-md h-80 w-full object-cover"
      />
      <div className="p-2 my-2">
        <h3 className="text-base text-[20px] capitalize">{movie.movie_title}</h3>
        <p className="!font-[100]">{movie.movie_publishing_year}</p>
      </div>
    </div>
  )
}

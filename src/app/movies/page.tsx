'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Button from '@/components/buttons';
import MovieCard from '@/components/movie-card';
import Pagination from '@/components/pagination';

interface Movie {
  id: number;
  movie_title: string;
  movie_publishing_year: number;
  movie_image: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.warn('No token found. Redirecting to login...');
        router.push('/login');
        return;
      }

      try {
        const res = await api.get(`/movies/get-movies?page=${page}&limit=${limit}`);
        setMovies(res.data.data || []);
        console.log(res.data.total/limit)
        const totalPages =  Math.ceil(res.data.total/limit)
        setTotalPages(totalPages || 1);
      } catch (error) {
        console.error('Error fetching movies. Redirecting to login...', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const addMovies = () => {
    router.push('/movies/create');
  };

  return (
    <div className=" min-h-screen bg-background px-4 md:px-12 lg:px-24 pb-10">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-xl sm:text-3xl font-medium text-white flex justify-center items-center">
          MovieNest
          {movies.length !== 0 && (<Button onClick={addMovies} variant="ghost" className="ml-[-4px]">
            <img
              src="/icons/add.svg"
              alt="add"
              className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px] mt-[3px]"
            />
          </Button>)
         }
        </h1>
        <Button onClick={handleLogout} variant="ghost" className="flex justify-center items-center">
          Logout
          <img src="/icons/logout.svg" alt="logout" className="w-[14px] h-[14px] ml-2" />
        </Button>
      </div>

      {loading ? (
        <p className="text-white text-center flex justify-center items-center h-[40vh]">Loading...</p>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[75vh] text-center space-y-4">
          <p className="text-3xl font-medium text-white">Your movie list is empty</p>
          <Button onClick={addMovies}>Add a new movie</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => router.push(`/movies/edit/${movie.id}`)}
             />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
}

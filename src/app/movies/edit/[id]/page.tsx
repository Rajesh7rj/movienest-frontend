'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Button from '@/components/buttons';

const movieSchema = z.object({
  movie_title: z.string().min(1, 'Title is required'),
  movie_publishing_year: z
    .string()
    .min(4, 'Enter a valid year')
    .regex(/^\d{4}$/, 'Must be a 4-digit year'),
  movie_image: z.any().optional(),
});

type MovieFormData = z.infer<typeof movieSchema>;

export default function EditMoviePage() {
  const router = useRouter();
  const { id } = useParams();
  const [preview, setPreview] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState({
    movie_title: '',
    movie_publishing_year: '',
    movie_image: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/get-movie-by-id/${id}`);
        const movie = res.data.data;
        setValue('movie_title', movie.movie_title);
        setValue('movie_publishing_year', `${movie.movie_publishing_year}`);
        setInitialImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${movie.movie_image}`);

        setOriginalData({
          movie_title: movie.movie_title,
          movie_publishing_year: movie.movie_publishing_year,
          movie_image: movie.movie_image,
        });
      } catch (error) {
        toast.error('Failed to load movie.');
        console.error(error);
        router.push('/movies');
      }
    };

    if (id) fetchMovie();
  }, [id, router, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file && file instanceof Blob) {
      setValue('movie_image', fileList, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: MovieFormData) => {
    const titleChanged = data.movie_title !== originalData.movie_title;
    const yearChanged = data.movie_publishing_year !== originalData.movie_publishing_year;
    const imageChanged = data.movie_image && data.movie_image.length > 0;

    if (!titleChanged && !yearChanged && !imageChanged) {
      toast.success('No changes made. Movie already up to date!');
      return;
    }

    const formData = new FormData();
    formData.append('movie_title', data.movie_title);
    formData.append('movie_publishing_year', data.movie_publishing_year);

    if (data.movie_image && data.movie_image.length > 0) {
  formData.append('movie_image', data.movie_image[0]); 
}

    try {
      await api.put(`/movies/update-movie/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Movie updated successfully!');
      router.push('/movies');
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Something went wrong.';
      toast.error(message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Edit Movie</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-10 items-start"
        >
          <div className="w-full md:w-1/2 flex justify-center flex-col">
            <label
              htmlFor="image"
              className="border-2 border-dashed border-white h-[60vh] aspect-square rounded-xl flex items-center justify-center text-sm cursor-pointer hover:bg-white/5"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : initialImage ? (
                <img
                  src={initialImage}
                  alt="Existing"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center opacity-50">
                  ⬇<br /> Drop an image here
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="image"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <input
                {...register('movie_title')}
                placeholder="Title"
                className="w-full px-4 py-3 rounded bg-[#224957] text-white placeholder:text-white/70 focus:outline-none"
              />
              {errors.movie_title?.message && (
                <p className="text-[#EB5757] text-sm mt-1">
                  {errors.movie_title.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register('movie_publishing_year')}
                placeholder="Publishing year"
                className="w-full px-4 py-3 rounded bg-[#224957] text-white placeholder:text-white/70 focus:outline-none"
              />
              {errors.movie_publishing_year?.message && (
                <p className="text-[#EB5757] text-sm mt-1">
                  {errors.movie_publishing_year.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={() => router.push('/movies')}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

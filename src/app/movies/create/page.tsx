'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useState } from 'react';
import api from '@/lib/api';
import Button from '@/components/buttons';
import toast from 'react-hot-toast';

const movieSchema = z.object({
  movie_title: z.string().min(1, 'Title is required'),
   movie_publishing_year: z
    .string()
    .min(4, 'Enter a valid year')
    .regex(/^\d{4}$/, 'Must be a 4-digit year'),
  movie_image: z
    .any()
    .refine((val) => val instanceof FileList && val.length > 0, {
      message: 'Image is required',
    }),
});

type MovieFormData = z.infer<typeof movieSchema>;

export default function CreateMoviePage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = async (data: MovieFormData) => {
    const formData = new FormData();
    formData.append('movie_title', data.movie_title);
    formData.append('movie_publishing_year', String(data.movie_publishing_year));
    formData.append('movie_image', data.movie_image[0]);

    try {
      await api.post('/movies/create-movie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Movie created successfully!');
      router.push('/movies');
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Something went wrong. Try again.';
      toast.error(message);
      console.error('Error creating movie:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList.item(0);
      if (file && file instanceof Blob) {
        setValue('movie_image', fileList, { shouldValidate: true });

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10">Create a new movie</h1>

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

            {errors.movie_image?.message && (
              <p className="text-[#EB5757] text-sm mt-2">Image is Required</p>
            )}
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
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

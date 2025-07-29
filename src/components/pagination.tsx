import React from 'react';
import Button from './buttons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [...Array(totalPages)].map((_, idx) => idx + 1);

  return (
    <nav className="flex items-center justify-center mt-8 gap-x-2" aria-label="Pagination">
      <Button
        variant='ghost'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm text-white font-medium"
      >
        Previous
      </Button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm text-white font-medium ${
            page === currentPage
              ? 'bg-[#2BD17E] hover:bg-[#1fb352]'
              : 'bg-[#1e3a3a] hover:bg-[#305b5b]'
          }`}
        >
          {page}
        </button>
      ))}

      <Button
        variant='ghost'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm text-white font-medium"
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;

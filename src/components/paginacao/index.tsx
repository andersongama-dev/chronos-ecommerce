export default function Paginacao({ currentPage, totalPages, onPageChange }) {
   const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      let startPage = Math.max(
         1,
         currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
         startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Botão anterior
      if (currentPage > 1) {
         pages.push(
            <button
               key="prev"
               onClick={() => onPageChange(currentPage - 1)}
               className="px-3 py-2 text-sm font-medium text-gray-500 bg-white cursor-pointer rounded-l-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
               Previous
            </button>
         );
      }

      // Primeira página se não estiver visível
      if (startPage > 1) {
         pages.push(
            <button
               key={1}
               onClick={() => onPageChange(1)}
               className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
               1
            </button>
         );

         if (startPage > 2) {
            pages.push(
               <span
                  key="ellipsis1"
                  className="px-3 py-2 text-sm font-medium text-gray-500"
               >
                  ...
               </span>
            );
         }
      }

      // Páginas visíveis
      for (let i = startPage; i <= endPage; i++) {
         pages.push(
            <button
               key={i}
               onClick={() => onPageChange(i)}
               className={` w-[48px] h-[48px] px-3 py-2 text-sm font-medium  rounded-[10px] border border-gray-300 transition-colors cursor-pointer ${
                  i === currentPage
                     ? "bg-[#1f512b] text-white border-[#1f512b]"
                     : "text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700"
               }`}
            >
               {i}
            </button>
         );
      }

      // Última página se não estiver visível
      if (endPage < totalPages) {
         if (endPage < totalPages - 1) {
            pages.push(
               <span
                  key="ellipsis2"
                  className="px-3 py-2 text-sm font-medium text-gray-500"
               >
                  ...
               </span>
            );
         }

         pages.push(
            <button
               key={totalPages}
               onClick={() => onPageChange(totalPages)}
               className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
               {totalPages}
            </button>
         );
      }

      // Botão próximo
      if (currentPage < totalPages) {
         pages.push(
            <button
               key="next"
               onClick={() => onPageChange(currentPage + 1)}
               className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 bg-white  rounded-r-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
               Next
            </button>
         );
      }

      return pages;
   };

   if (totalPages <= 1) return null;

   return (
      <div className="flex items-center justify-center space-x-0 gap-4">
         {renderPageNumbers()}
      </div>
   );
}

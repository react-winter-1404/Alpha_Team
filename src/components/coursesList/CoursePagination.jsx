"use client";

import React from 'react';
import { Pagination } from "@heroui/react";

 function CoursePagination({ page, totalPages, itemsPerPage, totalItems, onPageChange }) {
  
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full flex flex-col items-center gap-3" style={{ direction: 'rtl' }}>
      
      <Pagination.Summary className="text-gray-500 text-sm font-medium">
        نمایش {startItem} تا {endItem} از مجموع {totalItems} دوره یافت شده
      </Pagination.Summary>
      
      <Pagination.Content className="flex items-center gap-1" style={{ direction: 'ltr' }}>
        <Pagination.Item>
          <Pagination.Previous 
            isDisabled={page === 1} 
            onPress={() => onPageChange(page - 1)}
            className="px-3 py-1 text-sm bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <Pagination.PreviousIcon className="mr-1" />
            <span>قبلی</span>
          </Pagination.Previous>
        </Pagination.Item>

        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis className="text-gray-400" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link 
                isActive={p === page} 
                onPress={() => onPageChange(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold ${
                  p === page ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next 
            isDisabled={page === totalPages} 
            onPress={() => onPageChange(page + 1)}
            className="px-3 py-1 text-sm bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <span>بعدی</span>
            <Pagination.NextIcon className="ml-1" />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>

    </Pagination>
  );
}
export default CoursePagination;
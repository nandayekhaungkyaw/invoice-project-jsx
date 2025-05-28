import React from 'react'

const ProductSkeletonRow = () => {
  return (
   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
  <td className="px-6 py-4">
    <div className="h-4 bg-gray-200 rounded w-6 animate-pulse dark:bg-gray-700"></div>
  </td>
  <td className="px-6 py-4">
    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse dark:bg-gray-700"></div>
  </td>
  <td className="px-6 py-4">
    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse dark:bg-gray-700"></div>
  </td>
  <td className="px-6 py-4">
    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse dark:bg-gray-700"></div>
  </td>
  <td className="px-6 py-4">
    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse dark:bg-gray-700"></div>
  </td>
  <td className="px-6 py-4 text-right">
    <div className="flex flex-row gap-2 justify-end">
      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse dark:bg-gray-700"></div>
      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse dark:bg-gray-700"></div>
    </div>
  </td>
</tr>

  )
}

export default ProductSkeletonRow
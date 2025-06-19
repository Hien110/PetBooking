import React from 'react'

function SubHeader({ title, subTitle }) {
  return (
    <div className="bg-white shadow-md rounded-lg mb-3">
      <div className="mx-auto py-6 px-4 flex flex-col items-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-custom-blue">{title}</h1>
        <h5 className="text-sm text-gray-600 mt-2">{subTitle}</h5>
      </div>
    </div>
  )
}

export default SubHeader

import React from 'react';

export const HistoryTable = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
          History
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            You can keep track of your assessment on this page.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">Date Assessment</th>
            <th scope="col" className="px-6 py-3">Total Questions</th>
            <th scope="col" className="px-6 py-3">Correct</th>
            <th scope="col" className="px-6 py-3">Wrong</th>
            <th scope="col" className="px-6 py-3">Scores</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b text-center border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.date}
              </th>
              <td className="px-6 py-4">{item.total}</td>
              <td className="px-6 py-4">{item.correct}</td>
              <td className="px-6 py-4">{item.wrong}</td>
              <td className="px-6 py-4">{item.scores}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

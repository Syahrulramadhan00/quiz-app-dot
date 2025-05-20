import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryTable } from '../components/HistoryTable';
import { loadHistoryFromLocalStorage } from '../composables/historyCompose';
import { selectHistory } from '../stores/slices/historySlice';

export const History = () => {
  const dispatch = useDispatch();
  const historyData = useSelector(selectHistory);

  useEffect(() => {
    dispatch(loadHistoryFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      {historyData.length > 0 ? (
        <HistoryTable data={historyData} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No quiz history found.</p>
      )}
    </div>
  );
};

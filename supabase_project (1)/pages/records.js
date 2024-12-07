
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import RecordForm from '../components/RecordForm';
import RecordTable from '../components/RecordTable';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('reading_records')
        .select('*');
      if (error) console.error(error);
      else setRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  return (
    <div>
      <h1>紀錄管理</h1>
      <RecordForm />
      {loading ? <p>Loading...</p> : <RecordTable records={records} />}
    </div>
  );
}

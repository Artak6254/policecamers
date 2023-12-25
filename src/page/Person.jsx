import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { person } from '../api/Api';
import { useNavigate, useParams } from 'react-router-dom';


const Person = () => {
  const [userData, setUserData] = useState({
    id: null,
    image: '',
    title: '',
    link: '',
    data_array: [],
  });

  const { id } = useParams();
  const { data_array } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    person(id).then((res) => {
      res.data_array = JSON.parse(res.data_array);
      setUserData(res);
    });
  }, [id]);

  console.log(data_array);
  return (
    <div>
      <div className='w-1/6 flex justify-between mt-4 ml-2'>
        <button className='bg-slate-700 text-white text-[14px] p-1 rounded-full' onClick={() => navigate("/")}>Go Back</button>
        <button className='bg-slate-700 text-white text-[14px] p-1 rounded-full' onClick={() => navigate("/presonal_list")}>Admin</button>
      </div>
      <table className='my-[2rem]'>
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Հ/հ
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Անուն
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
            >
              Ազգանուն
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data_array?.map((el, index) => (
              <tr key={uuidv4()}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800  whitespace-nowrap">
                  {index === 0 ? index = 1 : index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800  whitespace-nowrap">
                  {el.key1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800  whitespace-nowrap">
                  {el.key2}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Person;

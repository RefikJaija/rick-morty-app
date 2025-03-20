// import { useQuery } from '@apollo/client';
// import { Table } from 'antd';
// import { GET_CHARACTERS } from '../queries/characters';

// const SimpleList = () => {
//   // Fetch data using GraphQL query
//   const { loading, error, data } = useQuery(GET_CHARACTERS);

//   // Handle errors immediately
//   if (error) return <div>Error! {error.message}</div>;

//   // Define table structure
//   const columns = [
//     { title: 'Name', dataIndex: 'name' },
//     { title: 'Species', dataIndex: 'species' },
//   ];

//   // Render the table with data
//   return <Table 
//     dataSource={data?.characters?.results || []} // Fallback to empty array
//     columns={columns} 
//     loading={loading} // Shows spinner automatically
//     rowKey="id" // Unique identifier for rows
//   />;
// };

// export default SimpleList;

// import { useState, useEffect, useContext } from 'react';
// import { useQuery } from '@apollo/client';
// import { Table, Select, Input, Space, Spin, Tag } from 'antd';
// import { useInView } from 'react-intersection-observer';
// import { GET_CHARACTERS } from '../queries/characters';
// import LoadingSkeleton from './LoadingSkeleton';
// import { LanguageContext } from '../context/LanguageContext';

// const SimpleList = () => {
//   const [page, setPage] = useState(1);
//   const [status, setStatus] = useState('');
//   const [species, setSpecies] = useState('');
//   const { t } = useContext(LanguageContext);
//   const [ref, inView] = useInView();

//   const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
//     variables: { page: 1, status, species }
//   });

//   useEffect(() => {
//     if (inView && data?.characters.info.next) {
//       fetchMore({
//         variables: { page: data.characters.info.next },
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult) return prev;
//           return {
//             characters: {
//               ...fetchMoreResult.characters,
//               results: [
//                 ...prev.characters.results,
//                 ...fetchMoreResult.characters.results,
//               ],
//             },
//           };
//         }
//       });
//     }
//   }, [inView]);

//   if (loading && !data) return <LoadingSkeleton />;
//   if (error) return <div>Error! {error.message}</div>;


//   const columns = [
//     { title: t.name, dataIndex: 'name' },
//     { 
//       title: t.status,
//       dataIndex: 'status',
//       render: (status: string) => {
//         const formattedStatus = (status ? status.toLowerCase() : 'unknown') as keyof typeof colorMap;
//         const colorMap = {
//           alive: 'green',
//           dead: 'red',
//           unknown: 'gray'
//         };
        
//         return (
//           <Tag color={colorMap[formattedStatus]} style={{ textTransform: 'capitalize' }}>
//             {t[formattedStatus]}
//           </Tag>
//         );
//       }
//     },
//     { title: t.species, dataIndex: 'species' },
//   ];

//   return (
//     <Space direction="vertical" style={{ width: '100%' }}>
//       <div>
//         <Select
//           placeholder={t.selectStatus}
//           style={{ width: 200, marginRight: 16 }}
//           onChange={setStatus}
//           allowClear
//         >
//           <Select.Option value="alive">{t.alive}</Select.Option>
//           <Select.Option value="dead">{t.dead}</Select.Option>
//           <Select.Option value="unknown">{t.unknown}</Select.Option>
//         </Select>

//         <Input
//           placeholder={t.searchSpecies}
//           style={{ width: 200 }}
//           onChange={(e) => setSpecies(e.target.value)}
//         />
//       </div>

//       <Table
//         dataSource={data?.characters?.results || []}
//         columns={columns}
//         pagination={false}
//         loading={loading}
//         rowKey="id"
//       />
      
//       {/* Infinite scroll trigger */}
//       <div ref={ref} style={{ textAlign: 'center', margin: '20px 0' }}>
//         {data?.characters.info.next && <Spin tip={t.loading} />}
//       </div>
//     </Space>
//   );
// };

// export default SimpleList;
import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Table, Select, Input, Space, Spin, Tag } from 'antd';
import { useInView } from 'react-intersection-observer';
import { GET_CHARACTERS } from '../queries/characters';
import LoadingSkeleton from './LoadingSkeleton';
import { LanguageContext } from '../context/LanguageContext';

const SimpleList = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const { t } = useContext(LanguageContext);

  // Create a state to hold a ref for the scrollable container
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  // Set up useInView with the container as the root
  const [ref, inView] = useInView({
    root: containerRef, // Use the container as the root for intersection
    threshold: 0.5,     // Adjust threshold as needed
  });

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1, status, species }
  });

  useEffect(() => {
    if (inView && data?.characters.info.next) {
      fetchMore({
        variables: { page: data.characters.info.next },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [
                ...prev.characters.results,
                ...fetchMoreResult.characters.results,
              ],
            },
          };
        }
      });
    }
  }, [inView, data, fetchMore]);

  if (loading && !data) return <LoadingSkeleton />;
  if (error) return <div>Error! {error.message}</div>;

    const columns = [
    { title: t.name, dataIndex: 'name' },
    { 
      title: t.status,
      dataIndex: 'status',
      render: (status: string) => {
        const formattedStatus = (status ? status.toLowerCase() : 'unknown') as keyof typeof colorMap;
        const colorMap = {
          alive: 'green',
          dead: 'red',
          unknown: 'gray'
        };
        
        return (
          <Tag color={colorMap[formattedStatus]} style={{ textTransform: 'capitalize' }}>
            {t[formattedStatus]}
          </Tag>
        );
      }
    },
    { title: t.species, dataIndex: 'species' },
  ];


  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* Filters */}
      <div>
        <Select
          placeholder={t.selectStatus}
          style={{ width: 200, marginRight: 16 }}
          onChange={setStatus}
          allowClear
        >
          <Select.Option value="alive">{t.alive}</Select.Option>
          <Select.Option value="dead">{t.dead}</Select.Option>
          <Select.Option value="unknown">{t.unknown}</Select.Option>
        </Select>

        <Input
          placeholder={t.searchSpecies}
          style={{ width: 200 }}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </div>

      {/* Scrollable container for the table and infinite scroll trigger */}
      <div
        ref={setContainerRef}
        style={{ height: '500px', overflowY: 'auto', border: '1px solid #f0f0f0' }}
      >
        <Table
          dataSource={data?.characters?.results || []}
          columns={columns}
          pagination={false}
          loading={loading}
          rowKey="id"
        />

        {/* Infinite scroll trigger inside the container */}
        <div ref={ref} style={{ textAlign: 'center', margin: '20px 0' }}>
          {data?.characters.info.next && <Spin tip={t.loading} />}
        </div>
      </div>
    </Space>
  );
};

export default SimpleList;

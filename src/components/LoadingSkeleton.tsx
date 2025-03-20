import { Skeleton } from 'antd';

const LoadingSkeleton = () => (
  <div style={{ padding: 20 }}>
    {[...Array(5)].map((_, i) => (
      <Skeleton 
        key={i} 
        active 
        paragraph={{ rows: 1 }} 
        style={{ marginBottom: 16 }} 
      />
    ))}
  </div>
);

export default LoadingSkeleton;
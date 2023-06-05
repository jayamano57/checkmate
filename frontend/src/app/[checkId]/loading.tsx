import Skeleton from 'react-loading-skeleton';

interface LoadingProps {
  skeletonLineCount: number;
}

export default function Loading({ skeletonLineCount }: LoadingProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Skeleton count={skeletonLineCount} />
    </div>
  );
}

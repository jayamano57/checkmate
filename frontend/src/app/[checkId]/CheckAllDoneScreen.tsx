import { Button } from '@/components/Button/Button';
import CheckPageLayout from './page.layout';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie';
import styles from './styles.module.css';
import * as animationData from '../../assets/all-done.json';

export function CheckAllDoneScreen() {
  const router = useRouter();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <CheckPageLayout
      title="All Done!"
      subtitle="Great! You should have a link copied to your clipboard that you can send to everyone who owes you money."
      primaryAction={
        <Button onClick={goHome} fullWidth>
          Go Home
        </Button>
      }
    >
      <div className={styles.allDoneContentBody}>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </CheckPageLayout>
  );
}

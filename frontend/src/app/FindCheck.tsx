import { AppLogo } from '@/components/AppLogo/AppLogo';
import styles from './page.module.css';
import { TextInput } from '@/components/TextInput/TextInput';
import { Button } from '@/components/Button/Button';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { checkService } from '@/services/check/check.service';
import { useRouter } from 'next/navigation';

export function FindCheck() {
  const router = useRouter();
  const [check, setCheck] = useState('');

  const handleFindCheck = async () => {
    if (check.trim().length < 5) return;

    const res = await checkService.getCheck(check);

    if (!res) {
      alert("Check doesn't exist");
      return;
    }

    router.push(`/${check}`);
  };
  return (
    <div className={styles.findCheckWrapper}>
      <AppLogo color="white" />

      <div className={styles.findCheck}>
        <TextInput
          label="find a check"
          styles={{ backgroundColor: '#151515', color: 'var(--white)' }}
          maxLength={5}
          onChange={(e) => setCheck(e.target.value)}
          rightSection={
            <Button
              onClick={handleFindCheck}
              styles={{
                backgroundColor: 'white',
                height: '100%',
                padding: '0px 4px',
                color: 'var(--main-dark)',
              }}
            >
              <IconArrowRight size={16} stroke={1.5} />
            </Button>
          }
        />
      </div>
    </div>
  );
}

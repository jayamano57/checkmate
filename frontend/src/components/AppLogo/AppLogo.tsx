import Image from 'next/image';
import styles from './styles.module.css';
import LogoWhite from '../../assets/logo-white.png';

interface AppLogoProps {
  color: 'white' | 'black';
}

export function AppLogo({ color }: AppLogoProps) {
  return (
    <div className={styles.logoWrapper}>
      <Image
        width={240}
        src={color === 'white' ? LogoWhite : LogoWhite}
        alt="CheckMate logo"
        className={styles.logoImg}
      />
    </div>
  );
}

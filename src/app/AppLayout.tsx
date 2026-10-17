import { NavLink, Outlet } from 'react-router';
import {
  CalendarClock,
  House,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { useLogout } from '@/features/auth/api/useLogout';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useToastStore } from '@/stores/useToastStore';
import styles from './AppLayout.module.css';

type Tab = { to: string; label: string; icon: LucideIcon; end?: boolean };

const TABS: Tab[] = [
  { to: '/', label: '홈', icon: House, end: true },
  { to: '/history', label: '내역', icon: ReceiptText },
  { to: '/plan', label: '계획', icon: CalendarClock },
  { to: '/settings', label: '설정', icon: Settings },
];

function Logo() {
  return (
    <>
      <img
        className={`${styles.logo} ${styles.light}`}
        src="/logos/donchori-full-logo.webp"
        width={516}
        height={167}
        alt="돈초리"
      />
      <img
        className={`${styles.logo} ${styles.dark}`}
        src="/logos/donchori-full-logo-dark.webp"
        width={516}
        height={167}
        alt=""
      />
    </>
  );
}

/* 공통 레이아웃
 모바일: 상단 고정 헤더(로고·로그아웃) + 하단 탭바
 데스크톱: 좌측 사이드바
*/
export default function AppLayout() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);
  const showToast = useToastStore((s) => s.show);
  const logout = useLogout();

  const toggleLabel = collapsed ? '사이드바 펼치기' : '사이드바 접기';
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  const onLogout = () => {
    logout.mutate(undefined, {
      onError: () => showToast('로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });
  };

  return (
    <div className={collapsed ? `${styles.shell} ${styles.collapsed}` : styles.shell}>
      {/* 모바일 상단 헤더 */}
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Logo />
          <button
            type="button"
            className={styles.iconButton}
            aria-label="로그아웃"
            title="로그아웃"
            disabled={logout.isPending}
            onClick={onLogout}
          >
            <LogOut size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </header>

      <nav className={styles.nav} aria-label="주요 메뉴">
        <div className={styles.brand}>
          <Logo />
          <button
            type="button"
            className={styles.toggle}
            aria-label={toggleLabel}
            aria-expanded={!collapsed}
            onClick={toggle}
          >
            <ToggleIcon size={20} strokeWidth={1.75} aria-hidden />
            <span className={styles.tooltip} aria-hidden>
              {toggleLabel}
            </span>
          </button>
        </div>

        <ul className={styles.tabs}>
          {TABS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={styles.tab}>
                <span className={styles.tabIcon}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <span className={styles.tabLabel}>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 데스크톱 사이드바 하단 */}
        <button
          type="button"
          className={`${styles.tab} ${styles.logout}`}
          disabled={logout.isPending}
          onClick={onLogout}
        >
          <span className={styles.tabIcon}>
            <LogOut size={22} strokeWidth={1.75} aria-hidden />
          </span>
          <span className={styles.tabLabel}>로그아웃</span>
        </button>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

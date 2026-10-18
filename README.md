<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/logos/donchori-full-logo-dark.webp" />
  <img src="public/logos/donchori-full-logo.webp" alt="돈초리" height="72" />
</picture>

### 혼자 쓰려고 만든 가계부

</div>

<br />

## 주요 기능

| 화면 | 내용 |
| --- | --- |
| **홈** | 월 예산 등록, 남은 금액 · 수입 · 지출 요약, 빠른 기록, 최근 내역 · 많이 쓴 카테고리 조회 |
| **내역** | 일별 달력으로 하루씩 조회, 검색어 · 기간 · 카테고리로 전체 내역 조회, 거래 내역 수정·삭제 |
| **계획** | 예정 지출 체크리스트, 반복 거래 등록과 내역 자동 기록 |
| **설정** | 닉네임·비밀번호 변경, 라이트·다크·시스템 테마, 회원 탈퇴 |

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| 라이브러리 | React 19, React Router 7 |
| 언어 | TypeScript |
| 빌드 | Vite 7 |
| 상태 관리 | TanStack Query (서버 상태), Zustand (클라이언트 상태) |
| 폼 · 검증 | React Hook Form, Zod |
| 스타일 | CSS Modules, 디자인 토큰(CSS 변수), Pretendard |
| 백엔드 | Supabase (Auth, Postgres, RLS, pg_cron) |

## 시작하기

Node.js 20.19 이상

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
```

`.env.local`에 Supabase 프로젝트 정보 기입

```bash
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

```bash
# 3. DB 마이그레이션 적용 (Supabase CLI)
supabase link --project-ref <project-ref>
supabase db push

# 4. 개발 서버 실행
npm run dev
```

> [!NOTE]
> 반복 거래 자동 기록은 `pg_cron` 확장 사용<br /> Supabase 대시보드의 **Database → Extensions**에서 켜져 있는지 확인

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run typecheck` | 타입 검사 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier 포맷팅 |

## 폴더 구조

```
src/
├── app/          # 라우터, 공통 레이아웃, 전역 Provider
├── pages/        # 화면 단위 (home, history, plan, settings, login, signup)
│   └── <page>/
│       ├── sections/   # 화면을 이루는 섹션·모달
│       └── lib/        # 화면 전용 계산 로직
├── features/     # 도메인 단위 (auth, account, transaction, budget, plan, recurring)
│   └── <feature>/
│       ├── api/        # TanStack Query 훅, Supabase 호출
│       ├── model/      # 타입, Zod 스키마
│       └── ui/         # 도메인 컴포넌트
├── shared/       # 공용 UI(Button, Modal, TextField...), 훅, 유틸
├── stores/       # Zustand 스토어 (인증, 테마, 토스트, 사이드바)
└── styles/       # 디자인 토큰, 리셋, 전역 스타일

supabase/
└── migrations/   # 테이블, RLS 정책, 반복 거래 자동 기록, 회원 탈퇴 함수
```

## 데이터 구조

모든 테이블에 RLS를 걸어 본인 데이터만 읽고 쓰기 가능<br />회원 탈퇴 시 `auth.users`를 기준으로 함께 삭제 (`on delete cascade`)

| 테이블 | 내용 |
| --- | --- |
| `budgets` | 월별 예산 |
| `transactions` | 수입·지출 내역 |
| `recurring_transactions` | 반복 거래 (자동 기록된 내역은 `recurring_id`로 연결) |
| `planned_expenses` | 예정 지출 체크리스트 |

# HanGyp 웹사이트

2026 한–이집트 청소년 교류 프로그램 공식 사이트. Next.js(App Router) + Prisma/Postgres 기반.

## 로컬 실행

```bash
npm install
npx prisma generate
npx prisma migrate dev   # 로컬 Postgres에 테이블 생성
npx prisma db seed       # 팀원 갤러리 업로드 코드 생성 (아래 참고)
npm run dev
```

`.env`에 다음 값이 필요합니다 (로컬 개발용 기본값이 이미 채워져 있음):

- `DATABASE_URL` — Postgres 연결 문자열
- `GATE_ACCESS_CODE` — 명함에 인쇄해서 배포할 사이트 전체 접속 코드 (현재 `hangyp2026`은 개발용 임시값입니다. **실제로 명함을 인쇄하기 전에 반드시 바꿔주세요.**)
- `SESSION_SECRET` — 로그인 세션 쿠키 서명용 비밀키. 배포 전에 `openssl rand -hex 32`로 새로 생성해서 교체하세요.
- `BLOB_READ_WRITE_TOKEN` — (배포 시) Vercel Blob 토큰. 로컬 개발 중에는 없어도 되고, 그동안 업로드한 사진은 `public/uploads/gallery/`에 저장됩니다. Vercel에 배포하고 Blob 스토어를 연결하면 이 값이 자동으로 채워지고, 이후 업로드부터는 Blob에 저장됩니다.

### 갤러리 업로드 코드

`npx prisma db seed`를 실행하면 팀 페이지의 13명에게 각각 영문 대문자+숫자 12자리 코드가 무작위로 배정됩니다(헷갈리기 쉬운 0/O, 1/I/L 제외). 이 코드를 팀원 각자에게 전달하면, 갤러리 → "업로드하기" → 개인 코드 입력으로 로그인해서 본인 이름으로 사진을 올릴 수 있어요. 소문자로 입력해도 자동으로 인식됩니다.

**주의**: 시드를 실행할 때마다 13명 전원의 코드가 전부 새로 생성됩니다(콘솔에 한 번만 출력되고 저장되지 않음). 이미 나눠준 코드가 있다면 다시 실행하지 마세요 — 실제 배포 후에는 꼭 필요할 때만 신중하게 재발급하세요.

## 현재까지 구현된 것

- 접속 코드 게이트 (서버에서 검증, 로그인 유지 쿠키)
- 홈 (히어로, 철학 섹션)
- 소개, 팀(13명 마퀴 카드+상세), 타임라인, 캘린더, 문화(20개), 갤러리(팀원 코드 로그인 + 실제 업로드/좋아요/조회수/캡션 수정/삭제)
- 한/영/아랍어(RTL) 다국어 전환

## 앞으로 만들 것 (섹션별로 순차 진행 중)

연락처 · 반응형 최적화

## 배포 계획

Vercel + Vercel Postgres + Vercel Blob. 도메인을 구매하시면 Vercel 프로젝트 설정에서 연결하면 됩니다. 배포 후 `DATABASE_URL`을 Vercel Postgres 것으로 바꾸고 `npx prisma migrate deploy`와 `npx prisma db seed`를 한 번 실행해주세요.

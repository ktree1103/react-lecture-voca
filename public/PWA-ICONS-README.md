# PWA 아이콘 생성 방법

PWA가 제대로 작동하려면 다음 아이콘 파일들이 필요합니다:

- `pwa-192x192.png` - 192x192 크기의 PNG 아이콘
- `pwa-512x512.png` - 512x512 크기의 PNG 아이콘
- `apple-touch-icon.png` - 180x180 크기의 PNG 아이콘 (iOS용)
- `mask-icon.svg` - Safari용 SVG 아이콘 ✅ 완료
- `favicon.ico` - 파비콘

## 현재 상태

✅ **icon.svg** - 프로젝트 테마(보라색 그라데이션)에 맞게 업데이트됨
✅ **mask-icon.svg** - 심플한 책 아이콘으로 업데이트됨
✅ **테마 색상** - #667eea (보라색)로 설정됨

⚠️ **PNG 아이콘들** - 아래 방법으로 생성 필요

## 추천 방법: 온라인 도구 사용

1. https://realfavicongenerator.net/ 방문
2. `icon.svg` 파일 업로드
3. 설정:
   - iOS 배경색: #667eea
   - Android Chrome 테마: #667eea
4. 다운로드 후 다음 파일들을 `public/` 폴더에 복사:
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png`
   - `favicon.ico`

## 대안 1: ImageMagick 사용 (설치되어 있는 경우)

```bash
cd public

# 192x192
convert icon.svg -resize 192x192 pwa-192x192.png

# 512x512
convert icon.svg -resize 512x512 pwa-512x512.png

# Apple touch icon (180x180)
convert icon.svg -resize 180x180 apple-touch-icon.png

# favicon
convert icon.svg -resize 32x32 favicon.ico
```

## 대안 2: 브라우저에서 변환

1. icon.svg 파일을 브라우저에서 열기
2. 브라우저 개발자 도구 콘솔에서 스크린샷 저장
3. 온라인 이미지 편집 도구로 리사이즈

## 임시 방안

개발 중에는 현재 임시 파일들을 사용해도 괜찮습니다.
프로덕션 배포 전에 반드시 실제 아이콘으로 교체해주세요.

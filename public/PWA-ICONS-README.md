# PWA 아이콘 생성 방법

PWA가 제대로 작동하려면 다음 아이콘 파일들이 필요합니다:

- `pwa-192x192.png` - 192x192 크기의 PNG 아이콘
- `pwa-512x512.png` - 512x512 크기의 PNG 아이콘
- `apple-touch-icon.png` - 180x180 크기의 PNG 아이콘 (iOS용)
- `mask-icon.svg` - Safari용 단색 SVG 아이콘
- `favicon.ico` - 파비콘

## 온라인 도구로 생성하기

1. https://realfavicongenerator.net/ 방문
2. `icon.svg` 파일 업로드
3. 설정 완료 후 다운로드
4. 생성된 파일들을 `public/` 폴더에 복사

## 또는 ImageMagick 사용 (설치되어 있는 경우)

```bash
# 192x192
convert icon.svg -resize 192x192 pwa-192x192.png

# 512x512
convert icon.svg -resize 512x512 pwa-512x512.png

# Apple touch icon
convert icon.svg -resize 180x180 apple-touch-icon.png
```

## 임시 방안

현재는 임시 파일들이 생성되어 있습니다.
프로덕션 배포 전에 실제 아이콘으로 교체해주세요.

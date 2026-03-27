# Node 이미지 선택
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# package.json 먼저 복사 (캐싱 최적화)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 코드 복사
COPY . .

# Prisma client 생성
RUN npx prisma generate

# 포트 설정 (Express 기본 3000)
EXPOSE 3000

# 서버 실행
CMD ["node", "src/index.js"]
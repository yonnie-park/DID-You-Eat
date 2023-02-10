FROM node:16

# 환경변수 설정
ENV PORT=3000

# working directory 설정
WORKDIR /usr/src/app

# package.json, package-lock.json 파일 옮기기
COPY package*.json ./

# 의존성 다운로드
RUN npm install
RUN npm install --global pm2

# 파일 옮기기
COPY . .

# setting.sh 권한수정
RUN ["chmod", "+x", "/usr/src/app/setting.sh"]

# 빌드(dist 폴더 생성)
RUN npm run build

# 포트 개방
EXPOSE $PORT

#실행
ENTRYPOINT ["/usr/src/app/setting.sh"]
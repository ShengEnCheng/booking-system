const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    filename: 'space1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    filename: 'space2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    filename: 'space3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    filename: 'space4.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
    filename: 'logo.png'
  }
];

const publicDir = path.join(__dirname, '../public/images');

// 確保目錄存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 下載圖片
images.forEach(({ url, filename }) => {
  const filepath = path.join(publicDir, filename);
  
  if (fs.existsSync(filepath)) {
    console.log(`圖片 ${filename} 已存在，跳過下載`);
    return;
  }

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(filepath))
        .on('error', (err) => {
          console.error(`下載 ${filename} 失敗:`, err);
        })
        .on('close', () => {
          console.log(`成功下載 ${filename}`);
        });
    } else {
      console.error(`下載 ${filename} 失敗:`, response.statusCode);
    }
  }).on('error', (err) => {
    console.error(`請求 ${filename} 失敗:`, err);
  });
}); 
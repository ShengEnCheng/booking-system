import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import BookingForm from '../components/BookingForm'
import { spaces } from '../data/spaces'
import Image from 'next/image'
import { Space } from '@/types'
import Calendar from '@/components/Calendar'

const Home: NextPage = () => {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>長庚大學技術合作處創新育成中心 - 空間預約系統</title>
        <meta name="description" content="長庚大學技術合作處創新育成中心空間預約系統" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 導航欄 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="長庚大學 LOGO"
                className="h-10 w-auto"
              />
            </div>
            <div className="flex-grow flex justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                技術合作處創新育成中心
              </h1>
            </div>
            <div className="flex-shrink-0 w-10">
              {/* 這是一個空的 div，用來平衡布局 */}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            空間預約系統
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            歡迎使用創新育成中心空間預約系統，請選擇您想要預約的場所並填寫相關資料。
          </p>
        </div>

        {/* 說明文件區域 */}
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">長庚大學創新基地公共空間借用</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              長庚大學創新基地擁有700坪空間，內部設施比照哈佛大學iLab及法國42 school，建置生技醫療、建康服務、電子資訊及醫學影像為特色的空間與設施。以特色共同工作區(Co-Working Space)及創客空間(Maker Space)創新基地為根基，輔以「學生學習為中心之創客團隊自主學習的創新教學計畫」，與產、官、學、研及公協會合作推動雙育成平台營造創客實作環境，扶植師生創業團隊逐步規劃課程與工作坊，並輔導創新與創意公司之設立。
            </p>
            
            <p className="mb-6">
              為活化本基地空間於本校教職員生與進駐企業，特擬定本空間借用辦法，以下為借用空間說明。
            </p>

            <h3 className="text-xl font-semibold mb-4">空間借用說明：</h3>
            
            <ol className="list-decimal pl-6 space-y-4">
              <li>本基地各項空間使用以本中心辦理各項教育訓練課程、專題演講、名人講座、研討會、社團發表及各項活動為優先。期望能以本校之優良技術在課堂上分享、激發學員對產品創新上的創意，發揮拋磚引玉之效。</li>
              
              <li>申請單位填妥此線上表單後，副本將自動寄至聯絡信箱，請再次確認資料填寫無誤。</li>
              
              <li>校內社團申請場地需檢附完整活動申請單影本，請送至創新育成中心(第二醫學大樓B2行政辦公室)或E-mail到cgucii2@gmail.com。</li>
              
              <li>借用前可先參考下列網址會議室借用情形後，再與王小姐(分機3900)確認申請的場地是否能使用。
                <a href="https://cii.cgu.edu.tw/p/412-1062-14370.php?Lang=zh-tw" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://cii.cgu.edu.tw/p/412-1062-14370.php?Lang=zh-tw
                </a>
                <br />
                <span className="text-sm text-gray-600">
                  (備註 A.直接點擊網址會以EXCEL形式出現 B.將此網址複製貼到瀏覽器搜尋，可透過日曆形式查看)
                </span>
                <br />
                <span className="text-sm text-gray-600">
                  ※若因未注意或未確認而重複申請同一空間，本中心將開放空間給先申請單位，且不會額外通知。
                </span>
              </li>
              
              <li>〔創新發想基地〕與 〔共創空間〕 相隔一個轉角(兩邊皆為開放空間)，若〔共創空間〕與 〔創新發想基地〕同時段皆有活動或課程進行，恐會相互干擾，借用時請留意這兩個空間的借用狀況，自行斟酌評估後，再決定是否借用。</li>
              
              <li>逾預約時間15分鐘，視同放棄該次使用權利。上述各項說明詮釋與調整，逕由本基地管理單位為主。空間租借與使用上若有任何問題，歡迎來電或親洽櫃台詢問。</li>
              
              <li>若有〈無線網路〉使用需求，請於一週前向本校資訊中心申請"臨時帳號"。</li>
            </ol>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="mb-2">※須提供活動相關訊息(包含:流程表、出席人員...等資訊)以供場地管理單位參考。</p>
              <p>※使用當日，請務必先至育成中心辦公室確認場地借用(雙方確認場地原始狀況及設備使用)，結束後，亦需要到育成中心辦公室，請行政人員確認場地復原狀況!!</p>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>承辦單位：技合處-創新育成中心</p>
              <p>承辦人：王小姐(分機：3900)</p>
            </div>
          </div>
        </div>

        {/* 場所選擇 */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">選擇預約場所</h2>
          <div className="space-y-6">
            {/* 第一行：創新發想基地和共創空間 */}
            <div className="grid md:grid-cols-2 gap-4">
              {spaces.slice(0, 2).map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedSpace(space)}
                >
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{space.name}</h3>
                    <p className="text-gray-600">{space.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      容納人數：{space.capacity}人
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* 第二行：DEMO ROOM、小會議室和多功能會議室 */}
            <div className="grid md:grid-cols-3 gap-4">
              {spaces.slice(2).map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedSpace(space)}
                >
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{space.name}</h3>
                    <p className="text-gray-600">{space.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      容納人數：{space.capacity}人
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 日曆視圖 */}
        <div className="mt-8">
          <Calendar className="w-full" />
        </div>

        {/* 預約表單 */}
        {selectedSpace && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedSpace.name}
                </h3>
                <button
                  onClick={() => setSelectedSpace(null)}
                  className="absolute right-5 top-5 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <BookingForm space={selectedSpace} onClose={() => setSelectedSpace(null)} />
            </div>
          </div>
        )}
      </main>

      {/* 頁腳 */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>© 2024 長庚大學技術合作處創新育成中心. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home 
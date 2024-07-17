import React from 'react';
import Image from 'next/image';

const Home = () => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      textAlign: 'center', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',  // 中央寄せ
      paddingTop: '50px'      // 上部に50pxの余白
    }}>

    <div style={{ 
      margin: 'auto', 
      maxWidth: '300px'
      }}>

      <Image 
      src="/food_omisoshiru.png" 
      alt = "お味噌汁"
      width={300}
      height={200}
      />
    </div>
    <h1 style={{ fontSize: '36px',marginBottom: '300px'}}>今日のお味噌汁アプリ</h1>
      {/* ボタンの仮設置 */}
      <button style={{ 
        padding: '10px 20px', 
        borderStyle: 'solid', 
        borderColor: 'black', 
        borderWidth: '2px',
        fontSize: '20px',
        marginTop: '-20px'
      }}>
        Login with Google
      </button>
  </div>
  );
};

export default Home;

// import React from 'react';
// import Image from 'next/image';

// const Home = () => {
//   return (
//     <div style={{ 
//       backgroundColor: 'white', 
//       textAlign: 'center', 
//       height: '100vh', 
//       display: 'flex', 
//       flexDirection: 'column',
//       alignItems: 'center',   // 縦方向の中央寄せ
//       justifyContent: 'center', // 横方向の中央寄せ
//       paddingTop: '50px'       // 上部に50pxの余白を作る
//     }}>

//       <div style={{ 
//         margin: 'auto', 
//         maxWidth: '300px',
//         // marginBottom: '20px'  // 画像とテキストの間隔を調整
//       }}>
//         <Image 
//           src="/food_omisoshiru.png" 
//           alt="お味噌汁"
//           width={300}
//           height={200}
//         />
//       </div>
      
//       <h1 style={{ fontSize: '36px', marginBottom: '10px', marginTop: '-100px' }}>今日のお味噌汁アプリ</h1>
      
//       {/* ボタンの仮設置 */}
//       <button style={{ 
//         padding: '10px 20px', 
//         borderStyle: 'solid', 
//         borderColor: 'black', 
//         borderWidth: '2px',
//         fontSize: '20px',
//         marginTop: '-10px'
//       }}>
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default Home;


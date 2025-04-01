// import axios from "axios"
// import { useEffect, useState } from "react";
// import Markdown from 'react-markdown'


// function App() {
//   const [data,setData]=useState("")
//   const [loading,setLoading]=useState(false)
//   const [datafetched,setDataFetched]=useState(false)
//   async function fetchData(){
//     try{
//     setLoading(true)  

//     const fetchedData= await axios.get("http://127.0.0.1:8000/v1/getInvoiceData")
//     console.log(fetchedData.data.content)
//     const formattedData = "```plaintext\n" + fetchedData.data.content + "\n```"; 

//     setData(formattedData)
//     setDataFetched(true)
//     setLoading(false)

//     }
//     catch(error)
//     {
//       console.log(error)
//     }
//   }
//   function clearData()
//   {
//     setData("")
//     setDataFetched(false)
//     setLoading(false)
//   }
//   useEffect(()=>{
//     console.log(data)
//   },[data])

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center bg-black">
//       <div className="w-full h-3/4">
//       <div className="h-1/4 flex flex-col justify-center items-center">
//       <h1 className="text-2xl md:text-5xl">AI-Powered Invoice Data Extraction</h1>
//       <p className="mt-8">Smart Invoice Extraction – Powered by AI</p>
   
//       </div>
//       <div className="w-full mt-8 flex justify-center items-center ">
//         <button className="h-10 w-32 bg-slate-300 text-center border rounded-lg" onClick={(e)=>{fetchData()}}>Extract</button>
//         <button className="h-10 w-32 bg-slate-300 text-center m-8 border rounded-lg" onClick={(e)=>{clearData()}}>Clear</button>


//       </div>

//       <div>

//       </div>

//       <div className="flex mt-11  justify-center items-center"><div className="w-3/4 lg:w-[25%] text-sm border rounded-xl bg-slate-300 p-6">
//       {(datafetched==false && loading==false) ? <p className="text-center">Your Data will be show here</p>:<></>}
//       {(datafetched==false && loading==true) ? <p className="text-center">Loading......</p>:<></>}
//       {(datafetched==true && loading==false) ?  <Markdown>{data}</Markdown>
//       :<></>}


      
//       </div></div>
      
//   </div>
  
 
//   </div>

//   );
// }

// export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [datafetched, setDataFetched] = useState(false);

  async function fetchData() {
    try {
      if(datafetched==true)
      {
        setDataFetched(false);
      }
      setLoading(true);

      const fetchedData = await axios.get("https://invoiceproject-backend.onrender.com/v1/getInvoiceData");
      console.log(fetchedData.data.content);
      const formattedData = "```plaintext\n" + fetchedData.data.content + "\n```";

      setData(formattedData);
      setDataFetched(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function clearData() {
    setData("");
    setDataFetched(false);
    setLoading(false);
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-400">AI-Powered Invoice Data Extraction</h1>
        <p className="mt-4 text-gray-300">Smart Invoice Extraction – Powered by AI</p>
      </div>
      <div className="flex gap-6 mt-8">
        <button
          className="h-12 w-36 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md transition-all"
          onClick={fetchData}>
          Extract
        </button>
        <button
          className="h-12 w-36 bg-red-500 hover:bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md transition-all"
          onClick={clearData}
        >
          Clear
        </button>
      </div>
      <div className="mt-10 w-3/4 lg:w-[30%] text-sm border border-gray-600 rounded-xl bg-gray-800 p-6 shadow-lg">
        {(datafetched === false && loading === false) ? (
          <p className="text-center text-gray-400">Your Data will be shown here</p>
        ):<></>}
        {(datafetched === false && loading === true)? (
          <p className="text-center text-yellow-400">Loading...</p>
        ):<></>}
        {(datafetched === true && loading === false)?  (
          <div className="overflow-auto max-h-96 break-words text-green-400">
            <Markdown>{data}</Markdown>
          </div>
        ):<></>}
      </div>
    </div>
  );
}

export default App;


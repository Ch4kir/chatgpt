import './App.css';
import './normal.css';
import { useState,useEffect } from 'react';
import TypeText from './TypeText';
// import PulseLoader from "react-spinners/PulseLoader";

function App() {

//  use effect run once when app loads
useEffect(() => {
  getEngines();
},[])

//add a state for input and chat log
const [input, setInput]=useState("");
const [models, setModels]=useState([]);
const [darkMode,setDarkMode]=useState(true);
const [currentTemperature, setTCurrentTemperature] = useState(0);
const temperature = [0, 0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const [currentModel, setCurrentModel]= useState("text-davinci-003");
const [isLoading, setIsLoading] = useState(false)



const [chatLog, setChatLog]= useState([{
  user: "gpt",
  message:"How can i help you today?",
}]);



//darkmode function

const toggleDarkMode = () =>{
  setDarkMode(!darkMode);
}

// clear chat 

function clearChat(){
  setChatLog([{
    user: "gpt",
    message:"How can i help you today?",
  }])
}
//  function getEngines(){
  
const getEngines =() =>{
  fetch("http://localhost:3080/models")
  .then(res => res.json())
  .then(data => {
    console.log(" temp array!: ",data.models)
    setModels(data.models)
    // setModels(prevModels => [...prevModels,  data.models])
    console.log(" model variable  :", models)
  })
}


  async function handleSubmit(e){
 
  e.preventDefault();
  let chatLogNew = [...chatLog, {user: "me", message: `${input} 
  `}] 
  setInput("");
  
  setChatLog(chatLogNew)
  // fetch response to the api combining the chat log array of messages and sending it as a message to local host : 3080 as a post
  const messages = chatLogNew.map((message)=> message.message).
  join("\n")

  
  
  const response = await fetch("http://localhost:3080/",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message : messages,
      currentModel,
    })
  });
 
  const data = await response.json();
  setChatLog([...chatLogNew, {user: "gpt", message: isLoading ? "loading..." : (`${data.message}`) } ])   
  setIsLoading(false)
   // setChatLog([...chatLogNew, {user: "gpt", message: 
  // `${data.message} `}])

  console.log("response: \n", data.message);
  
  }
  
 
  return (
    <div className={`App ${darkMode ? "dark":"light"}`}>
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className='models'>
          <p className='engine'>Engine</p>
          <select className='modelselect' onChange={(e)=>{setCurrentModel(e.target.value)}}>  
            {
             models && models.length ? ( 
             models.map((model, index)=> (
              <option key={model.id} value={model.id}>{model.id}
              </option>
             ))
             ): (<option key={'text-davinci-003'} value={'text-davinci-003'}>
             {'text-davinci-003'}
           </option>
           )}
          </select> 
          <p>This parameter controls the engine used to generate the response. Davinci produces the best result as its the most recently updated (2021).</p>
          
          
          
          <p className='temperature'>Temperature</p>
          <select className='tempselect' value={currentTemperature} onChange={(e) => setTCurrentTemperature(e.target.value)}>
          {console.log(currentTemperature)}
          {
          temperature.map((temp, index) => (
            <option key={index} value={temp}>{temp}</option>
          ))
          
          }
        </select>
        <p>The temperature parameter controls the randomness of the model. 0 is the most logical, 1 is the most creative.</p>
        
        <div className='options'>
        
        <a class="mode" onClick={toggleDarkMode}> 
        {darkMode ? (
        
        <svg stroke="currentColor" fill="none"  strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>  ) : (
        <svg stroke="currentColor" fill="none"  strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        )
        }
        {darkMode ? "Dark mode" : "Light mode"}
        </a>
        
        <a href="https://discord.gg/openai" target="_blank" className="discord"><svg stroke="currentColor" fill="currentColor" strokeWidth="2" viewBox="0 0 640 512"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg> OpenAI Discord</a>

        <a href="https://help.openai.com/en/collections/3742473-chatgpt" target="_blank" className="faq"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" stroke-linejoin="round"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>Updates &amp; FAQ</a>
        </div>
        </div>
      </aside>

      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
          }  
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
          <input className='chat-input-textarea'
           placeholder='Type your message here' 
           rows="1"
           value={input}
           onChange={(e)=> setInput(e.target.value)}></input>
          </form>
        </div>
      </section>
      
    </div>
  );
}

const ChatMessage =({message}) =>{
return(
  <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className='chat-message-center'>

            <div className={`avatar ${message.user==="gpt" && "chatgpt"}`}>
            {message.user ==="gpt" && <svg 
            width={35} 
            height={35} 
            viewBox="0 0 41 41"
            fill='none'
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={1.5}
            className="h-6 w-6"
            >  
            <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
            </svg>
            }
            
            </div>

            <div className='message'> 
            {message.user ==="gpt" ? <TypeText text={message.message} typingSpeed={30}/> : message.message}
            
            
            </div>

            </div>
          </div>
)
}


 
export default App;





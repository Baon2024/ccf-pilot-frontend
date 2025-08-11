'use client'
import Image from "next/image";
import ArtistForm from "./components.js/artistForm";
import { useEffect, useState } from "react";
import PhotoModal from "./components.js/modal";
import ArtistForm2 from "./components.js/artistForm2";
import ContentDisplay from "./components.js/contentDisplay";
import ArtistForm3 from "./components.js/artistForm3";
import ArtistFormStreamPromise from "./components.js/artistForm5StreamPromise.js";


export default function Home() {
    //const navigate = useNavigate();
    const [ marketingStrategy, setMarketingStrategy ] = useState("")
    const [ loading, setLoading ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ onClose, setOnClose ] = useState(true);
    const [ artistLogoOptions, setArtistLogoOptions ] = useState([]);
    const [ keyWordsPhrases, setKeyWordsPhrases ] = useState([]);
    const [ showArtistForm, setShowArtistForm ] = useState(true);
    const [ resultsReady, setResultsReady ] = useState(false)
    const [ pressRelease, setPressRelease ] = useState([]) 
    const [ fontReccommendation, setFontReccomendation ] = useState({
      font: "",
      explanation: ""
    })
    const [ toggleImageGeneration, setToggleImageGeneration ] = useState(false) 

    useEffect(() => {
      console.log("marketingStrategy is: ", marketingStrategy);
      console.log("keyWordsPhrases is: ", keyWordsPhrases);
      console.log("pressRelease is: ", pressRelease);
      console.log("fontReccomendation is: ", fontReccommendation);
      console.log("artistLogoOptions are: ", artistLogoOptions);
      console.log("toggleImageGeneration is, ", toggleImageGeneration)
    },[marketingStrategy, artistLogoOptions, keyWordsPhrases, pressRelease, fontReccommendation, toggleImageGeneration])
   
  
    return <div className="min-h-screen w-full">
      {/*<Navbar />*/}
  
      {/* Hero Section */}
      <section className="min-h-screen w-full relative flex items-center justify-center px-4 md:px-8 pt-12">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 filter blur-3xl animate-float opacity-70"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/10 filter blur-3xl animate-float opacity-70" style={{
            animationDelay: "1s"
          }}></div>
        </div>
  
        <div className="max-w-5xl mx-auto text-center relative z-10 py-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            AI-Powered Music Marketing
          </div>
  
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
            Your AI Marketing Copilot for <span className="gradient-text">Music Success</span>
          </h1>
  
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{
            animationDelay: "0.3s"
          }}>Create stunning promotional materials, strategic insights, and targeted marketing campaigns - powered by realtime streaming data.</p>
  
          <div className="animate-fade-in" style={{
            animationDelay: "0.4s"
          }}>
          {/*{ artistLogoOptions && (
            <PhotoModal keyWordsPhrases={keyWordsPhrases} artistLogoOptions={artistLogoOptions} isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose} setOnClose={setOnClose} />
          )}*/}

          <div className="min-h-screen bg-white-100 p-4">
  <div className="max-w-4xl mx-auto">
    {showArtistForm ? (
      <ArtistFormStreamPromise //change back to 3, if this doesn't work
        setLoading={setLoading}
        setShowArtistForm={setShowArtistForm}
        setKeyWordsPhrases={setKeyWordsPhrases}
        setArtistLogoOptions={setArtistLogoOptions}
        setMarketingStrategy={setMarketingStrategy}
        setIsOpen={setIsOpen}
        setResultsReady={setResultsReady}
        setPressRelease={setPressRelease}
        setFontReccomendation={setFontReccomendation}
        setToggleImageGeneration={setToggleImageGeneration}
        toggleImageGeneration={toggleImageGeneration}
      />
    ) : loading ? (
      <div className="bg-white rounded-lg shadow-sm p-6 h-full min-h-[90vh] flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-600 text-sm font-medium">Generating your marketing strategy...</p>
      </div>
    ) : resultsReady ? (
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[90vh]">
        {/* ✅ Replace this with your results rendering UI */}
        <h2 className="text-xl font-semibold text-white-900 mb-4">Your Results</h2>
        <p className="text-gray-700">Here is your generated marketing strategy and assets...</p>
        {/* You can include components like <MarketingStrategyResult data={...} /> here */}
         <div className="min-h-screen bg-white-100 p-4">
      <div className="max-w-4xl mx-auto">
        <ContentDisplay toggleImageGeneration={toggleImageGeneration} fontReccommendation={fontReccommendation} keyWordsPhrases={keyWordsPhrases} artistLogoOptions={artistLogoOptions} pressRelease={pressRelease} />
      </div>
    </div>
      </div>
    ) : null}
  </div>
</div>

          
          
          {/*{ showArtistForm && (

          <ArtistForm setLoading={setLoading} setShowArtistForm={setShowArtistForm} setKeyWordsPhrases={setKeyWordsPhrases} setArtistLogoOptions={setArtistLogoOptions}  setMarketingStrategy={setMarketingStrategy} setIsOpen={setIsOpen}/>
)}
 { showArtistForm && (

          <ArtistForm2 setResultsReady={setResultsReady} setLoading={setLoading} setShowArtistForm={setShowArtistForm} setKeyWordsPhrases={setKeyWordsPhrases} setArtistLogoOptions={setArtistLogoOptions}  setMarketingStrategy={setMarketingStrategy} setIsOpen={setIsOpen}/>
)}  */}
          </div>
  
        </div>
      </section>
  
  
      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Music Copilot</h2>
            </div>
  
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a>
            </div>
  
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
  
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
  
              </a>
  
            </div>
          </div>
  
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Music Copilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
  };


  
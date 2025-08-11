"use client"
// Compact Efficient Design - Space-optimized with tabs and collapsible sections
import { useEffect, useState } from "react"
import { Music, Target, Globe, ArrowRight, Mail, Plus, X, ChevronDown, ChevronRight } from "lucide-react"
import { toast } from "sonner"


let baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001"

console.log("baseUrl in frontend is ", baseUrl)


export default function ArtistFormStreamPromise({
  setMarketingStrategy,
  setIsOpen,
  setArtistLogoOptions,
  setKeyWordsPhrases,
  setShowArtistForm,
  setLoading,
  setResultsReady,
  setPressRelease,
  setFontReccomendation,
  toggleImageGeneration ,
  setToggleImageGeneration
}) {
  // All the same state variables as original...
  const [name, setName] = useState("Elle L")
  const [localLoading, setLocalLoading] = useState(false)
  const [email, setEmail] = useState("infoelleL@gmail.com")
  const [genre, setGenre] = useState("Pop")
  const [targetAudience, setTargetAudience] = useState("unknown")
  const [socialPrescence, setSocialPrescence] = useState("instagram @ellel__90k")
  const [uniqueAngles, setUniqueAngles] = useState(
    `Elle L's career began at CNN, where she produced content, interviewed guests and created music for the network's feature shows. She also worked as second unit producer on a double Emmy nominated documentary for the BBC and IFC before taking an artistic leap to focus on her music.`,
  )
  const [artistPersonalQuote, setArtistPersonalQuote] = useState(
    `'A star on the rise' - Wonderland Magazine, 'Dynamic Avant Pop' - Clash Magazine, 'Continuing her ascension to Stardom' - Notion Magazine, 'Elle L is a music artist, director, regenerative fashion ambassador, advisor, and environmentalist who harnesses her talent and platform with her devotion to giving back. Elle L's philanthropic endeavours permeate all of her artistic initiatives' - UNESCO MGIEP, 'Elle plays a prominent role in UNEP's education about fashion and its impact on the loss of tropical rainforests' - Michael Stanley-Jones, UNEP UN Alliance for Sustainable Fashion`,
  )
  const [offstageDetailOrCause, setOffstageDetailOrCause] = useState(null)
  const [primaryContactEmail, setPrimaryContactEmail] = useState(null)
  const [additionalLinks, setAdditionalLinks] = useState([])
  const [keyInfluences, setKeyInfluences] = useState(["themes of interconnection, the cosmos and nature"])
  const [biggestMilestones, setBiggestMilestones] = useState([
    `First single, 'Sign,' self-produced with her production outfit Magna LV was released this year, received support from Apple Music and BBC Radio`,
  ])
  const [noticeablePress, setNoticeablePress] = useState([
    `Elle has already received a wave of critical acclaim and international radio support from BBC, Capital Xtra, Diplo's Sirius XM, playlists including Apple's 'Today's Easy Hits,' 'A-List Pop,' 'Future Pop,' 'Best of Shazam,' Spotify's 'New Music Friday,' and VEVO's 'New Music Friday.' Her magnetic presence has graced the pages of publications like British Vogue and Harper's Bazaar, while securing coveted press spots on playlists such as The Face, Wonderland's 'The Wonderlist and The Telegraph.`,
  ])
  const [upcomingDates, setUpcomingDates] = useState(["unknown"])
  const [albumArtFiles, setAlbumArtFiles] = useState(null)
  const [artistProfilePhotoFiles, setArtistProfilePhotoFiles] = useState(null)
  const [websiteUrl, setWebsiteUrl] = useState("www.testwebsiteurl.co.uk")
  const [trackList, setTrackList] = useState(["track 1", "track 2", "track 3", "track 4"])

  // UI state for collapsible sections
  const [activeTab, setActiveTab] = useState("basic")
  const [expandedSections, setExpandedSections] = useState({
    trackList: true,
    media: true,
    additional: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  useEffect(() => {
    console.log("activeTab is: ", activeTab)
  },[activeTab])

  // Same sentToBackend function as original...
  async function sentToBackend(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("genre", genre)
    formData.append("targetAudience", targetAudience)
    formData.append("socialPrescence", socialPrescence)
    formData.append("uniqueAngles", uniqueAngles)
    formData.append("artistPersonalQuote", artistPersonalQuote)
    formData.append("offstageDetailOrCause", offstageDetailOrCause)
    formData.append("primaryContactEmail", primaryContactEmail)
    formData.append("websiteUrl", websiteUrl)
    formData.append("trackList", JSON.stringify(trackList))
    formData.append("additionalLinks", JSON.stringify(additionalLinks))
    formData.append("keyInfluences", JSON.stringify(keyInfluences))
    formData.append("biggestMilestones", JSON.stringify(biggestMilestones))
    formData.append("noticeablePress", JSON.stringify(noticeablePress))
    formData.append("upcomingDates", JSON.stringify(upcomingDates))
    // need artist bio inut erhas
    
    /*instaTile?.forEach((file) => {
      formData.append('instaTile', instaTile)
    })*/
    
    albumArtFiles?.forEach((file) => {
      formData.append("albumArtFiles", file)
    })
    artistProfilePhotoFiles?.forEach((file) => {
      formData.append("artistProfilePhotoFiles", file)
    })

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1])
    }

    setShowArtistForm(false)
    setLoading(true)
    

    toast("marketing material generation started!")




    //frontend code for streaming: need to create individual server endpoints, just send same formdata to each and use whats neccesary

    //5001 lcoalhost
    const endpoints = {
  pressRelease: "https://ccf-pilot-backend.onrender.com/pressRelease",
  fontRecommendation: "https://ccf-pilot-backend.onrender.com/fonts",
  logoOptions: "https://ccf-pilot-backend.onrender.com/logos",
  keyWordsPhrases: "https://ccf-pilot-backend.onrender.com/keywords"
};

setLoading(false)
    setResultsReady(true) 

async function streamAndHandle(url, onData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let partial = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    partial += decoder.decode(value, { stream: true });
    const lines = partial.split("\n\n");
    partial = lines.pop();

    for (const line of lines) {
      if (!line) continue;
      try {
        onData(line);
      } catch (err) {
        console.error("Failed to handle streamed line:", line, err);
      }
    }
  }
}
function formatPressRelease(text) {
  return text
    .replace(/([.!?])\s+(?=[A-Z])/g, "$1\n\n") // Add double line breaks between sentences starting with capital letters
    .trim();
}

// Send all requests in parallel
const streams = [
  streamAndHandle(endpoints.pressRelease, (line) => {
    if (line.startsWith("data:")) {
      console.log("stream pipeline opened for pressRelease endpoint");
    } else {
      console.log("this is the value of pressRelease before trimming and replacing: ", line);
      const data = line.replace("pressRelease:", "").trim();
      const dataJsoned = JSON.parse(data);
      console.log("this is pressRelease after parsing from json", dataJsoned);
      setPressRelease([dataJsoned]);
    }
  }),

  streamAndHandle(endpoints.fontRecommendation, (line) => {
    if (line.startsWith("data:")) {
      console.log("stream pipeline opened for fonts endpoint");
    } else {
      const data = line.replace("fontAnswer:", "").trim();
      const parsed = JSON.parse(data);
      setFontReccomendation({ font: parsed.font, explanation: parsed.explanation });
    }
  }),

  streamAndHandle(endpoints.keyWordsPhrases, (line) => {
    console.log("Received line:", JSON.stringify(line));
    if (line.startsWith("data:")) {
      console.log("stream pipeline opened for keywords endpoint");
    } else {
      const dataStr = line.replace("keyWordsPhrases:", "").trim();
      const data = JSON.parse(dataStr);
      setKeyWordsPhrases(data);
    }
  }),
];

// ✅ Conditionally include logoOptions stream
if (toggleImageGeneration) {
  streams.push(
    streamAndHandle(endpoints.logoOptions, (line) => {
      if (line.startsWith("data:")) {
        console.log("stream pipeline opened for logos endpoint");
      } else {
        const data = line.replace("artistLogoOptions:", "").trim();
        setArtistLogoOptions(JSON.parse(data));
      }
    })
  );
}

// ✅ Wait for all included streams
await Promise.all(streams);


    
    toast.success("marketing materials generated!")

    
  }

  const tabs = [
  { id: "basic", label: "Basic Info", icon: Mail },
  { id: "content", label: "Content", icon: Music },
  { id: "profile", label: "Profile", icon: Target },
  { id: "extras", label: "Extras", icon: Globe }, // ✅ Add this back
]

const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
const isLastTab = currentIndex === tabs.length - 1;
console.log("lastTab is: ", isLastTab)

const handleSocialContentToggle = (checked) => {
  setToggleImageGeneration(checked)
}

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Compact Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Artist Marketing Form</h1>
                <p className="text-gray-600 text-sm">Complete your profile efficiently</p>
              </div>
            </div>
            <div className="text-right">
              {/* Social Media Content Generation Toggle */}
              <div className="flex items-center gap-3 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={toggleImageGeneration}
                    onChange={(e) => handleSocialContentToggle(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Generate Social Media Content</span>
                </label>
              </div>
              {toggleImageGeneration && <p className="text-xs text-indigo-600">✓ Social content will be generated</p>}
            </div>
          </div>
        </div>

        <form onSubmit={sentToBackend}>
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Artist Name *</label>
                      <input
                        type="text"
                        placeholder="Your stage name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Genre *</label>
                      <input
                        type="text"
                        placeholder="Pop, Rock, etc."
                        value={genre}
                        required
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="text"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="www.yoursite.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience *</label>
                      <input
                        type="text"
                        placeholder="Who's your audience?"
                        value={targetAudience}
                        required
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        placeholder="business@email.com"
                        value={primaryContactEmail}
                        onChange={(e) => setPrimaryContactEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-6">
                  {/* Collapsible Track List */}
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleSection("trackList")}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Track List</span>
                      {expandedSections.trackList ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedSections.trackList && (
                      <div className="px-4 pb-4 border-t border-gray-200">
                        <div className="space-y-2 mt-3">
                          {trackList.map((track, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <span className="w-6 h-6 bg-gray-100 rounded text-xs flex items-center justify-center font-medium">
                                {index + 1}
                              </span>
                              <input
                                type="text"
                                value={track}
                                onChange={(e) => {
                                  const updated = [...trackList]
                                  updated[index] = e.target.value
                                  setTrackList(updated)
                                }}
                                placeholder={`Track ${index + 1}`}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => setTrackList(trackList.filter((_, i) => i !== index))}
                                className="w-8 h-8 text-red-600 hover:bg-red-50 rounded-md flex items-center justify-center"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => setTrackList([...trackList, ""])}
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium mt-2"
                          >
                            <Plus className="w-3 h-3" />
                            Add track
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Media Upload */}
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleSection("media")}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Media Files *</span>
                      {expandedSections.media ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedSections.media && (
                      <div className="px-4 pb-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Press Photos *</label>
                            <input
                              type="file"
                              multiple
                              required
                              onChange={(e) => setArtistProfilePhotoFiles(Array.from(e.target.files))}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {artistProfilePhotoFiles?.length > 0 && (
                              <p className="text-xs text-gray-600 mt-1">
                                {artistProfilePhotoFiles.length} files selected
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Album Art *</label>
                            <input
                              type="file"
                              multiple
                              required
                              onChange={(e) => setAlbumArtFiles(Array.from(e.target.files))}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {albumArtFiles?.length > 0 && (
                              <p className="text-xs text-gray-600 mt-1">{albumArtFiles.length} files selected</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Social Presence *</label>
                    <textarea
                      placeholder="Describe your social media presence..."
                      value={socialPrescence}
                      required
                      onChange={(e) => setSocialPrescence(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unique Angles *</label>
                    <textarea
                      placeholder="What makes you unique?"
                      value={uniqueAngles}
                      required
                      onChange={(e) => setUniqueAngles(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quotes & Press *</label>
                    <textarea
                      placeholder="Personal quotes, press mentions..."
                      value={artistPersonalQuote}
                      required
                      onChange={(e) => setArtistPersonalQuote(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Offstage Details</label>
                    <textarea
                      placeholder="Causes, personal interests..."
                      value={offstageDetailOrCause}
                      onChange={(e) => setOffstageDetailOrCause(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Extras Tab */}
             {activeTab === "extras" && (
                 <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => toggleSection("additional")}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">Additional Information</span>
                      {expandedSections.additional ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {expandedSections.additional && (
                      <div className="px-4 pb-4 border-t border-gray-200">
                        <div className="space-y-6 mt-3">
                          {[
                            ["Additional Links", additionalLinks, setAdditionalLinks],
                            ["Key Influences", keyInfluences, setKeyInfluences],
                            ["Biggest Milestones", biggestMilestones, setBiggestMilestones],
                            ["Notable Press", noticeablePress, setNoticeablePress],
                            ["Upcoming Dates", upcomingDates, setUpcomingDates],
                          ].map(([label, values, setter]) => (
                            <div key={label} className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                              <div className="space-y-2">
                                {values.map((v, i) => (
                                  <div key={i} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={v}
                                      onChange={(e) => {
                                        const newVals = [...values]
                                        newVals[i] = e.target.value
                                        setter(newVals)
                                      }}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                      placeholder={`Enter ${label.toLowerCase().slice(0, -1)}...`}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setter(values.filter((_, idx) => idx !== i))}
                                      className="w-8 h-8 text-red-600 hover:bg-red-50 rounded-md flex items-center justify-center"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => setter([...values, ""])}
                                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add {label.toLowerCase().slice(0, -1)}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
               )}
            </div>
          </div>
            
               

          <div className="bg-white rounded-lg shadow-sm p-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-600">
        Step {tabs.findIndex((tab) => tab.id === activeTab) + 1} of {tabs.length}
      </div>
      <div className="flex gap-2">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`w-2 h-2 rounded-full ${
              tabs.findIndex((t) => t.id === activeTab) >= index ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>

    <div className="flex gap-3">
      {activeTab !== "basic" && (
        <button
          type="button"
          onClick={() => {
            const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1].id);
            }
          }}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Previous
        </button>
      )}

      {/* Use index instead of ID comparison for better control */}
      {activeTab !== "extras" ? (
  <button
    type="button"
    onClick={() => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }}
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
  >
    Next
    <ArrowRight className="w-3 h-3" />
  </button>
) : null}
{activeTab === "extras" && (
  <button
    type="submit"
    disabled={localLoading}
    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {localLoading ? (
      <>
        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Processing...
      </>
    ) : (
      <>
        Submit
        <ArrowRight className="w-3 h-3" />
      </>
    )}
  </button>
)}

    </div>
  </div>
</div>
        </form>
      </div>
    </div>
  )
}
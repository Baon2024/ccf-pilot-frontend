'use client'
// JS version of ArtistForm component (converted from TypeScript)

import { useState } from "react";
import { Music, Target, Globe, ArrowRight, Mail, Lock, Camera, Plus, X } from 'lucide-react';


export default function ArtistForm({ setMarketingStrategy, setIsOpen, setArtistLogoOptions, setKeyWordsPhrases, setShowArtistForm, setLoading }) {
  /*const [ name, setName ] = useState("");
  const [ uploadedFiles, setUploadedFiles ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState("info@elleL@gmail.com")
  const [ genre, setGenre ] = useState("Pop")
  const [ targetAudience, setTargetAudience ] = useState("unknown")
  const [ socialPrescence, setSocialPrescence ] = useState("instagram @ellel__90k")
  const [ uniqueAngles, setUniqueAngles ] = useState(`Elle L’s career began at CNN, where she produced content, interviewed guests and created 
music for the network’s feature shows. She also worked as second unit producer on a double 
Emmy nominated documentary for the BBC and IFC before taking an artistic leap to focus on 
her music.`)
  const [artistPersonalQuote, setArtistPersonalQuote] = useState("");
const [offstageDetailOrCause, setOffstageDetailOrCause] = useState("");
const [primaryContactEmail, setPrimaryContactEmail] = useState("");

const [additionalLinks, setAdditionalLinks] = useState([]);
const [keyInfluences, setKeyInfluences] = useState([]);
const [biggestMilestones, setBiggestMilestones] = useState([]);
const [noticeablePress, setNoticeablePress] = useState([]);
const [upcomingDates, setUpcomingDates] = useState([]);
const [ albumArtFiles, setAlbumArtFiles ] = useState(null);
const [artistProfilePhotoFiles, setArtistProfilePhotoFiles ] = useState(null);*/

const [name, setName] = useState("Elle L");
const [ localLoading, setLocalLoading ] = useState(false);
const [email, setEmail] = useState("infoelleL@gmail.com");
const [genre, setGenre] = useState("Pop");
const [targetAudience, setTargetAudience] = useState("unknown");
const [socialPrescence, setSocialPrescence] = useState("instagram @ellel__90k");

const [uniqueAngles, setUniqueAngles] = useState(`Elle L’s career began at CNN, where she produced content, interviewed guests and created 
music for the network’s feature shows. She also worked as second unit producer on a double 
Emmy nominated documentary for the BBC and IFC before taking an artistic leap to focus on 
her music.`);

const [artistPersonalQuote, setArtistPersonalQuote] = useState(`‘A star on the rise’ - Wonderland Magazine, ‘Dynamic Avant Pop’ - Clash Magazine, 
’Continuing her ascension to Stardom’ - Notion Magazine, ‘Elle L is a music artist, director, 
regenerative fashion ambassador, advisor, 
and environmentalist who harnesses her 
talent and platform with her devotion to 
giving back. Elle L’s philanthropic 
endeavours permeate all of her artistic 
initiatives’ - UNESCO MGIEP, 
‘Elle plays a prominent role in UNEP’s 
education about fashion and its impact on 
the loss of tropical rainforests’ - Michael Stanley-Jones, UNEP UN Alliance for Sustainable Fashion`);

const [offstageDetailOrCause, setOffstageDetailOrCause] = useState(null);
const [primaryContactEmail, setPrimaryContactEmail] = useState(null);

const [additionalLinks, setAdditionalLinks] = useState([]);
const [keyInfluences, setKeyInfluences] = useState([
  "themes of interconnection, the cosmos and nature"
]);

const [biggestMilestones, setBiggestMilestones] = useState([
  `First single, ‘Sign,’ self-produced with her production outfit Magna 
LV was released this year, received support from Apple Music and BBC Radio`
]);

const [noticeablePress, setNoticeablePress] = useState([
  `Elle has already received a wave of critical acclaim and international radio support from 
BBC, Capital Xtra, Diplo’s Sirius XM, playlists including Apple's 'Today's Easy Hits,’ 'A-List 
Pop,' ‘Future Pop,' 'Best of Shazam,' Spotify's 'New Music Friday,' and VEVO's 'New Music 
Friday.' Her magnetic presence has graced the pages of publications like British Vogue and 
Harper's Bazaar, while securing coveted press spots on playlists such as The Face, 
Wonderland's 'The Wonderlist and The Telegraph.`
]);

const [upcomingDates, setUpcomingDates] = useState(["unknown"]);
const [albumArtFiles, setAlbumArtFiles] = useState(null);
const [artistProfilePhotoFiles, setArtistProfilePhotoFiles] = useState(null);

// Optional extras if needed:
const [websiteUrl, setWebsiteUrl] = useState("www.testwebsiteurl.co.uk");
const [trackList, setTrackList] = useState([
  "track 1", "track 2", "track 3", "track 4"
]);



  

  async function sentToBackend(e) {
    e.preventDefault()

    /*let infoObject = {
        name,
        email,
        genre,
        targetAudience,
        socialPrescence,
        uniqueAngles,
        artistPersonalQuote,
        offstageDetailOrCause,
        primaryContactEmail,
        additionalLinks,
        keyInfluences,
        biggestMilestones,
        noticeablePress,
        upcomingDates
    }*/

    //console.log("value of infoObject is:", infoObject);

    let formData = new FormData();
    // Append text fields
  formData.append("name", name);
  formData.append("email", email);
  formData.append("genre", genre);
  formData.append("targetAudience", targetAudience);
  formData.append("socialPrescence", socialPrescence);
  formData.append("uniqueAngles", uniqueAngles);
  formData.append("artistPersonalQuote", artistPersonalQuote);
  formData.append("offstageDetailOrCause", offstageDetailOrCause);
  formData.append("primaryContactEmail", primaryContactEmail);
  formData.append('websiteUrl', websiteUrl);
  formData.append('trackList', JSON.stringify(trackList));

  // Append arrays as JSON strings
  formData.append("additionalLinks", JSON.stringify(additionalLinks));
  formData.append("keyInfluences", JSON.stringify(keyInfluences));
  formData.append("biggestMilestones", JSON.stringify(biggestMilestones));
  formData.append("noticeablePress", JSON.stringify(noticeablePress));
  formData.append("upcomingDates", JSON.stringify(upcomingDates));
  //formData.append('artistProfilePhotoFiles', JSON.stringify(artistProfilePhotoFiles))


  albumArtFiles?.forEach((file) => {
  formData.append("albumArtFiles", file); // consistent key
});

  artistProfilePhotoFiles?.forEach((file) => {
    formData.append('artistProfilePhotoFiles', file);
  })

//upload profile pic, then re-use uploadedFiles for multiple akbum art images.

for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}

setShowArtistForm(false)
setLoading(true)

    const response = await fetch("http://localhost:5001/test", {
        method: "POST",
        body: formData
    })

  
  const data = await response.json();
  console.log("data returned from backend is: ", data);

  console.log("data.pressRelease is: ", data.pressRelease);
  //console.log("data.pressPhoto is: ", data.pressPhoto);
  console.log("data.brandGuide is: ", data.brandGuide)//because brandGuide contains object inside of an array
  console.log("artistLogoOptions is: ", data.brandGuide.artistLogoOptions);
  console.log("data.keyWordsPhrases is: ", data.brandGuide.keyWordsPhrases)

  setMarketingStrategy(data.pressRelease);
  //setPressPhoto(data.pressPhoto)
  setIsOpen(true);
  //setBrandGuide(data.brandGuide)
  setArtistLogoOptions(data.brandGuide.artistLogoOptions);
  setKeyWordsPhrases(data.brandGuide.keyWordsPhrases)

  //seperate api call to a endpoint to generate the Electronic Press Kit - only send relevant data
  let epkFormData = new FormData();

  albumArtFiles?.forEach((file) => {
  epkFormData.append("albumArtFiles", file); // consistent key
});

artistProfilePhotoFiles?.forEach((file) => {
  epkFormData.append("artistProfilePhotoFiles", file); // consistent key
});

const edkResponse = await fetch('http://localhost:5001/EDK', {
  method: "POST",
  body: epkFormData
})

const dataEPK = await edkResponse.json();
console.log("data back from epk endpoint is: ", dataEPK);

setLoading(false)


  //send artist photo, album covers, bio text, 
  //what else to send??


}

  

  return (
    <>
      <form onSubmit={sentToBackend}>
  <h2 className="text-2xl font-semibold mb-6 mt-2">
    Tell us about your music
  </h2>
  <button type="submit">submit</button>

  <input
    type="email"
    placeholder="Email"
    value={email}
    required
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 rounded border"
    
  />

  <input
    type="text"
    placeholder="Artist/Band Name"
    value={name}
    required
    onChange={(e) => setName(e.target.value)}
    className="w-full p-3 rounded border"
    
  />

  <input
    type="text"
    placeholder="Genre"
    value={genre}
    required
    onChange={(e) => setGenre(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <div className="space-y-2">
  <label className="block font-medium">Website URL</label>
  <input
    type="text"
    value={websiteUrl}
    onChange={(e) => setWebsiteUrl(e.target.value)}
    placeholder="Enter your official website URL"
    className="w-full p-3 rounded border"
  />
</div>

<div className="space-y-2">
  <label className="block font-medium">Track List</label>

  {trackList.map((track, index) => (
    <div key={index} className="flex gap-2">
      <input
        type="text"
        value={track}
        onChange={(e) => {
          const updated = [...trackList];
          updated[index] = e.target.value;
          setTrackList(updated);
        }}
        placeholder={`Track ${index + 1}`}
        className="flex-1 p-3 rounded border"
      />
      <button
        type="button"
        onClick={() => setTrackList(trackList.filter((_, i) => i !== index))}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() => setTrackList([...trackList, ""])}
    className="text-sm text-blue-600 underline"
  >
    + Add track
  </button>
</div>



  <input
    type="text"
    placeholder="Target Audience"
    value={targetAudience}
    required
    onChange={(e) => setTargetAudience(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <textarea
    placeholder="Social Presence"
    value={socialPrescence}
    required
    onChange={(e) => setSocialPrescence(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <textarea
    placeholder="Unique Angles"
    value={uniqueAngles}
    required
    onChange={(e) => setUniqueAngles(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <textarea
    placeholder="Artist Personal Quote"
    value={artistPersonalQuote}
    required
    onChange={(e) => setArtistPersonalQuote(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <textarea
    placeholder="Offstage Detail or Cause"
    value={offstageDetailOrCause}
    onChange={(e) => setOffstageDetailOrCause(e.target.value)}
    className="w-full p-3 rounded border"
  />

  <input
    type="email"
    placeholder="Primary Contact Email"
    value={primaryContactEmail}
    onChange={(e) => setPrimaryContactEmail(e.target.value)}
    className="w-full p-3 rounded border"
  />

  {/*<div className="space-y-2">
  <label className="text-sm font-medium flex items-center gap-2">
    <Camera className="w-4 h-4" />
    Upload Media Files
  </label>
  <input
    type="file"
    multiple
    onChange={(e) => setUploadedFiles(Array.from(e.target.files))}
    className="block w-full text-sm text-gray-500"
  />
  {uploadedFiles?.length > 0 && (
    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
      {uploadedFiles.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>*/}

<div className="space-y-2">
  <label className="text-sm font-medium flex items-center gap-2">
    <Camera className="w-4 h-4" />
    Upload press photos
  </label>
  <input
    type="file"
    multiple
    required
    onChange={(e) => setArtistProfilePhotoFiles(Array.from(e.target.files))}
    className="block w-full text-sm text-gray-500"
  />
  {artistProfilePhotoFiles?.length > 0 && (
    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
      {artistProfilePhotoFiles.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>

<div className="space-y-2">
  <label className="text-sm font-medium flex items-center gap-2">
    <Camera className="w-4 h-4" />
    Upload album art
  </label>
  <input
    type="file"
    multiple
    required
    onChange={(e) => setAlbumArtFiles(Array.from(e.target.files))}
    className="block w-full text-sm text-gray-500"
  />
  {albumArtFiles?.length > 0 && (
    <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
      {albumArtFiles.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  )}
</div>


  {/* Basic repeater rendering for array fields */}
  {[["Additional Links", additionalLinks, setAdditionalLinks],
    ["Key Influences", keyInfluences, setKeyInfluences],
    ["Biggest Milestones", biggestMilestones, setBiggestMilestones],
    ["Notable Press", noticeablePress, setNoticeablePress],
    ["Upcoming Dates", upcomingDates, setUpcomingDates]].map(
    ([label, values, setter]) => (
      <div key={label} className="space-y-2">
        <label className="block font-medium">{label}</label>
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const newVals = [...values];
                newVals[i] = e.target.value;
                setter(newVals);
              }}
              className="flex-1 p-3 rounded border"
            />
            <button
              type="button"
              onClick={() => setter(values.filter((_, idx) => idx !== i))}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setter([...values, ""])}
          className="text-sm text-blue-600 underline"
        >
          + Add {label.toLowerCase()}
        </button>
      </div>
    )
  )}

  <div className="flex justify-end pt-4">
    <button
      type="submit"
      disabled={localLoading}
      className="px-6 py-3 rounded-xl bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition-colors"
    >
      
    </button>
  </div>
</form>

      
    </>
  );
}

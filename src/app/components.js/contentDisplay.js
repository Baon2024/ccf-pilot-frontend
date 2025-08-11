
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import Image from "next/image"
import { FileText, Palette, Hash, Type, Loader2 } from "lucide-react"


export default function ContentDisplay({ pressRelease, keyWordsPhrases, artistLogoOptions, fontReccommendation, toggleImageGeneration }) {
  

    //need to make conditional, for streaming-proof
    // Spinner component
const Spinner = ({ message = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-3" />
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
)

   return (
    <div className="space-y-8">
      {/* Body Text Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            Press Release Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
             {pressRelease && pressRelease.length > 0 ? (
      <div className="text-gray-700 leading-relaxed text-base font-medium bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        {Object.values(pressRelease[0]).map((para, index) => (
          <p key={index} className="mb-4">
            {para}
          </p>
        ))}
      </div>
    ) : (
      <Spinner message="Loading press release content..." />
    )}
          </div>
        </CardContent>
      </Card>

      {/* Images Section */}
      
      {toggleImageGeneration && (
  <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
    <CardHeader className="pb-6">
      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Palette className="h-5 w-5 text-purple-600" />
        </div>
        Social Media Image Options
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => {
          const image = artistLogoOptions?.[index];
          return (
            <div key={index} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gray-200 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {image ? (
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt="Artist logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Spinner message={`Generating logo ${index + 1}...`} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {image && (
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-sm font-semibold text-purple-800 mb-1">Recommended Colors</p>
                    <p className="text-sm text-purple-700 leading-relaxed">
                      {image.colorsToReccomend}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
)}


      {/* Key Words Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
            <div className="p-2 bg-green-100 rounded-lg">
              <Hash className="h-5 w-5 text-green-600" />
            </div>
            Key Words & Phrases
          </CardTitle>
        </CardHeader>
        <CardContent>
          {keyWordsPhrases && keyWordsPhrases.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {keyWordsPhrases.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200 font-medium shadow-sm"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          ) : (
            <Spinner message="Loading key words and phrases..." />
          )}
        </CardContent>
      </Card>

      {/* Font Recommendation Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Type className="h-5 w-5 text-orange-600" />
            </div>
            Font Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {fontReccommendation?.font ? (
            <div className="w-full space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-20"></div>
                <div className="relative block w-full break-words whitespace-pre-wrap text-gray-800 font-bold text-lg bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200 shadow-sm">
                  {fontReccommendation.font}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm">
                <h4 className="font-semibold text-orange-800 mb-3 text-sm uppercase tracking-wide">Why This Font?</h4>
                <p className="text-gray-700 leading-relaxed font-medium">{fontReccommendation.explanation}</p>
              </div>
            </div>
          ) : (
            <Spinner message="Loading font recommendation..." />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

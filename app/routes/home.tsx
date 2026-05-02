import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerControlGroup,
  AudioPlayerFastForward,
  AudioPlayerPlay,
  AudioPlayerRewind,
  AudioPlayerSeekBar,
  AudioPlayerTimeDisplay,
  AudioPlayerVolume,
} from "@/components/audio/player"
import type { Track } from "@/lib/html-audio"
import { useAudioStore } from "@/lib/audio-store"
import { useEffect, useState } from "react"
import Form from "~/components/Form"

export default function Home() {
  //State
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [radioOption, setRadioOption] = useState<string>("sala-concierto")
  const [audioURL, setAudioURL] = useState("")
  const [isAudio, setIsAudio] = useState(false)
  const setQueue = useAudioStore((state) => state.setQueue)

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL)
      }
    }
  }, [audioURL])

  const handleSubmit = async () => {
    if (!audioFile) return

    const formData = new FormData()
    formData.append("file", audioFile)

    const response = await fetch(
      `http://localhost:3000/api/file/${radioOption}`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response) {
      throw new Error("Sin respuesta")
    }

    if (response.status === 200) {
      const audioBlob = await response.blob()
      const url = URL.createObjectURL(audioBlob)
      const processedTrack: Track = {
        id: `processed-${Date.now()}`,
        title: audioFile.name || "Audio procesado",
        artist: radioOption,
        url,
      }

      setAudioURL(url)
      setQueue([processedTrack], 0)
      setIsAudio(true)
      return
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setAudioFile(file)
  }

  return (
    <>
      <div className="jacquard-12-regular text-center text-6xl my-6">
        <p>Matlab sound engine</p>
      </div>
      <div className="container flex max-w-screen items-center justify-center">
        <div className="mt-4 w-lg rounded-lg p-6">
          <div className="mx-auto w-2xs">
            <img src="/image.png" alt="" />
          </div>
          <Form
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            setRadioOption={setRadioOption}
          />

          {isAudio && (
            <AudioPlayer className="mt-6">
              <AudioPlayerControlBar variant="stacked">
                <AudioPlayerControlGroup>
                  <AudioPlayerTimeDisplay />
                  <AudioPlayerSeekBar />
                  <AudioPlayerTimeDisplay remaining />
                </AudioPlayerControlGroup>
                <AudioPlayerControlGroup className="justify-center">
                  <AudioPlayerControlGroup className="w-auto">
                    <AudioPlayerRewind />
                    <AudioPlayerPlay />
                    <AudioPlayerFastForward />
                  </AudioPlayerControlGroup>
                  <AudioPlayerVolume />
                </AudioPlayerControlGroup>
              </AudioPlayerControlBar>
            </AudioPlayer>
          )}
        </div>
      </div>
    </>
  )
}

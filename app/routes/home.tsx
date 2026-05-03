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
import SpinnerComponent from "~/components/SpinnerComponent"
import { DialogScrollableContent } from "~/components/PopUp2"

export default function Home() {
  //State
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [radioOption, setRadioOption] = useState<string>("sala-concierto")
  const [audioURL, setAudioURL] = useState("")
  const [uploadedAudioURL, setUploadedAudio] = useState("")
  const [irURL, setIrURL] = useState("")
  const [isSent, setIsSent] = useState(false)
  const [isAudio, setIsAudio] = useState(false)
  const setQueue = useAudioStore((state) => state.setQueue)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL)
      }
    }
  }, [audioURL])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setAudioFile(file)

    if (file) {
      setUploadedAudio(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!audioFile) return

    const formData = new FormData()
    formData.append("file", audioFile)

    setIsLoading(true)
    setIsSent(false)

    const response = await fetch(
      `http://localhost:3000/api/file/${radioOption}`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response) {
      setIsLoading(false)
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

      switch (radioOption) {
        case "sala-concierto":
          setIrURL("/ir_sala_concierto.wav")
          break
        case "catedral":
          setIrURL("/ir_catedral.wav")
          break
        case "cuarto":
          setIrURL("/ir_cuarto.wav")
          break
        case "lab":
          setIrURL("/ir_lab.wav")
          break
      }

      setIsLoading(false)
      setAudioURL(url)
      setQueue([processedTrack], 0)
      setIsAudio(true)
      setIsSent(true)
      return
    }
  }

  return (
    <>
      <div className="jacquard-12-regular my-6 text-center text-6xl">
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

          {isLoading && <SpinnerComponent />}

          {isAudio && isSent && (
            <>
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
            </>
          )}
        </div>
      </div>

      {!isLoading && isSent && (
        <>
          <div className="my-6 flex max-w-screen justify-center">
            <DialogScrollableContent
              audioURL={audioURL}
              uploadedAudioURL={uploadedAudioURL}
              irURL={irURL}
            />
          </div>
        </>
      )}
    </>
  )
}

import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
  FieldContent,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Root as RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "~/components/ui/radio-group"
import { useState } from "react"

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [radioOption, setRadioOption] = useState<string>("sala-concierto")
  const [audioURL, setAudioURL] = useState("")
  const [isAudio, setIsAudio] = useState(false)

  const handleSubmit = async () => {
    if (!audioFile) return

    //Crear datos del formularo
    const formData = new FormData()
    //Campos del formulario
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
      setAudioURL(url)
      setIsAudio(true)
      console.log("ok")
      return
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setAudioFile(file)
  }

  return (
    <div className="container flex max-w-screen items-center justify-center">
      <div className="min-w-lg p-6">
        <FieldGroup className="py-4">
          <Field>
            <FieldLabel htmlFor="input">Audio de entrada</FieldLabel>
            <Input
              id="file-input"
              type="file"
              accept=".wav"
              onChange={handleInput}
            ></Input>
            <FieldDescription>Sube tu archivo de audio</FieldDescription>
          </Field>
          <RadioGroup
            defaultValue="sala-concierto"
            className="w-fit"
            onValueChange={(value: string) => setRadioOption(value)}
          >
            <Field orientation="horizontal" className="py-2">
              <RadioGroupItem value="sala-concierto" id="desc-r1" />
              <FieldContent>
                <FieldLabel htmlFor="desc-r1">Sala de conciertos</FieldLabel>
                <FieldDescription>
                  Respuesta impulsional de una sala de conciertos. Reverberación
                  moderada:
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" className="py-2">
              <RadioGroupItem value="catedral" id="desc-r2" />
              <FieldContent>
                <FieldLabel htmlFor="desc-r2">Catedral</FieldLabel>
                <FieldDescription>
                  Respuesta impulsional de una catedral. Reverberación fuerte.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" className="py-2">
              <RadioGroupItem value="cuarto" id="desc-r3" />
              <FieldContent>
                <FieldLabel htmlFor="desc-r3">Cuarto pequeño</FieldLabel>
                <FieldDescription>
                  Respuesta impulsional para una habitación pequeña. Atenuación
                  leve.
                </FieldDescription>
              </FieldContent>
            </Field>
          </RadioGroup>

          <Button onClick={handleSubmit}>Envíar</Button>
        </FieldGroup>
        <div>{isAudio && <audio controls src={audioURL}></audio>}</div>
      </div>
    </div>
  )
}

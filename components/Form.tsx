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

interface FormProps {
  handleSubmit: () => Promise<void>
  handleInput: (e: React.ChangeEvent<HTMLInputElement, Element>) => void
  setRadioOption: (value: string) => void
}

const Form = ({ handleSubmit, setRadioOption, handleInput }: FormProps) => {
  return (
    <>
      <div className="">
        <FieldGroup className="py-4">
          <Field>
            <FieldLabel htmlFor="file-input">Audio de entrada</FieldLabel>
            <Input
              id="file-input"
              type="file"
              accept=".wav"
              onChange={handleInput}
            />
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
                  moderada.
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
            <Field orientation="horizontal" className="py-2">
              <RadioGroupItem value="lab" id="desc-r4" />
              <FieldContent>
                <FieldLabel htmlFor="desc-r4">Laboratorio de analítica de datos</FieldLabel>
                <FieldDescription>
                  Respuesta impulsional para una habitación grande. Atenuación y reveberación
                  leves.
                </FieldDescription>
              </FieldContent>
            </Field>
          </RadioGroup>

          <Button onClick={handleSubmit}>Enviar</Button>
        </FieldGroup>
      </div>
    </>
  )
}

export default Form

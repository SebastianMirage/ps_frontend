import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
  FieldDescription,
  FieldContent,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Root as RadioGroup } from "@radix-ui/react-radio-group"
import { RadioGroupItem } from "~/components/ui/radio-group"

export default function Home() {
  function handleSubmit() {
    console.log("Enviado")
  }

  return (
    <div className="flex min-h-screen max-w-full p-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input">Hola</FieldLabel>
          <Input
            id="file-input"
            type="file"
            accept=".wav, .aac, mp3, .flac"
          ></Input>
          <FieldDescription>Sube tu archivo de audio</FieldDescription>
        </Field>
        <RadioGroup defaultValue="comfortable" className="w-fit">
          <Field orientation="horizontal">
            <RadioGroupItem value="default" id="desc-r1" />
            <FieldContent>
              <FieldLabel htmlFor="desc-r1">Default</FieldLabel>
              <FieldDescription>
                Standard spacing for most use cases.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="comfortable" id="desc-r2" />
            <FieldContent>
              <FieldLabel htmlFor="desc-r2">Comfortable</FieldLabel>
              <FieldDescription>More space between elements.</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="compact" id="desc-r3" />
            <FieldContent>
              <FieldLabel htmlFor="desc-r3">Compact</FieldLabel>
              <FieldDescription>
                Minimal spacing for dense layouts.
              </FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>

        <Button onClick={handleSubmit}>Envíar</Button>
      </FieldGroup>
    </div>
  )
}

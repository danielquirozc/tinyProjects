import { formulas } from "./formulas"
const error = document.querySelector('#error') as HTMLParagraphElement
const form = document.querySelector('#converterForm') as HTMLFormElement

type formData = {
  temperature : number
  fromUnit : string
  toUnit : string
}

const handleSubmit = (e : Event) => {
  e.preventDefault()
  const formData = new FormData(form)
  const dataObj = Object.fromEntries(formData);
  const data: formData = {
    temperature: Number(dataObj.temperature),
    fromUnit: dataObj.fromUnit as string,
    toUnit: dataObj.toUnit as string,
  };
  
  if (
    isNaN(data.temperature) ||
    typeof data.fromUnit !== 'string' ||
    typeof data.toUnit !== 'string'
  ) {
    error?.classList.remove('hidden')
    return;
  }
  document.querySelector('#error')?.classList.add('hidden')
  
  try {
    const result = formulas[data.fromUnit][data.toUnit](data.temperature)
    error?.classList.add('hidden')
    const grados = document.querySelector('#grados') as HTMLHeadingElement
    grados.innerHTML = `${result} ${data.toUnit}`
  } catch (err) {
    error?.classList.remove('hidden')
    error.innerHTML = 'Ah ocurrido un error, revisa los datos ingresados'
  }
}

// Events
form?.addEventListener('submit', handleSubmit)
import { formulas } from "./formulas"
const grados = document.querySelector('#grados') as HTMLHeadingElement
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
    error.classList.remove('hidden')
    grados.classList.add('hidden')
    grados.innerHTML = ''
    return;
  }
  document.querySelector('#error')?.classList.add('hidden')
  
  try {
    const result = formulas[data.fromUnit][data.toUnit](data.temperature)
    error?.classList.add('hidden')
    grados.classList.remove('hidden')
    grados.innerHTML = `${result} ${data.toUnit}`
  } catch (err) {
    error?.classList.remove('hidden')
    grados.classList.add('hidden')
    grados.innerHTML = ''
    error.innerHTML = 'Ah ocurrido un error, revisa los datos ingresados'
  }
}

// Events
form?.addEventListener('submit', handleSubmit)
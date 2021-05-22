import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

const Users = () => {
  const [name , setName] = useState('')
  const [passwd , setPasswd] = useState('')
  const [email , setEmail] = useState('')
  const [whatsapp , setWhatsapp] = useState('')
  const [city , setCity] = useState('')
  const [state , setState] = useState('')
  const [neighborhood , setNeighborhood] = useState('')

  const history = useHistory()

  const handleRegister = async(e) => {
    e.preventDefault()

    const data = {
      name,
      passwd,
      email,
      whatsapp,
      city,
      state,
      neighborhood
    }
    try {
      const response = await api.post('users', data)
      alert(`Seu ID de acesso: ${response.data.data.email}`)
      history.push('/')
      } catch (err) {
        alert('Erro no cadastro, tente novamente.')
      }
  }
  return (
    <div className="bg-blue-200 md:m  flex md:mx-80 md:my-40 md:border-4 md:rounded-md md:shadow">
      <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
        <h1 className="font-bold text-2xl my-10 text-white"> Cadastre-se </h1>
    <form  onSubmit={handleRegister} className="mt-2 flex flex-col lg:w-1/2 w-8/12">
              <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                  placeholder="Nome:"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="password"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Senha:"
                  value={passwd}
                  onChange={e => setPasswd(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="email"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Email:"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="number"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Fone/Whatsapp:"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Cidade:"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Estado:"
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                  placeholder="Bairro:"
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                />
              </div>
              <button className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-10"type="submit">
                Cadastrar
              </button>
              <Link className='font-bold text-center mb-6' to='/'>Voltar</Link>
            </form>
      </div>
    </div>
  )
}

export default Users

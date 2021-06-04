import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import api from '../services/api'


const Index = () => {
  const [incidents, setIncidents] = useState([])

  
  useEffect(() => {
    api.get('/')
    .then(response => {
      setIncidents(response.data)
    })
  }, [])

  return (
    <div>
      <div className='bg-blue-200 text-right p-4 mb-10 shadow h-16'>
      <Link className='hover:text-white font-bold m-10 'to='/users'>Cadastrar-se</Link>
      <Link className='hover:text-white font-bold m-10' to='/login'>Entrar</Link>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start lg:m-20 m-5">
      {incidents.map(incident => (
      <div key={incident.id} className="mx-2 mb-10 max-w-sm bg-blue-200 border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
          <div  id="header" className="flex items-center mb-4"> 
          { incident.images && 
          incident.images.url && 
          <img alt="avatar" className="w-20 rounded-full border-2 border-gray-300" src={incident.images.url} /> }
            
            <div id="header-text" className="leading-5 ml-6 sm">
                <h4 id="name" className="text-xl font-semibold">{incident.name}</h4>
                <h5 id="job" className="font-semibold text-blue-600">{incident.city}</h5>
                <h5 id="job" className="font-semibold text-blue-600">{incident.neighborhood} </h5>
            </div>
          </div>
          <div id="quote">
            <p><strong>Nome do pet: </strong>{incident.pet_name}</p>
            <p><strong>Tempo de vida do pet: </strong>{incident.pet_age}</p>
            <p><strong>Tipo de pet: </strong>{incident.animal_type}</p>
            <p className='h-40'><strong>Descrição: </strong>{incident.description}</p>
            <p className='text-center'><strong>Contato: </strong></p>
            <div className="flex justify-center">
            <a className=' text-xl' href={`https://api.whatsapp.com/send?phone=5547997608709&text=Olá, tudo bem? Eu gostaria de adotar o(a) ${incident.pet_name}, peguei seu contato do site petsjaragua`}><FaWhatsapp  /></a>
            </div>
          </div>
      </div>
      ))}

    </div>
        <div className='bg-blue-200 text-center p-8 shadow h-20'>
          <div className='container mx-auto text-center font-bold'>     
            <div className='grid grid-cols-5 justify-items-stretch'>
              <a   className='text-blue-600 hover:text-black justify-self-center' href='https://www.linkedin.com/in/gabrielkf/'><FaLinkedin /></a>
              <a className='text-red-600 hover:text-black justify-self-center' href='https://www.instagram.com/gabrikf/'><FaInstagram /></a>
              <p className='text-xs'>Projeto desenvolvido por Gabriel Koch Fodi</p>
              <a className='text-purple-600 hover:text-black justify-self-center' href='https://github.com/gabrikf'><AiFillGithub /></a>
              <a className='text-gray-600 hover:text-black justify-self-center' href='https://gabrikf-resume.vercel.app/'><FaLink /></a>
            </div>
          </div>
        </div>
    </div>
  )}

export default Index


import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { AiFillGithub } from 'react-icons/ai'
import api from '../services/api'


const Profile = () => {
  const [incidents, setIncidents] = useState([])

  const history = useHistory()
  const token = localStorage.getItem('token')

  useEffect(() => {
    api.get('/pets', {
      headers: {
        Authorization: 'bearer' + token,
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [token])

  const handleDeleteIncident = async(id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: token,
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  } 
  const handleLogOut = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <div>
      <div className='bg-blue-200 text-right p-4 mb-10 shadow h-16'>
      <Link className='hover:text-white font-bold m-10 'to='/petRegister'>Cadastrar Pet</Link>
      <button className='hover:text-white font-bold m-10' onSubmit={handleLogOut}>Sair</button>
      </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start lg:m-20 m-5">
    {incidents.map(incident => (
      <div key={incident.id} class="mx-2 mb-10 max-w-sm bg-blue-200 border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
          <div id="header" class="flex items-center mb-4"> 
            <a href={incident.images.url}><img alt="avatar" class="w-20 rounded-full border-2 border-gray-300" src={incident.images.url} /></a>
            <div id="header-text" class="leading-5 ml-6 sm">
                <h4 id="name" class="text-xl font-semibold">{incident.name}</h4>
                <h5 id="job" class="font-semibold text-blue-600">{incident.city}</h5>
                <h5 id="job" class="font-semibold text-blue-600">{incident.neighborhood} </h5>
            </div>
          </div>
          <div id="quote">
            <p><strong>Nome do pet: </strong>{incident.pet_name}</p>
            <p><strong>Tempo de vida do pet: </strong>{incident.pet_age}</p>
            <p><strong>Tipo de pet: </strong>{incident.animal_type}</p>
            <p className='h-40'><strong>Descrição: </strong>{incident.description}</p>
            <p className='text-center'><strong>Deletar: </strong></p>
            <div className="flex justify-center">
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
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

export default Profile
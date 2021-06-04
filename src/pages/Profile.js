import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { AiFillGithub } from 'react-icons/ai'
import api from '../services/api'




const Profile = () => {
  const [incidents, setIncidents] = useState([])
  const [photo, setPhoto] = useState('')

  

  const history = useHistory()
  const token = localStorage.getItem('token')
  if (!localStorage.getItem('token')){
    history.push('/login')
  }
 
  useEffect(() => {
    api.get('/pets', {
      headers: {
        Authorization: `bearer ${token}`,
      }
      
    }).then(response => {
      setIncidents(response.data)
    })
  }, [])

  const handleUpload = async(id) => {
   
    const formData  = new FormData()
    formData.append('image', photo)

    try {
      const token = localStorage.getItem('token')
    const config = {
      
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` 
      }
  };
      await api.post(`pets/${id}/upload`, formData, config)
      .then(function (response) {
            console.log(formData)
               console.log(response);
             });
      } catch (err) {
        alert('Erro no cadastro, tente novamente.')
      }
  }
  
 

  // const handleUpload = async(id) => {
    

  //   const config = {
  //     'Content-Type': 'multipart/form-data',
  //       // headers : {Authorization: `bearer ${token}`}
  // }
  //   const formData  = new FormData()
  //   formData.append('image', data)
    
  //   try {
  //     await api.post(`/pets/${id}/upload`, formData, config
  //     ).then(function (response) {
  //       console.log(formData)
  //       console.log(response);
  //     });
  //   } catch (err) {
  //     alert('Erro ao deletar caso, tente novamente.')
  //   }
  // } 
  const handleDeleteIncident = async(id) => {
  
    
    try {
      await api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        }
      })
      
      setIncidents(incidents.filter(incident => incident.id_pet !== id))
      history.push('/login')
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
      <a className='hover:text-white font-bold m-10' onClick={() => handleLogOut()}>Sair</a>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start lg:m-20 m-5">
    {incidents.map(incident => (
      <div key={incident.id} className="mx-2 mb-10 max-w-sm bg-blue-200 border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
          <div id="header" className="flex items-center mb-4">
             
          { incident.images && 
          incident.images.url && 
          <img alt="avatar" className="w-20 rounded-full border-2 border-gray-300" src={incident.images.url} /> }
          
          
          
         
     
            <div id="header-text" className="leading-5 ml-6 sm">
                <h4 id="name" className="text-xl font-semibold">{incident.name}</h4>
                <h5 id="job" className="font-semibold text-blue-600">{incident.city}</h5>
                <h5 id="job" className="font-semibold text-blue-600">{incident.neighborhood} </h5>
            </div>
          </div>
          { !incident.images &&     
          
          <form 
         
          >
            <input
            
            type='file' 
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            />
          <button onClick={() => handleUpload(incident.id_pet)} className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-10"type="button">
                Adicionar foto
              </button>
          </form> }
          <div id="quote">
            <p><strong>Nome do pet: </strong>{incident.pet_name}</p>
            <p><strong>Tempo de vida do pet: </strong>{incident.pet_age}</p>
            <p><strong>Tipo de pet: </strong>{incident.animal_type}</p>
            <p className='h-40'><strong>Descrição: </strong>{incident.description}</p>
            <p className='text-center'><strong>Deletar: </strong></p>
            <div className="flex justify-center">
            <button type="button" onClick={() => handleDeleteIncident(incident.id_pet)}>
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
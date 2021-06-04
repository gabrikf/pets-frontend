import React, {useState} from 'react'
import { r} from 'react-router-dom'




const Upload = () => {
    const [photo, setPhoto] = useState('')
    const handleUpload = async(id) => {
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    const data = {
      photo
    }
    try {
      await api.post(`/pets/${id}/upload`, data, config )
      
      history.push('/')
      } catch (err) {
        alert('Erro no cadastro, tente novamente.')
      }
  }
    return (
        <div className="bg-blue-200  flex md:mx-80 md:my-40 md:border-4 md:rounded-md md:shadow">
          <div className=" flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
            <h1 className="font-bold text-2xl my-10 text-white"> Cadastre seu Pet </h1>
        <form onSubmit={handleRegister}  className="mt-2 flex flex-col lg:w-1/2 w-8/12">
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
                    <input
                      type="text"
                      className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                      placeholder="Nome do Pet:"
                      value={pet_name}
                      onChange={e => setPetName(e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-10"type="submit">
                    Cadastrar
                  </button>
                  <Link className='font-bold text-center mb-6' to='/profile'>Voltar</Link>
                </form>
          </div>
        </div>
      )
}

export default Upload
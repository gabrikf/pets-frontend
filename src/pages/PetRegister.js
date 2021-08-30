import React, { useState, useEffect} from 'react'
import {  useHistory } from 'react-router-dom'
import api from '../services/api'
import Alert from '../components/alert'
import useAuth from '../hook/useAuth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const petSchema = Yup.object().shape({
  pet_name: Yup.string()
                .min(3, 'por favor digite pelo menos 3 caracteres')
                .max(15, 'máximo 15 caracteres')
                .required('Por favor informe o nome.'),
  pet_age: Yup.string()
              .required('Por favor informe a idade do animal.')
              .max(15, 'máximo 15 caracteres'),
  animal_type: Yup.string()
                  .required('Por favor informe o tipo de animal'),
  breed: Yup.string()
             .max(15, 'máximo 15 caracteres'),
  description: Yup.string()
                  .max(30, 'Máximo de 30 caracteres'),
})

const PetRegister = () => {
  const history = useHistory()
  const { login, handleLogout } = useAuth()
  const [signInError, setSignInError] = useState(false)
  useEffect(() => {
    if (!login ){
      history.push('/')
      return
    }

    if(login.expiresIn > Date.now() * 1000){
      handleLogout()
      history.push('/')
    }
  },[handleLogout, history, login])

  const formik = useFormik({
    initialValues: {
      pet_name: '',
      pet_age: '',
      animal_type: '',
      breed: '',
      description: ''
    },
    validationSchema: petSchema,
    onSubmit: async values => {
      try {
     
        const config = {
          headers: { Authorization: `Bearer ${login.id}` }
      };
          await api.post('/pets', values, config)
          history.push('/profile')
          } catch (err) {
            setSignInError(true)
          }
    },
  });
  
  return (
    
    <div className=' '>
          <section className="my-36 2xl:my-52 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Pets</h2>

              <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Olá amigo, seja bem-vindo!</h3>

              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Estamos felizes em te-lo aqui, preencha seu cadastro.</p>
      
              <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div className="w-full mt-0">
                  <label className="text-gray-700 dark:text-gray-200" for="password">Nome do pet (caso não tenha, deixe o campo vazio)</label>
                  <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                  type="text" 
                  name="pet_name"
                  placeholder="Digite seu nome do pet" 
                  aria-label="Nome completo"
                  value={formik.values.pet_name}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.pet_name && formik.touched.pet_name && <i className='text-red-400'>{formik.errors.pet_name}</i>}
              </div>

              <div className="w-full mt- mb-4">
                  <label className="text-gray-700 dark:text-gray-200" for="password">Idade do pet (ao final escreva "anos ou "meses")</label>
                  <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                  type="text" 
                  name="pet_age"
                  placeholder="Digite a idade do pet." 
                  aria-label="idade"
                  value={formik.values.pet_age}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.pet_age && formik.touched.pet_age && <i className='text-red-400'>{formik.errors.pet_age}</i>}
              </div>

              <div className="w-full mt-0 mb-4">
              <label className="text-gray-700 dark:text-gray-200" for="text">Tipo: (cachorro gato ou fuga de animal)</label>
                <select 
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                name='animal_type'
                onChange={formik.handleChange}
                value={formik.values.animal_type}
                >
                  <option value='' hidden>Selecione uma opção...</option>
                  <option value='Cachorro'>Cachorro</option>
                  <option value='Gato'>Gato</option>
                  <option value='Perdido'>Animal perdido</option>
                </select>
                {formik.errors.animal_type && formik.touched.animal_type && <i className='text-red-400'>{formik.errors.animal_type}</i>}
                </div>
          
              <div className="w-full mt-0 mb-4">
                  <label className="text-gray-700 dark:text-gray-200" for="password">Descrição da raça (se for definida)</label>
                  <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                  type="text" 
                  placeholder="Digite a raça do seu pet" 
                  name="breed"
                  aria-label="cidade"
                  value={formik.values.breed}
                  onChange={formik.handleChange}
                  />
                  {formik.errors.breed && formik.touched.breed && <i className='text-red-400'>{formik.errors.breed}</i>}
              </div>
              <div className="w-full mt-0 mb-4">
                  <label className="text-gray-700 dark:text-gray-200" for="password">Descrição breve (max: 30 caracteres)</label>
                  <textarea className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                  type="text" 
                  maxlength="30"
                  placeholder="Digite a descrição do pet" 
                  name="description"
                  aria-label="cidade"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  />
                    {formik.errors.description && formik.touched.description && <i className='text-red-400'>{formik.errors.description}</i>}
              </div>  
              {signInError && <Alert>Erro no cadastro, verifique o que você pode ter errado.</Alert>}
          </div>

          <div className="flex justify-end mt-6">
              <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cadastrar</button>
          </div>
      </form>
  </section>     
 
  </div>
)
}

export default PetRegister

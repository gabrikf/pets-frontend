import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from '../components/alert'
import api from '../services/api'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const userSchema = Yup.object().shape({
  name: Yup.string()
              .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
              .max(20, 'máximo 15 caracteres')
              .required('Por favor, informe um nome.'),
  email: Yup.string()
              .email('Por favor, digite um e-mail válido')
              .required('Por favor, informe um e-mail.')
              .test('is-unique', 'Por favor, utileze outro email. Este ja está em uso', async(value) => {
                const ret = await api.get(`/users/${value}`) 
                if(!ret.data[0]){
                  return true
                }
                return false
            }),
  whatsapp: Yup.number()
              .min(10, 'Por favor, informe no formato 47999990000, no total de 11 dígitos.')
              .max(12, 'Por favor, informe no formato 47999990000, no total de 11 dígitos.')
              .required('Por favor, informe o número do seu celular'),
  city: Yup.string()
              .min(3, 'Por favor, informe pelo menos 3 caracteres.')
              .max(20, 'máximo 20 caracteres')
              .required('Por favor, informe um slug da marca.'),
  state: Yup.string()
              .min(2, 'Por favor, informe pelo menos um estado com 3 caracteres.')
              .max(3, 'máximo 3 caracteres')
              .required('Por favor, informe um estado.'),
  neighborhood: Yup.string()
              .min(5, 'Por favor, informe pelo menos um nome com 5 caracteres.')
              .max(20, 'máximo 20 caracteres')
              .required('Por favor, informe um bairro.'),      
  passwd: Yup.string()
              .min(8, 'Por favor, informe uma senha com pelo menos 8 caracteres.')
              .required('Por favor, informe uma senha.'),
  confirmPasswd: Yup.string()
              .required('Por favor, confirme a senha')
              .oneOf([Yup.ref('passwd'), null],'As senhas devem ser iguais.'),   
               
})

const Users = () => {
  const [signInError, setSignInError] = useState(false)
  const history = useHistory()

 
    const formik = useFormik({
      initialValues: {
        name: '',
        passwd: '',
        confirmPasswd: '',
        email: '',
        whatsapp: '',
        city: '',
        state: '',
        neighborhood: ''
      },    
      validationSchema: userSchema,
      onSubmit: async values => {
        try {  
            const response = await api.post('users', values)
            alert(`Seu ID de acesso: ${response.data.data.email}`)
            history.push('/login')
          
          } catch (err) {
            setSignInError(true)
          }
      },
      })
    
      return (
      <div className='bg-blue-50 dark:bg-gray-700 '>
            <section className=" mb-4 max-w-4xl h-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Pets</h2>

                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Olá amigo, seja bem-vindo!</h3>

                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Estamos felizes em tê-lo aqui. Preencha seu cadastro.</p>
        
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2">
                    <div className="w-full mt-0">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Nome da ONG ou seu nome completo</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="text" 
                    name='name'
                    placeholder="Digite o nome da ONG ou seu nome" 
                    aria-label="Nome da ONG ou seu nome completo"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    
                    />
                    {formik.errors.name && formik.touched.name && <i className='text-red-400'>{formik.errors.name}</i>}
                </div>       
   
                <div className="w-full mt-0">
                    <label class="text-gray-700 dark:text-gray-200" for="password">E-mail</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="email" 
                    name='email'
                    placeholder="Digite seu e-mail" 
                    aria-label="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && <i className='text-red-400'>{formik.errors.email}</i>}
                 
                </div>

                <div className="w-full mt-0">
                    <label class="text-gray-700 dark:text-gray-200" for="text">WhatsApp</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="text"                     
                    name='whatsapp'
                    placeholder="Digite seu whatsApp ex:47999990000" 
                    aria-label="whastsApp"
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.whatsapp && formik.touched.whatsapp && <i className='text-red-400'>{formik.errors.whatsapp}</i>}
                </div>

                <div className="w-full mt-0 ">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Cidade</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="text"
                    name='city'
                    placeholder="Digite sua cidade" 
                    aria-label="cidade"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.city && formik.touched.city && <i className='text-red-400'>{formik.errors.city}</i>}
                </div>

                <div className="w-full mt-0 ">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Estado</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="text" 
                    name ='state'
                    placeholder="Digite seu estado" 
                    aria-label="estado"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    />
                  {formik.errors.state && formik.touched.state && <i className='text-red-400'>{formik.errors.state}</i>}
                </div>
                <div className="w-full mt-0 ">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Bairro</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="text" 
                    name='neighborhood'
                    placeholder="Digite seu bairro" 
                    aria-label="Bairro"
                    value={formik.values.neighborhood}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.neighborhood && formik.touched.neighborhood && <i className='text-red-400'>{formik.errors.neighborhood}</i>}
                </div>

                <div className="w-full mt-0 ">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Senha</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    type="password" 
                    name='passwd'
                    placeholder="Digite sua senha" 
                    aria-label="senha"
                    value={formik.values.passwd}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.passwd && formik.touched.passwd && <i className='text-red-400'>{formik.errors.passwd}</i>}
                </div>

                <div className="w-full mt-0 ">
                    <label class="text-gray-700 dark:text-gray-200" for="password">Confirma senha:</label>
                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white" 
                    name='confirmPasswd'
                    type="password" 
                    placeholder="Digite novamente sua senha"
                    aria-label="Password"
                    value={formik.values.confirmPasswd}
                    onChange={formik.handleChange}
                    
                    />
                    {formik.errors.confirmPasswd && formik.touched.confirmPasswd && <i className='text-red-400'>{formik.errors.confirmPasswd}</i>}
                </div>
                
                {signInError && <Alert>Erro no cadastro, verifique o que você pode ter errado.</Alert>}
            </div>

            <div className="flex justify-end mt-6">
                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cadastrar</button>
            </div>
        </form>
    </section>
       
   
    </div>
  )
    
}

export default Users

import React, { useState, useEffect } from "react";

import api from "../services/api";
import useAuth from "../hook/useAuth";
import { ImSpinner3 } from "react-icons/im";


const Admin = () => {
  const { login } = useAuth();
  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
api.get('users/ongs/solicitation',{
  headers: {
    Authorization: `Bearer ${login.id}`,
  },
}).then(response => {
  setIncidents(response.data)
  setLoading(false)
})
      
  }, [login]);
  const turnOng = (id) => {
    api.patch(`users/${id}`,{role : "ong"},{
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    })
    api.delete(`users/ongs/solicitation/${id}`,{
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    })
    api.get('users/ongs/solicitation',{
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    }).then(response => {
      setIncidents(response.data)
      setLoading(false)
    })
  }
  if (loading) {
    return (
      <div className="flex md:h-full h-screen w-full justify-center items-center">
        <ImSpinner3 className="text-base mr-1" /> Loading
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen md:h-full bg-blue-50 dark:bg-gray-700">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    WhatsApp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                  >
                    Mensagem
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Tornar Ong</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                {incidents.map((person) => (
                  <tr key={person.email}>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{person.ongId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{person.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{person.whatsapp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{person.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <button
            className="md:m-4 w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            onClick={() => turnOng(person.ongId)}    
          >
            Tornar Ong
          </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Admin

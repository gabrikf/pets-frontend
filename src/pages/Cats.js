import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiCat, GiSittingDog } from "react-icons/gi";
import { AiOutlineMail, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "../services/api";
import useAuth from "../hook/useAuth";
import { ImSpinner3 } from "react-icons/im";
import { Link } from "react-router-dom";
import heroImg from "../assets/prof.png";

const Cats = () => {
  const { login } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  const dislike = async (pet) => {
    delete pet.likes[login.userId];
    await api.put(`/pets/${pet.id_pet}`, pet.likes, {
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    });

    api.get(`/${page}`).then((response) => {
      response.data = response.data.data.map((pet) => {
        pet.likes = JSON.parse(pet.likes);
        return pet;
      });
      console.log(response.data);
      setIncidents(response.data);
    });
    api.delete(`pets/delete/likes/${pet.id_pet}`, {
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    });
  };

  const like = async (pet) => {
    pet.likes[login.userId] = true;
    await api.put(`/pets/${pet.id_pet}`, pet.likes, {
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    });

    api.get(`/Gato/${page}`).then((response) => {
      if (response.error) {
        console.log(response.error);
      }
      console.log(response.data.data);
      const next = response.data.hasNext;
      response.data = response.data.data.map((pet) => {
        pet.likes = JSON.parse(pet.likes);
        return pet;
      });

      setHasNext(next);
      setIncidents(response.data);
    });
    api.post(`pets/new/likes/${pet.id_pet}`, "", {
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`/Gato/${page}`)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        }
        console.log(response.data.data);
        const next = response.data.hasNext;
        response.data = response.data.data.map((pet) => {
          pet.likes = JSON.parse(pet.likes);
          return pet;
        });

        setHasNext(next);
        setIncidents(response.data);
      })
      .then(() => setLoading(false));
  }, [page]);
  if (loading) {
    return (
      <div className="flex md:h-full h-screen w-full justify-center items-center">
        <ImSpinner3 className="text-base mr-1" /> Loading
      </div>
    );
  }
  return (
    <div id="pets_initial" className="bg-blue-50 dark:bg-gray-700">
      {!incidents[0] && !loading && (
        <div className="container mt-10 px-6 mx-auto">
          <div className="w-full  text-white bg-indigo-600 ">
            <div className="container flex items-center justify-between px-6 py-4 mx-auto">
              <div className="flex">
                <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"></path>
                </svg>

                <p className="mx-3">Ainda não temos pets por aqui.</p>
              </div>
            </div>
          </div>

          <div className="mt-24 items-center lg:flex ">
            <div className="w-full  lg:w-1/2">
              <div className="lg:max-w-lg">
                <Link
                  to="/"
                  className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Voltar
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-md"
                src={heroImg}
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  lg:mx-20 mx-5 ">
        {incidents.map((incident) => (
          <div
            key={incident.id_pet}
            className="m-4 max-w-sm  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            {incident.images && incident.images.url ? (
              <img
                className="object-cover object-center w-full h-80"
                src={incident.images.url}
                alt="avatar"
              />
            ):
            <img
                className="object-cover object-center w-full h-80"
                src='https://petsjaragua.s3.amazonaws.com/gabrielkochf%40gmail.com-catdefault.jpeg-Mon_Oct_04_2021_00%3A52%3A25_GMT%2B0000_(Coordinated_Universal_Time)'
                alt="avatar"
              />
            
            }
            <Link className="cursor-pointer" to={`details/${incident.id_pet}`}>
              <div className="flex items-center px-6 py-3 bg-gray-900">
                {incident.animal_type === "Cachorro" ? (
                  <GiSittingDog className="text-white" />
                ) : (
                  <GiCat className="text-white" />
                )}
                <h1 className="mx-3 text-lg font-semibold text-white">
                  {incident.pet_name.length > 0 ? incident.pet_name : 'Esperando um nome'}
                </h1>
              </div>
            </Link>
            <div className="px-6 py-4">
              <div>
                {login && (
                  <>
                    {incident.likes[login.userId] ? (
                      <AiFillHeart
                        onClick={() => dislike(incident)}
                        className="my-2 text-3xl text-red-600 cursor-pointer"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => like(incident)}
                        className="cursor-pointer my-2 text-3xl text-red-300 "
                      />
                    )}
                  </>
                )}
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {" "}
                  {Object.keys(incident.likes).length} curtida
                  {Object.keys(incident.likes).length !== 1 && "s"}
                </p>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                <Link to={`ongs/${incident.users_id}`}>{incident.name}</Link>
              </h1>
              <div className="py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Idade do pet:{" "}
                </strong>
                {incident.pet_age}
              </div>
              <div className="py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Sexo:{" "}
                </strong>
                {incident.breed}
              </div>
              <div className="h-24 py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Descrição do pet:{" "}
                </strong>{" "}
                <p>{incident.description}</p>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <a
                  className="cursor-pointer"
                  href={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Peguei seu contato do site petsjaragua. Eu gostaria de adotar o(a) https://www.petsjaragua.com.br/details/${incident.id_pet} `}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className=" text-xl" />
                </a>
                <a
                  className="cursor-pointer"
                  href={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Peguei seu contato do site petsjaragua. Eu gostaria de adotar o(a) https://www.petsjaragua.com.br/details/${incident.id_pet} `}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="px-2 text-sm">
                    ({incident.whatsapp.slice(0, 2)}){" "}
                    {incident.whatsapp.slice(2, 7)}-{incident.whatsapp.slice(7)}
                  </h1>
                </a>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <HiOutlineLocationMarker className=" text-xl" />

                <h1 className="px-2 text-sm">
                  {incident.city}, {incident.neighborhood}
                </h1>
              </div>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <AiOutlineMail className=" text-xl" />

                <h1 className="px-2 text-sm">{incident.email}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mx-10 bg-blue-50 dark:bg-gray-700 p-2">
        {page !== 0 && (
          <button
            className="md:m-2 w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            onClick={() => setPage(page - 1)}
          >
            Página anterior
          </button>
        )}
        {hasNext && (
          <button
            className="md:m-4   w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            onClick={() => setPage(page + 1)}
          >
            Próxima página
          </button>
        )}
      </div>
    </div>
  );
};

export default Cats;

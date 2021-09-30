import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiCat, GiSittingDog } from "react-icons/gi";
import { AiOutlineMail, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "../services/api";
import catImg from "../assets/gatos.jpeg";
import dogImg from "../assets/cachorros.jpeg";
import lostPet from "../assets/lostpet.jpeg";
import useAuth from "../hook/useAuth";
import { HashLink } from "react-router-hash-link";

const Cats = () => {
  const { login } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [hasNext, setHasNext] = useState(false);

  const kindOfResults = localStorage.getItem("filter");

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
  };

  const like = async (pet) => {
    pet.likes[login.userId] = true;
    await api.put(`/pets/${pet.id_pet}`, pet.likes, {
      headers: {
        Authorization: `Bearer ${login.id}`,
      },
    });
    api
      .get(`/${page}`)

      .then((response) => {
        response.data = response.data.data.map((pet) => {
          pet.likes = JSON.parse(pet.likes);
          return pet;
        });
        console.log(response.data);
        setIncidents(response.data);
      });
  };

  useEffect(() => {

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
  }, [page]);

  return (
    <div id="pets_initial" className="bg-blue-50 dark:bg-gray-700">
      {/* <div className=" p-20 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 items-center lg:m-20 m-5">
        <div className="mb-4 md:mb-0 max-w-xs bg-blue-100 mx-auto border border-indigo-600 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 border-4 dark:border-gray-400">
          <HashLink
            onClick={() => setFilter("Cachorro")}
            to="/pets#pets_initial"
            scroll={(el) =>
              el.scrollIntoView({ behavior: "auto", block: "end" })
            }
          >
            <img className="object-cover w-44 h-28" src={dogImg} alt="avatar" />
          </HashLink>

          <div className="border-t border-indigo-600 py-2 text-center dark:border-gray-400">
            <HashLink
              onClick={() => setFilter("Cachorro")}
              to="/pets#pets_initial"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "auto", block: "end" })
              }
              className="block text-lg text-gray-800 dark:text-white"
            >
              Cachorros
            </HashLink>
          </div>
        </div>

        <div className="mb-4 md:mb-20 max-w-xs bg-blue-100  mx-auto border border-indigo-600 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 dark:border-gray-400">
          <HashLink
            onClick={() => setFilter("Perdido")}
            to="/pets#pets_initial"
            scroll={(el) =>
              el.scrollIntoView({ behavior: "auto", block: "end" })
            }
          >
            <img
              className="object-cover w-44  h-28"
              src={lostPet}
              alt="avatar"
            />
          </HashLink>

          <div className="mt- border-t border-indigo-600 py-2 text-center dark:border-gray-400">
            <HashLink
              onClick={() => setFilter("Perdido")}
              to="/pets#pets_initial"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "auto", block: "end" })
              }
              className="block text-base  text-gray-800 dark:text-white"
            >
              Perdidos
            </HashLink>
          </div>
        </div>

        <div className="max-w-xs bg-blue-100 mx-auto border border-indigo-600 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 dark:border-gray-400 ">
          <HashLink
            onClick={() => setFilter("Gato")}
            to="/pets#pets_initial"
            scroll={(el) =>
              el.scrollIntoView({ behavior: "auto", block: "end" })
            }
          >
            <img
              className="object-cover  w-44  h-28"
              src={catImg}
              alt="avatar"
            />
          </HashLink>

          <div className="border-t border-indigo-600 py-2 text-center dark:border-gray-400">
            <HashLink
              onClick={() => setFilter("Gato")}
              to="/pets#pets_initial"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "auto", block: "end" })
              }
              className="block text-lg text-gray-800 dark:text-white"
            >
              Gatos
            </HashLink>
          </div>
        </div>
      </div> */}

      <div
      
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  lg:mx-20 mx-5 "
      >
        {incidents
          .filter(
            (incident) =>
              incident.animal_type === kindOfResults || !kindOfResults
          )
          .map((incident) => (
            <div
              key={incident.id_pet}
              className="m-4 max-w-sm  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              {incident.images && incident.images.url && (
                <img
                  className="object-cover object-center w-full h-80"
                  src={incident.images.url}
                  alt="avatar"
                />
              )}

              <div className="flex items-center px-6 py-3 bg-gray-900">
                {incident.animal_type === "Cachorro" ? (
                  <GiSittingDog className="text-white" />
                ) : (
                  <GiCat className="text-white" />
                )}
                <h1 className="mx-3 text-lg font-semibold text-white">
                  {incident.pet_name}
                </h1>
              </div>

              <div className="px-6 py-4">
                {login && (
                  <div>
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
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {" "}
                      {Object.keys(incident.likes).length} curtida
                      {Object.keys(incident.likes).length > 1 && "s"}
                    </p>
                  </div>
                )}
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {incident.name}
                </h1>
                <div className="py-2 text-gray-700 dark:text-gray-400">
                  <strong className="text-black dark:text-white">
                    Idade do pet:{" "}
                  </strong>
                  {incident.pet_age}
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
                    href={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Eu gostaria de adotar o(a) ${incident.pet_name}, peguei seu contato do site petsjaragua`}
                    target="_blank"
                    rel="noreferrer" 
                  >
                    <FaWhatsapp className=" text-xl" />
                  </a>
                  <a
                    className="cursor-pointer"
                    href={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Eu gostaria de adotar o(a) ${incident.pet_name}, peguei seu contato do site petsjaragua`}
                    target="_blank"
                    rel="noreferrer" 
                  >
                    <h1 className="px-2 text-sm">
                      ({incident.whatsapp.slice(0, 2)}){" "}
                      {incident.whatsapp.slice(2, 7)}-
                      {incident.whatsapp.slice(7)}
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
          <HashLink
            to="/pets#pets_initial"
            scroll={(el) =>
              el.scrollIntoView({ behavior: "auto", block: "end" })
            }
            className="md:m-2 w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            onClick={() => setPage(page - 1)}
          >
            Página anterior
          </HashLink>
        )}
        {hasNext && (
          <HashLink
            to="/pets#pets_initial"
            scroll={(el) =>
              el.scrollIntoView({ behavior: "auto", block: "end" })
            }
            className="md:m-2   w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            onClick={() => setPage(page + 1)}
          >
            Próxima página
          </HashLink>
        )}
      </div>
    </div>
  );
};

export default Cats;

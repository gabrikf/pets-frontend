import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GiCat, GiSittingDog } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import api from "../services/api";
import heroImg from "../assets/prof.png";
import useAuth from "../hook/useAuth";
import { ImSpinner3 } from "react-icons/im";
import { useFormik } from "formik";
import Alert from "../components/alert";

const Profile = () => {
  const { login, handleLogout } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [alreadySolicited, setalreadySolicited] = useState([]);
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [formErr, setFormErr] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!login) {
      history.push("/");
      return;
    }
    if (login && login.userRole === "user") {
      api
        .get("users/ongs/solicitationid", {
          headers: {
            Authorization: `Bearer ${login.id}`,
          },
        })
        .then((response) => {
          setalreadySolicited(response.data);
        });
    }
    if (login.expiresIn > Date.now() * 1000) {
      handleLogout();
      history.push("/");
    }
    api
      .get("/pets", {
        headers: {
          Authorization: `Bearer ${login.id}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          localStorage.removeItem("token");
          history.push("/login");
        }

        setIncidents(response.data);
      })
      .then(() => setLoading(false));
  }, [history, login, handleLogout]);
  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: async (values) => {
      const config = {
        headers: { Authorization: `Bearer ${login.id}` },
      };
      try {
        console.log(values);
        await api.post("/users/ongs/solicitation", values, config);
        history.push("/");
      } catch (err) {
        setFormErr(true);
      }
    },
  });

  const handleUpload = async (id) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", photo);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${login.id}`,
        },
      };

      const response = await api.post(`pets/${id}/upload`, formData, config);
      console.log(response);
      api
        .get("/pets", {
          headers: {
            Authorization: `Bearer ${login.id}`,
          },
        })
        .then((response) => {
          if (response.data.error) {
            localStorage.removeItem("token");
            history.push("/login");
          }

          setIncidents(response.data);
        })
        .then(() => setLoading(false));
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente.");
    }
  };

  const handleDeleteIncident = async (id, hasImg) => {
    let url;
    if (hasImg) {
      url = `/pets/image/${id}`;
    } else {
      url = `/pets/${id}`;
    }
    console.log(url);
    try {
      await api.delete(url, {
        headers: {
          Authorization: `bearer ${login.id}`,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id_pet !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center items-center h-screen md:h-full">
        <ImSpinner3 className="text-base mr-1" /> Loading
      </div>
    );
  }
  if (login && login.userRole === "user") {
    return (
      <>
        {alreadySolicited.length === 0 ? (
          <div className="bg-blue-50 dark:bg-gray-700">
            <div className=" w-full max-w-sm md:mt-20 mx-auto h-mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
                  Pets
                </h2>

                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                  Bem-vindo
                </h3>

                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                  Solicite acesso de ONG para poder cadastrar seus pets para
                  adoção
                </p>

                <form onSubmit={formik.handleSubmit}>
                  <div className="w-full mt-4">
                    <textarea
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring dark:text-white"
                      type="text"
                      placeholder="escreva uma mensagem"
                      aria-label="Email Address"
                    />
                    {/* {formik.errors.email && formik.touched.email && <i className='text-red-400'>{formik.errors.emaisl}</i>} */}
                  </div>

                  {formErr && <Alert>Erro, tente novamente.</Alert>}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                      type="submit"
                    >
                      Solicitar Acesso
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 dark:bg-gray-700 h-screen md:h-full">
            <Alert>
              Você já solicitou o acesso, aguarde, que em breve iremos retornar.
            </Alert>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="bg-blue-50 dark:bg-gray-700">
      {!incidents[0] && !loading && (
        <div className="container mt-10 px-6 mx-auto">
          <div className="w-full  text-white bg-indigo-600 ">
            <div className="container flex items-center justify-between px-6 py-4 mx-auto">
              <div className="flex">
                <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"></path>
                </svg>

                <p className="mx-3">Você ainda não possuí pets cadastrados!</p>
              </div>
            </div>
          </div>

          <div className="mt-24 items-center lg:flex ">
            <div className="w-full  lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                  cadastre seu pet para adoção ou informe uma fuga!
                </h1>
                <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400">
                  Aqui você pode cadastrar seu pet para adoção, podendo deixar
                  alguma família mais completa! Caso seu pet teha fugido você
                  pode informar aqui no mesmo formulário, basta selecionar a
                  opção fuga no campo do tipo de animal
                </p>
                <Link
                  to="/petregister"
                  className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Cadastre
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start lg:mx-20 mx-5">
        {incidents.map((incident) => (
          <div
            key={incident.id_pet}
            className="m-4 max-w-sm  overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            {!incident.images ? (
              <form className="object-cover object-center w-full h-56 text-center pt-10 dark:text-white">
                <input
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />

                {photo && (
                  <button
                    onClick={() => handleUpload(incident.id_pet)}
                    className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-10"
                    type="button"
                  >
                    Adicionar foto
                  </button>
                )}
              </form>
            ) : (
              <img
                className="object-cover object-center w-full h-80"
                src={incident.images.url}
                alt="avatar"
              />
            )}
            <Link to={`details/${incident.id_pet}`}>
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
            </Link>
            <div className="px-6 pt-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {incident.name}
              </h1>
              <p className="py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Idade do pet:{" "}
                </strong>
                {incident.pet_age}
              </p>
              <div className="py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Sexo:{" "}
                </strong>
                {incident.genre}
              </div>
              <p className="h-24 py-2 text-gray-700 dark:text-gray-400">
                <strong className="text-black dark:text-white">
                  Descrição do pet:{" "}
                </strong>{" "}
                <p>{incident.description}</p>
              </p>

              <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <Link
                  className="cursor-pointer"
                  to={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Eu gostaria de adotar o(a) ${incident.pet_name}, peguei seu contato do site petsjaragua`}
                >
                  <FaWhatsapp className=" text-xl" />
                </Link>
                <Link
                  className="cursor-pointer"
                  to={`https://api.whatsapp.com/send?phone=55${incident.whatsapp}&text=Olá, tudo bem? Eu gostaria de adotar o(a) ${incident.pet_name}, peguei seu contato do site petsjaragua`}
                >
                  <h1 className="px-2 text-sm">
                    ({incident.whatsapp.slice(0, 2)}){" "}
                    {incident.whatsapp.slice(2, 7)}-{incident.whatsapp.slice(7)}
                  </h1>
                </Link>
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
              <div className="flex justify-center mt-4">
                <p>
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() =>
                      handleDeleteIncident(
                        incident.id_pet,
                        incident.images ? true : false
                      )
                    }
                  >
                    <FiTrash2 size={20} color="#a8a8b3" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

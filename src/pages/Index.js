import React from "react";
import heroImg from "../assets/hero-img.png";
import catImg from "../assets/gatos.jpeg";
import dogImg from "../assets/cachorros.jpeg";
import { Link } from "react-router-dom";

const Index = () => {

  return (
    <div className='bg-blue-50 dark:bg-gray-700'>
      <div className="container mx-auto px-6 bg-blue-50 dark:bg-gray-700">
        <div className="items-center lg:flex">
          <div className="w-full  lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                adote um amigo, ou de a chance de alguem adotar
              </h1>
              <p className="mt-2 mb-6 text-gray-600 dark:text-gray-400">
                Caso queira adotoar um dos pets basta procura-lo no nosso
                portal. Mas se sua inteção é botar seu/seus pets para lista de
                adoção ou interagir com os pets, basta se cadastrar.
              </p>
              <Link
                to="/users"
                className="w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-indigo-600 rounded-md lg:w-auto hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              >
                Cadastre-se
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-2xl"
              src={heroImg}
              alt="Catalogue-pana.svg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center lg:mx-20 m-5">
        <div className="my-6 max-w-xs bg-blue-100 mx-auto border border-indigo-600 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 border-4 dark:border-gray-400">
          <Link to="/dogs">
            <img className="object-cover w-56 h-36" src={dogImg} alt="dogsImage" />
          </Link>

          <div className="border-t border-indigo-600 py-2 text-center dark:border-gray-400">
            <Link
              to="/dogs"
              className="block text-lg text-gray-800 dark:text-white"
            >
              Cachorros
            </Link>
          </div>
        </div>
        <div className="my-2 max-w-xs bg-blue-100 mx-auto border border-indigo-600 overflow-hidden bg-white rounded-full shadow-lg dark:bg-gray-800 border-4 dark:border-gray-400">
          <Link to="/cats">
            <img className="object-cover w-56 h-36" src={catImg} alt="catsImage" />
          </Link>

          <div className="border-t border-indigo-600 py-2 text-center dark:border-gray-400">
            <Link
              to="/cats"
              className="block text-lg text-gray-800 dark:text-white"
            >
              Gatos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

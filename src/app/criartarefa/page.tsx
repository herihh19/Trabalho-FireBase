"use client";

import { ref, onValue, push } from "firebase/database";
import { db } from "./../services/firebase/firebaseConfiguration";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IPlace {
  [key: string]: {
    titulo: string;
    descricao: string;
    inicio: string;
    conclusao: string;
    status: string
  };
}

export default function Home() {
  const router = useRouter();
  const [newPlace, setNewPlace] = useState({
    titulo: "",
    descricao: "",
    status: "",
    inicio:"",
    conclusao:"",
  });

  const addNewPlace = () => {
    push(ref(db, "/metas"), newPlace);
    setNewPlace({ titulo: "", descricao: "", inicio: "",conclusao: "", status: "",});
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
      <div className="max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewPlace();
          }}
        >
          <div className="mb-4">
            <h2 className="text-center text-3xl mb-8 font-extrabold text-white">
              Cadastrar Tarefa
            </h2>
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="titulo"
            >
              Título:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo"
              type="text"
              placeholder="Titulo"
              value={newPlace.titulo}
              onChange={(e) =>
                setNewPlace({ ...newPlace, titulo: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="descricao"
            >
              Descrição:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descricao"
              type="text"
              placeholder="Endereço"
              value={newPlace.descricao}
              onChange={(e) =>
                setNewPlace({ ...newPlace, descricao: e.target.value })
              }
            />
            
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              type="text"
              placeholder="Status"
              value={newPlace.status}
              onChange={(e) =>
                setNewPlace({ ...newPlace, status: e.target.value })
              }
            />
            
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Adicionar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Buscador from './Componentes/Buscador';
import ListadoImagenes from './Componentes/ListadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {

      if (busqueda === '') return;

      const imagenesPorPag = 30;
      const key = '14169620-0f2fb28d67c1a211de095c93e';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPag}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      const calcularTotalPaginas = resultado.totalHits / imagenesPorPag;

      guardarTotalPaginas(Math.ceil(calcularTotalPaginas));

      //calcular las paginas
    }

    consultarAPI();
  }, [busqueda,paginaActual]);

  const paginaAnterior = () => {

    let nuevaPaginaAnterior = paginaActual - 1;
    guardarPaginaActual(nuevaPaginaAnterior);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaSiguiente = paginaActual + 1;
    guardarPaginaActual(nuevaPaginaSiguiente);

    // scrool hacia arriba

    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Buscador
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaActual === 1 ) ? null : (
          <buttton onClick={paginaAnterior} type="button" className="btn btn-info mr-1"> Anterior &laquo;</buttton>
        )}
        
        {(paginaActual === totalPaginas ) ? null : ( 
        <buttton onClick={paginaSiguiente} type="button" className="btn btn-info"> Siguiente &raquo;</buttton>
        )}
        
      </div>
    </div>
  );
}

export default App;

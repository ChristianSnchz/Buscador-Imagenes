import React from 'react';
import Imagen from './Imagen';

function ListadoImagenes ({imagenes}) {
    return ( 
        <div className="col-12 p-5 row">
            {imagenes.map( imag => (
                <Imagen
                    key = {imag.id} 
                    imagen ={imag}
                /> 
            ))}
        </div>
     );
}
 
export default ListadoImagenes;
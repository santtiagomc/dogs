import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDogs } from "../actions";
import { Link } from 'react-router-dom'

export default function Home () {

    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)

    useEffect (() => {
        dispatch(getDogs());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to= "/dogs">Crear perro</Link>
            <h1>Vamosss Dogss!!</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los perros
            </button>
            <div>
                <select name="" id="">
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </div>
    )

}
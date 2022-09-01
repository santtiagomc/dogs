import React from "react";
import { Link } from "react-router-dom";
import style from './styles/Card.module.css'


export default function Card({name, image, id, max_weight, min_weight,temperament, temperaments}) {
    return (
        <div>
            <Link to ={`/dogs/${id}`}>
                <div className={style.card}>
                        <h4 >Nombre: {name}</h4>
                        <img className={style.img} src={image} alt="img not found"  />
                        <h4 >Peso: {min_weight} - {max_weight} Kg</h4>
                        <h4 className={style.temperament}>Temperament: {temperament} {temperaments}</h4>
                    
                </div>
            </Link>
        </div>
    )
}
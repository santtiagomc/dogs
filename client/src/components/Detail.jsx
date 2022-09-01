import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import Nav from './Nav';
import style from './styles/Detail.module.css'

export default function Detail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id 
    const myDog = useSelector((state) => state.detail)

    
  
    useEffect(()=>{
    dispatch(getDetail(id));   
    },[id, dispatch])

    
    return (
    <div>
        <Nav/>

        <div> 
            {
            myDog.length === 0 ?  
            <p>Load...</p> : 
            myDog.length > 0 && 
            <div > 
                {myDog[0].createdInDataBase? <button> This dogs is created in DB</button> : <p> </p> }
                <h1> {myDog[0].name.toUpperCase()}</h1>
                <>{myDog[0].image !== "" ? <img src = {myDog[0].image} alt= "Barking in another place" onError="" width="250px" height="300px" /> : <img src = "" alt = "Woof"/>} </>
                <h5 > Min Weight: {myDog[0].min_weight} kgs. - Max Weight: {myDog[0].max_weight} kgs.</h5>
                <h5> Min Height: {myDog[0].min_height} cms. - Max Height: {myDog[0].max_height} cms. </h5>
                <h5> Life Span : {myDog[0].life_span}</h5>
                <h5>Temperaments: {myDog[0].createdInDataBase? myDog[0].temperaments.map(el => el.name ).join(', '): myDog[0].temperament.split(', ').map(e => e ).join(', ')}</h5> 
            </div>  
            }
        </div>
        <div>

        </div>
    </div>
    ) 
}


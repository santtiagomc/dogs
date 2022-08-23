import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDogs, getTemperaments, filterByTemperaments, filterCreated, orderSort /*orderByName, orderByWeight*/} from '../../Actions';
import Card from '../Card'
import Nav from '../Nav'
import Pagination from '../Pagination';
import SearchBar from '../../Components/SearchBar';
import Reload from '../Img/reload.png'
import load from '../Img/loading.gif'
import s from '../Styles/Home.module.css'
import next from '../Img/next.png'
import prev from '../Img/previus.png'

function Home() {

const dispatch = useDispatch()
const allDogs = useSelector ((state) => state.dogs)

//paginado
const [currentPage, setCurrentPage] = useState(1)
const dogsPerPage = 8
const numbersOfLastDog = currentPage * dogsPerPage   //8
const numberOfFirtsDog = numbersOfLastDog - dogsPerPage //0
const currentDog = allDogs.slice(numberOfFirtsDog, numbersOfLastDog)   
const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

//filter by temperaments
const temperaments = useSelector ((state) => state.temperaments)
const [temperament, setTemperament] = useState("All")
function handleSelect(e){
    e.preventDefault()
    dispatch(filterByTemperaments(e.target.value))
    setTemperament(e.target.value)
    setCurrentPage(1)
}

function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs());
    setCurrentPage(1)  
}

//Filter by Breeds
const [, setBreeds] = useState('All')
function handleFilterCreated (e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
    setBreeds(e.target.value) 
}

//Sorts
const [,setOrden] = useState('Default')
function handleSort (e){
    e.preventDefault()
    dispatch(orderSort(e.target.value))
    setCurrentPage(1)
    setOrden(e.target.value)
 }

useEffect (() => {
    dispatch (getAllDogs())
    dispatch(filterByTemperaments())
    dispatch(getTemperaments())
}, [dispatch])

//console.log(allDogs)
    return (
        <div className={s.gral} >
           <div> <Nav/> </div> 
           <div className={s.head}> 
                <SearchBar/>
           
          
             </div> 
            <div className={s.container}>
            <div className={s.filtros}>
           
        <div >  
        <select className={s.filters} onChange = {e => handleSort(e)}>
            <option value ="default"> Sort by.. </option>
            <option value = "az"> A-Z</option>
            <option value = "za"> Z-A </option>
            <option value = "asc"> Lightest </option>
            <option value = "desc"> Heaviest </option>
        </select>
        </div>  

        <div >     
        <select className={s.filters} onChange = {(e) => {handleFilterCreated(e)}}> 
            <option value = "all">Breeds</option>
            <option value = "created">Created Breeds</option>
            <option value = "api"> Api Breeds</option>
        </select>
        </div>
        <div> 
        <select  className={s.filters} value = {temperament} onChange = {(e)=> handleSelect(e)}>
        <option value="All"> Temperaments </option>
                    {temperaments.map((temp, index) => (
                      <option onClick = {(e)=> handleClick(e)} key={index}>
                        {temp.name}
                      </option>
                    ))}
        </select>   
        </div>
        <div> 
        <button className={s.btn}  onClick = {e=>{handleClick(e)}}> <div><>Refresh</> <img src={Reload} weight="15px" height="15px" alt= "Refresh"/></div> </button>  
         </div>                      
        </div>
        <div className={s.divcard} > 
      
        {currentDog.length === 0 ? 
        <div className={s.loading}><img className={s.imgload} src={load} alt="LOADING" /></div>
        : currentDog.map(el=> {
            return(
                <div key={el.id}>
                      <Card
                   name = {el.name}
                   image = {el.image}
                   key = {el.id}
                   id = {el.id}
                   min_weight = {el.min_weight}
                   max_weight = {el.max_weight}
                   temperaments={el.temperaments?.map((t) => t.name).join(', ')}
                   temperament={el.temperament}
                    />
                   </div>
            )
        })
        }
        
        
       </div> 
       <button  onClick = {() =>paginado(currentPage === 1 ? currentPage : currentPage-1)}> <img className={s.prev} src= {prev} 
alt="previous" /> </button>
  <button  onClick = {() =>paginado(currentPage ===23 ? currentPage : currentPage+1)}> <img className={s.next}  src={next} 
alt="NEXT" /></button>
       </div>
       <div className={s.paginado}>
      
        <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
        />
       
        </div>
        </div>
    )
        
}
export default Home
import {useState} from 'react'
import CarCards from './CarCards'
import StyledContainer from './styles/Container.styled'

function BrowseCars({cars, onHeartClick, onDeleteClick}){
    const [formData, setFormData] = useState({
        search:'',
        sort: 'All'
    })

    function sortCars(obj){
        if (formData.sort === 'ascending') {
            return obj.sort((a, b) => a.price-b.price)
        } else if (formData.sort === 'descending') {
            return obj.sort((a, b) => b.price - a.price)
        } else {
            return obj
        }
    }

    const filteredCars = sortCars(cars)
    .filter(car => 
        car.make.toLowerCase().includes(formData.search.toLowerCase()) || 
        car.model.toLowerCase().includes(formData.search.toLocaleLowerCase()) || 
        car.year.includes(formData.search))
    .map(car => <CarCards key = {car.id} car = {car} onHeartClick={onHeartClick} onDeleteClick={onDeleteClick}/>)



    const handleForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <StyledContainer>
                <div className='titleAndSearch'>
                    <h1>Browse Our Vehicles</h1>
                    <form>
                        <select name='sort' value ={formData.sort} onChange={handleForm} placeholder='Sort By Price'>
                            <option value={'All'}>Sort By Price</option>
                            <option value={'ascending'}>Ascending</option>
                            <option value={'descending'}>Descending</option>
                        </select>
                        <input name='search' onChange={handleForm} value={formData.search} type='text' placeholder='Search...'/>
                    </form>
                </div>
                <div className='grid'>
                    {filteredCars}
                </div>
        </StyledContainer>
    )
}

export default BrowseCars
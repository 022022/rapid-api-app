import { NavLink } from 'react-router-dom';

function Navigation(){
  return <div className="flex justify-self-start w-full ">
    <NavLink to='/' className="prose md:text-xs" >
      Search for another exercise
    </NavLink>
  </div>
}

export default Navigation;
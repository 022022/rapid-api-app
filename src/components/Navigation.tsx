import { NavLink } from 'react-router-dom';

function Navigation(){
  return <>
    <NavLink to='/' className={'md:text-xs'}> Search for exercise </NavLink>
  </>
}

export default Navigation;
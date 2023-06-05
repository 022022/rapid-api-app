import { NavLink } from 'react-router-dom';

function Navigation(){
  return <>
  <div className='navbar bg-base-100 border-b border-slate-600' >
	<div className='navbar'>
		<div className='dropdown'>
			<div tabIndex={0} className='btn btn-ghost md:hidden'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M4 6h16M4 12h8m-8 6h16'/>
				</svg>
			</div>
			<ul
				tabIndex={0}
				className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-6'
			>
				<li>
					<NavLink
						to='/'
						className='prose md:text-xs '>
						Search for exercises
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/saved'
						className='prose md:text-xs'>
						Saved Exercises
					</NavLink>
				</li>
			</ul>
		</div>
    <div className='flex prose '>
    <img className='w-7 mr-2 mb-0 hidden md:flex'	src='/assets/images/logo.svg' alt='SportsFinder App logo' />
      <h2 className='mt-0 text-xs md:text-sm'>SPORTSAPP</h2>
    </div>


	</div>
	<div className='navbar-center hidden md:flex gap-6'>
		<ul className='menu menu-horizontal px-1 gap-4'>
			<li>
				<NavLink
					to='/'
					className='prose text-sm' >
					Search for exercises
				</NavLink>
			</li>
			<li>
				<NavLink
					to='/saved'
					className='prose text-sm'>
					Saved Exercises
				</NavLink>
			</li>
		</ul>
	</div>
</div>

  </>
}

export default Navigation;
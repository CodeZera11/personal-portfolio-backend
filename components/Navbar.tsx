import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full p-5 flex justify-between items-center'>
            <Link href={"/"} className='text-2xl'>PortFolio Backend</Link>
            <div>
                <ul className='flex gap-5 text-xl items-center'>
                    <li> <Link href={"/add-skill"}>Add Skill</Link></li>
                    <li> <Link href={"/add-project"}>Add Project</Link></li>
                    <li> <Link href={"/add-certificate"}>Add Certificate</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
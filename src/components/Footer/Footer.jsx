import React from 'react'

function Footer() {
  return (
    <footer className='w-full h-[300px] bg-red-100 m-auto flex justify-around items-start py-6'>
        <div>
            <h2 className='font-bold text-center'>InnoEcomm</h2>
            <p>copyright 2024</p>
        </div>
        <div>
            <h2 className='font-bold text-center'>Links</h2>
            <ul className='text-center'>
                <li className='mt-1'>Electronic</li>
                <li className='mt-1'>Fashion</li>
                <li className='mt-1'>Household</li>
                <li className='mt-1'>Pharmacy</li>
            </ul>
        </div>
        <div>
            <h2 className='font-bold text-center'>Company</h2>
            <ul className='text-center'>
                <li className='mt-1'>About Company</li>
                <li className='mt-1'>Privacy & Pricing</li>
                <li className='mt-1'>Terms & Conditions</li>
                <li className='mt-1'>Career</li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer
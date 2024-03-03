/* eslint-disable react/prop-types */
export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className=" w-full text-white bg-red-500 hover:bg-red-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
}
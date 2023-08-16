import React from 'react'
import "../styles/Pagination.scss"
function Pagination({size,setLoading,setPage}) {
    const btns = new Array(size).fill(1);
    function changePage(pageNumber) {
        setPage(pageNumber);
        setLoading(true)
      }

  return (
   <div className='btns'>
   {btns.map((item, index) => {
          return <button className='page-btn' onClick={(e) => {
            changePage(index + 1)
            document.querySelectorAll(".page-btn").forEach((btn)=>btn.classList.remove("page-selected"))
            e.target.classList.add("page-selected")
          }}>{index + 1}</button>
        })}
   </div>
  )
}

export default Pagination

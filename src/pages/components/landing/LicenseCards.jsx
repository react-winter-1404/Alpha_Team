

const License = () => {
  const ls = [1, 2, 3, 4]
  return (
    <div className="w-[95%] m-auto flex flex-wrap justify-center items-center gap-2.5">
      {
        ls.map((e) => { return(
          <div key={e}  className="h-[332px] w-[90%] md:w-[20%] p-2.5 flex flex-col border rounded-[20px]">
            <span className="block w-full text-[40px]">
              <span className="block w-[95%] border-b border-black m-auto">0{e}</span>
            </span>
            <span className="block mt-5 text-[24px]">مدرک معتبر</span>
            <span className="block text-[12px]">بعدا اینجا پر میشه</span>
          </div>
        )})
      }
    </div>
  )
}

export default License
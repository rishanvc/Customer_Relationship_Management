function Navbar() {

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      
      <h2 className="text-xl font-semibold">    </h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{localStorage.getItem("username")}</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

    </div>
  );
}

export default Navbar;
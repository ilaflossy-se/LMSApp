
function Header() {
  return (
    <>
    <div className='header'>
        <h2>
            App
        </h2>
        <nav>
        <a href="#"><h2>Courses</h2></a>
        <input type="text" className='text-input' placeholder="Search..." />
        </nav>
        <a href="#"><h2>LogIn</h2></a>
        
    </div>
    <hr />
    </>
  );
}

export default Header;
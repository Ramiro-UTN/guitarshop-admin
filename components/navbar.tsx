import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";

const Navbar = () => {
  return ( 
    <div className="border-b p-4 flex justify-between items-center">
      <MainNav />
      <UserButton afterSignOutUrl="/"/>
    </div>
   );
}
 
export default Navbar;
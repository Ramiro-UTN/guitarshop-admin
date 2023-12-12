import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs";


export default function Home() {
  const {userId} = auth();
 
  console.log("USER_ID", userId);
  return (
    <div className="flex justify-between items-center p-4 gap-x-2">
      Guitar Shop Admin Panel
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

import { UserButton } from "@clerk/nextjs"


export default function Home() {
  return (
    <div className="flex justify-between items-center p-4 gap-x-2">
      Guitar Shop Admin Panel
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

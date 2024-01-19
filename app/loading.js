import Image from "next/image"

export default function Loading() {
  return (
    <div className="w-full h-screen ">
        <Image alt="loading" src={"/loading.gif"} width={200} height={200} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
  )
}

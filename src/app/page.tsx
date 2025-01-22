import Image from "next/image";
import { fetch_result } from "./ui/api/fetch";
import { TableComponent } from "./ui/TableComponent";
import { TestModal } from "./ui/TestModal";

export  default async function Home() {
  const data = await fetch_result("/workers","GET");
  return (
    <main>
      <h1 className="text-center font-bold text-lg">Тестовое задание</h1>
      <TableComponent data={data}/>
      
    </main>
  );
}

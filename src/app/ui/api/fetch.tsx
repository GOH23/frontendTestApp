
export async function fetch_result(endpoint: string,type?: "POST" | "GET",body?: any){
    return await (await fetch(process.env.BACKEND_URI + endpoint,{
        method: type ?? "GET",
        body: JSON.stringify(body)
    })).json()
}   
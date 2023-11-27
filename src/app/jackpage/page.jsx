import {headers} from "next/headers"


export default async function APIFromServer() {
    const resp = await fetch("http://localhost:3000/api/jackSess",{
        method: "GET",
        headers: headers(),
    })
    .then((res)=> res.json()
    );

    return(
        <div>
            <div>
                API Route from <span className="text-amber-700">Server</span>
            </div>
            <div>Name from Server: {resp?.name}</div>
        </div>
    )
}
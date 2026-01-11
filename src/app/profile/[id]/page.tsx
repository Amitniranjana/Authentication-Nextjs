import React from "react";
type Params = Promise<{ id: string }>;
export default async function Profile({params}:{params:Params}){
const {id }= await params;
    return (
        <div>
          <p className="bg-amber-300">  profile img {id}</p>
        </div>
    )
}
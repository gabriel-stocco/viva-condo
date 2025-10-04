import { NextResponse } from "next/server";
import { getCondominios } from "@/services/condominio-service";


export async function GET() {

    try {

        const data = await getCondominios();
        return NextResponse.json({
            succes: true,
            count: data.length,
            data,
        }, 
            { status: 200 });
    } catch (e: any) {
        return NextResponse.json({
            succes: false,
            error: e.message ?? "erro inesperado"
        }, { status: 400 });
    }

}








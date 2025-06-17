'use client';
import { useEffect, useState } from "react";
import { addConversao, listenConversoes } from "@/lib/firestore-service";

export default function TesteFirestore() {
    const [conversoes, setConversoes] = useState<any[]>([])

    const testeAdicionar = async () => {
        await addConversao({
            usuario_id: "teste_" + Date.now(),
            arquivo: `arquivo_${Math.random().toString(36).substring(2, 5)}.pdf`,
            data: new Date()
        });
        alert("Documento adicionado");
    };

    useEffect(() => {
        const unsubscribe = listenConversoes((docs) => {
            setConversoes(docs);
        })

        //limpeza ao desmontar o componente
        return () => unsubscribe();
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Teste Firestore</h1>

            <button
                onClick={testeAdicionar}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
            >
                Adicionar Documento de Teste
            </button>

            <h2 className="font-semibold mb-2">Documentos existentes:</h2>
            <ul className="space-y-2">
                {conversoes.map((conv) => (
                    <li key={conv.id} className="border p-3 rounded">
                        <p><strong>Arquivo:</strong> {conv.arquivo}</p>
                        <p><strong>Usuário:</strong> {conv.usuario_id}</p>
                        <p><strong>Data:</strong> {new Date(conv.data?.seconds * 1000).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
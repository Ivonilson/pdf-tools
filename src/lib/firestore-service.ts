import { db } from '@/firebase/config';
import { collection, addDoc, Unsubscribe, onSnapshot, QuerySnapshot } from 'firebase/firestore';

//adiciona um novo documento
export async function addConversao(dados: any) {
    const docRef = addDoc(collection(db, 'conversoes'), dados);
    return (await docRef).id; // retorna o ID do documento criado
}

//função para escutar as atualizações em tempo real - novas adições, etc
export function listenConversoes(
    callback: (conversoes: Array<{id: string; [key: string]: any}>) => void
): Unsubscribe {
    return onSnapshot(collection(db, 'conversoes'), (QuerySnapshot) => {
        const docs = QuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(docs);
    });
}

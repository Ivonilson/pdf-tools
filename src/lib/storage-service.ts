import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";

export const uploadPDF = async (file: File, useId: string) => {
    //cria uma referência com estrutura organizada
    const storageRef = ref(storage, `users/${useId}/pdfs/${Date.now()}_${file.name}`);

    //faz o upload do arquivo
    const snapshot = await uploadBytes(storageRef, file);

    //obtem a url para donwload
    return await getDownloadURL(snapshot.ref);
};
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from "./../models/file-item.model";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SubidaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private dbFirebase: AngularFirestore) { }

  /**
  * Primero, el archivo se carga en el almacenamiento de Firebase
  * Luego, se crea un registro en la base de datos de Firebase
  */

 uploadImages(images: FileItem[]){
    console.log(images);

    const storageRef = firebase.storage().ref();

    for(const item of images){
      item.estadoSubida = true;
      if(item.progreso >= 100){
        continue;
      }
      const tareaSubida: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.name}`).put(item.file);

      /**
      * Escuchar los eventos en esta tarea
      */
      
      tareaSubida.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: firebase.storage.UploadTaskSnapshot) => { 
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
        console.log(`El estado actual es ${snapshot.state}`);
      },
      () => console.error(`Error de subida con ${item.name}`), async () => {
        console.log(`El estado final es ${(await tareaSubida).state}`);
        item.url = await (await tareaSubida).ref.getDownloadURL();
        item.estadoSubida = false;
        this.guardarImagen({
          name: item.name, url: item.url
        });
      });
    }
  }

  /**
  * Insertar registro en la base de datos
  * El registro tiene dos propiedades: 'nombre' y 'url'
  */

  private guardarImagen(image: { name: string, url: string}){
    this.dbFirebase.collection(`/${this.CARPETA_IMAGENES}`).add(image);
  }
 
}
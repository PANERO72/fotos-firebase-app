import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FileItem } from "./../models/file-item.model";

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragEnter(event: any){
    this.mouseOver.emit(true);
    this._preventAndStop(event);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(event: any){
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event']) public onDrop(event: any){
    const dataTransfer = this._getDataTransfer(event);
    
    if(!dataTransfer){
      return;
    }
    
    this._extractFiles(dataTransfer.files);
    this._preventAndStop(event);
    this.mouseOver.emit(false);
  }

  private _getDataTransfer(event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList){

    for(const property in Object.getOwnPropertyNames(fileList)){
      const tempFile = fileList[property];

      if(this._canBeUploaded(tempFile)){
        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
    console.log(this.files);

  }

  // Validaciones 
  private _canBeUploaded(file: File): boolean{
    if(!this._alreadyDropped(file.name) && this._isImage(file.type)){
      return true;
    }else{
      return false;
    }
  }

  private _preventAndStop(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _alreadyDropped(fileName: string): boolean{
    for(const file of this.files){
      if(file.name === fileName){
        console.log('El archivo' + fileName + ' ya fue agregado');
        return true;
      }
    }
    return false;
  }

  private _isImage(fileType: string): boolean{
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}

import { Component, OnInit } from '@angular/core';
import { FileItem } from "./../../models/file-item.model";
import { SubidaImagenesService } from "./../../services/subida-imagenes.service";

@Component({
  selector: 'app-subida',
  templateUrl: './subida.component.html',
  styles: []
})

export class SubidaComponent implements OnInit {

  files: FileItem[] = [];
  isOverDrop = false;

  constructor(public _subidaImagenesService: SubidaImagenesService) { }

  ngOnInit(): void {
  }

  upload(){
    this._subidaImagenesService.uploadImages(this.files);
  }

}
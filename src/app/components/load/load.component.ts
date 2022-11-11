import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  @Input() text: string;

  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {
  loading = false;

  constructor(
    private spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.spinnerService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
      this.cdr.detectChanges(); // Force la détection des changements
    });
  }
}

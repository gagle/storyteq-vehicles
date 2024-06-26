import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'st-vehicle-shell',
  templateUrl: './vehicle-shell.component.html',
  styleUrls: ['./vehicle-shell.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex h-full',
  },
})
export class VehicleShellComponent {}

import {Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../modules/material/material-module';
import {UiSpec, UiSpecService} from '../../services/ui-spec/ui-spec.service';
import {Subscription} from 'rxjs';
import {NgChartsModule} from 'ng2-charts';
import {ChartData, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-render-panel',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgChartsModule],
  templateUrl: './render-panel.html',
  styleUrls: ['./render-panel.css']
})
export class RenderPanel implements OnDestroy {
  spec: UiSpec | null = null;

  // tabla
  displayed: string[] = [];
  rows: any[] = [];

  // charts
  barData?: ChartData<'bar'>;
  pieData?: ChartData<'pie'>;
  barOptions: ChartOptions<'bar'> = {responsive: true, maintainAspectRatio: false};
  pieOptions: ChartOptions<'pie'> = {responsive: true, maintainAspectRatio: false};

  private sub: Subscription;

  constructor(private bus: UiSpecService) {
    this.sub = this.bus.get().subscribe(s => {
      this.spec = s;
      if (!s) return;

      if (s.type === 'table') {
        this.displayed = s.columns.map(c => c.id);
        this.rows = s.rows ?? [];
        this.barData = undefined;
        this.pieData = undefined;
      } else if (s.type === 'bar') {
        this.barData = {
          labels: s.labels,
          datasets: [{data: s.data, label: s.title ?? 'Series'}]
        };
        this.pieData = undefined;
      } else if (s.type === 'pie') {
        this.pieData = {
          labels: s.labels,
          datasets: [{data: s.data}]
        };
        this.barData = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

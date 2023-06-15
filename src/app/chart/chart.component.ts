import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtilisateurService} from "../service/utilisateur.service";
import {TacheService} from "../service/tache.service";
import {Utilisateur} from "../model/Utilisateur";
import {Tache} from "../model/Tache";
import {AuthService} from "../service/auth.service";
import { Chart, ChartOptions, ChartConfiguration } from 'chart.js/auto';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  constructor(private tacheService: TacheService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.getTasksStatusDistribution();
  }

  getTasksStatusDistribution(): void {
    this.tacheService.getTachesByUtilisateur(this.authService.idUtilisateurConnecte).subscribe(
      (taches: Tache[]) => {
        const completedTasks = taches.filter(tache => tache.estTerminee).length;
        const incompleteTasks = taches.filter(tache => !tache.estTerminee).length;
        this.createPieChart(completedTasks, incompleteTasks);
      },
      (error) => {
        console.error('Error retrieving tasks status distribution:', error);
        // Handle the error as needed
      }
    );
  }



  createPieChart(completedTasks: number, incompleteTasks: number): void {
    const chartData = [completedTasks, incompleteTasks];
    const chartLabels = ['Completed', 'Incomplete'];

    const chartConfig: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: chartData,
            backgroundColor: ['green', 'red'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    const pieChartElement = this.pieChartCanvas.nativeElement;
    if (pieChartElement) {
      new Chart(pieChartElement, chartConfig);
    }
  }


}

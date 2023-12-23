import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {
    console.log('projects service');
  }

  getProjects() {
    return [
      {
        name: 'A Project',
        image: 'An Image',
        gitURL: 'gitURL',
        liveURL: 'liveURL',
      },
      {
        name: 'A Project',
        image: 'An Image',
        gitURL: 'gitURL',
        liveURL: 'liveURL',
      },
      {
        name: 'A Project',
        image: 'An Image',
        gitURL: 'gitURL',
        liveURL: 'liveURL',
      },
    ];
  }
}
